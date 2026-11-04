import {
  KNOWLEDGE_COLLECTIONS,
  KnowledgeAuthError,
  getAccessToken,
  getKnowledgeConfig,
  invalidateAccessToken,
  type KnowledgeConfig,
} from "@/app/lib/knowledge";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_QUERY_LENGTH = 1000;
// Only fixed identifiers (knowledge_llm_error, ECONNREFUSED, ...) may reach the browser.
const SAFE_CODE = /^[A-Za-z0-9_.-]{1,64}$/;

/** Reads `value[key]` (or `value[key].code`) when it is a short identifier; never free text. */
function safeCode(value: unknown, key: string): string | undefined {
  if (typeof value !== "object" || value === null || !(key in value)) return undefined;
  let field: unknown = (value as Record<string, unknown>)[key];
  if (typeof field === "object" && field !== null && "code" in field) field = field.code;
  return typeof field === "string" && SAFE_CODE.test(field) ? field : undefined;
}

export async function POST(request: Request) {
  const config = getKnowledgeConfig();
  if (!config) {
    return Response.json({ error: "knowledge_not_connected" }, { status: 503 });
  }

  let query: unknown;
  try {
    ({ query } = (await request.json()) as { query?: unknown });
  } catch {
    query = undefined;
  }
  if (typeof query !== "string" || query.trim() === "" || query.length > MAX_QUERY_LENGTH) {
    return Response.json({ error: "invalid_request" }, { status: 400 });
  }

  let upstream: Response;
  try {
    upstream = await askKnowledge(config, query.trim(), request.signal);
    if (upstream.status === 401) {
      // The cached assertion was rejected (rotated key or clock skew): exchange once more.
      invalidateAccessToken();
      upstream = await askKnowledge(config, query.trim(), request.signal);
    }
  } catch (error) {
    if (error instanceof KnowledgeAuthError) {
      console.error(`[ask] ${error.message}`);
      return Response.json({ error: "knowledge_auth_failed" }, { status: 502 });
    }
    if (request.signal.aborted) {
      return new Response(null, { status: 499 });
    }
    const reason = safeCode(error instanceof Error ? error.cause : undefined, "code") ?? (error instanceof Error ? error.name : "unknown");
    console.error(`[ask] knowledge request failed: ${reason}`);
    return Response.json({ error: "knowledge_upstream_error", reason }, { status: 502 });
  }

  if (!upstream.ok || !upstream.body) {
    // Knowledge answers failures as JSON `{"error": "<code>", "message": ...}`; only the code
    // (a fixed identifier such as knowledge_llm_error) is passed to the browser.
    let parsed: unknown;
    try {
      parsed = JSON.parse(await upstream.text());
    } catch {
      parsed = undefined;
    }
    const reason = safeCode(parsed, "error");
    console.error(`[ask] knowledge answer returned HTTP ${upstream.status}${reason ? ` ${reason}` : ""}`);
    return Response.json(
      { error: "knowledge_upstream_error", status: upstream.status, reason },
      { status: 502 },
    );
  }

  return new Response(upstream.body, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      "X-Accel-Buffering": "no",
    },
  });
}

async function askKnowledge(config: KnowledgeConfig, query: string, signal: AbortSignal) {
  const token = await getAccessToken(config);
  return fetch(`${config.url}/api/knowledge/v1/answer`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "text/event-stream",
    },
    body: JSON.stringify({ query, collections: KNOWLEDGE_COLLECTIONS }),
    cache: "no-store",
    signal,
  });
}
