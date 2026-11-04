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
    console.error(`[ask] knowledge request failed: ${error instanceof Error ? error.name : "unknown"}`);
    return Response.json({ error: "knowledge_upstream_error" }, { status: 502 });
  }

  if (!upstream.ok || !upstream.body) {
    console.error(`[ask] knowledge answer returned HTTP ${upstream.status}`);
    await upstream.body?.cancel();
    return Response.json(
      { error: "knowledge_upstream_error", status: upstream.status },
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
