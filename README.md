# 株式会社FIXER様向け AppThrust ご提案ページ

1 ページ構成のご提案資料 + 社内文書に聞くライブデモ（Next.js App Router、データベース不要）。

- 文言はすべて `app/content.ts` にまとまっている。表現の修正はこのファイルだけで行う。
- 画面部品は `app/components/`。
- ライブデモ（Section 04）は `app/components/ChatPanel.tsx`（クライアント）と `app/api/ask/route.ts`（サーバ）。サーバが Knowledge の Access Key をアサーションに交換し、`/api/knowledge/v1/answer` の SSE をそのままブラウザへ中継する。Access Key はブラウザに出さない。

Run locally:

```bash
npm install
npm run dev
```

## Knowledge 接続

ComponentConnection `knowledge` が次の env を注入する。未設定なら `/api/ask` は 503 `{"error":"knowledge_not_connected"}` を返し、画面は「Knowledge 未接続」と表示する。

| env | 用途 |
|---|---|
| `KNOWLEDGE_URL` | Knowledge の内部 Service origin（回答 API の宛先） |
| `KNOWLEDGE_ACCESS_URL` | アサーション交換先（`POST /api/v1/access/token`） |
| `KNOWLEDGE_API_KEY` | Access Key（`apk_knowl_…`） |

検索対象の collection は `fixer-demo`（`app/lib/knowledge.ts`）。接続状態は `GET /api/ask/status` → `{"connected": boolean}`。

## Platform health probes

The platform probes `GET /healthz` for startup and liveness, and `GET /` for readiness. Both are static and need no environment variables.
