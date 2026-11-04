// Knowledge built-in app への接続（ComponentConnection `knowledge` が注入する env）。
// Access Key はこのモジュールの外へ出さない。クライアントへ返すのは SSE 本文だけ。

export type KnowledgeConfig = {
  url: string;
  accessUrl: string;
  apiKey: string;
};

export const KNOWLEDGE_COLLECTIONS = ["fixer-demo"];

export function getKnowledgeConfig(): KnowledgeConfig | null {
  const url = process.env.KNOWLEDGE_URL?.trim();
  const accessUrl = process.env.KNOWLEDGE_ACCESS_URL?.trim();
  const apiKey = process.env.KNOWLEDGE_API_KEY?.trim();
  if (!url || !accessUrl || !apiKey) return null;
  return { url: url.replace(/\/+$/, ""), accessUrl: accessUrl.replace(/\/+$/, ""), apiKey };
}

export class KnowledgeAuthError extends Error {}

type CachedToken = { token: string; refreshAt: number };

const REFRESH_MARGIN_MS = 30_000;
let cached: CachedToken | null = null;
let inflight: Promise<string> | null = null;

export function invalidateAccessToken() {
  cached = null;
}

export async function getAccessToken(config: KnowledgeConfig): Promise<string> {
  if (cached && Date.now() < cached.refreshAt) return cached.token;
  inflight ??= exchange(config).finally(() => {
    inflight = null;
  });
  return inflight;
}

async function exchange(config: KnowledgeConfig): Promise<string> {
  let response: Response;
  try {
    response = await fetch(`${config.accessUrl}/api/v1/access/token`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ key: config.apiKey }),
      cache: "no-store",
      signal: AbortSignal.timeout(15_000),
    });
  } catch (error) {
    const reason = error instanceof Error ? error.name : "unknown";
    throw new KnowledgeAuthError(`access token exchange failed: ${reason}`);
  }
  if (!response.ok) {
    throw new KnowledgeAuthError(`access token exchange returned HTTP ${response.status}`);
  }
  const body = (await response.json()) as { token?: unknown; expiresAt?: unknown };
  if (typeof body.token !== "string" || body.token === "") {
    throw new KnowledgeAuthError("access token exchange returned no token");
  }
  const expiresAt = parseExpiry(body.expiresAt);
  cached = { token: body.token, refreshAt: expiresAt - REFRESH_MARGIN_MS };
  return body.token;
}

function parseExpiry(value: unknown): number {
  if (typeof value === "number") {
    // Unix seconds or milliseconds.
    return value < 1e12 ? value * 1000 : value;
  }
  if (typeof value === "string") {
    const parsed = Date.parse(value);
    if (!Number.isNaN(parsed)) return parsed;
  }
  // Unknown shape: treat as short-lived (the contract caps tokens at 5 minutes).
  return Date.now() + 60_000;
}
