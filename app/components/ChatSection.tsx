import { connection } from "next/server";
import { defaultInferenceLabel } from "@/app/content";
import { getDemoDisplayConfig } from "@/app/lib/knowledge";
import { ChatPanel } from "./ChatPanel";

/** 配信先 Project の env（Knowledge の公開 URL・推論先の表示名）をリクエスト時に読んでチャットへ渡す。 */
export async function ChatSection() {
  await connection();
  const { knowledgePublicUrl, inferenceLabel } = getDemoDisplayConfig(defaultInferenceLabel);
  return <ChatPanel knowledgePublicUrl={knowledgePublicUrl} inferenceLabel={inferenceLabel} />;
}
