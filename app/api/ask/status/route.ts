import { getKnowledgeConfig } from "@/app/lib/knowledge";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export function GET() {
  return Response.json(
    { connected: getKnowledgeConfig() !== null },
    { headers: { "Cache-Control": "no-store" } },
  );
}
