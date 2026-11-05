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
| `KNOWLEDGE_PUBLIC_URL` | Knowledge の公開画面。チャットの「Knowledge の画面で開く」リンク先。未設定ならリンクを出さない |

検索対象の collection は `fixer-demo`（`app/lib/knowledge.ts`）。接続状態は `GET /api/ask/status` → `{"connected": boolean}`。

配信先ごとに手で設定する env:

| env | 用途 |
|---|---|
| `DEMO_INFERENCE_LABEL` | 推論先バッジの表示名（「推論先: <値>／外部送信なし」）。未設定なら「Project 内 llm（gemma3:4b）」 |

Project ID はコードに持たない。`/` はこれらの env をリクエスト時に読むため動的レンダリングになる。

## Platform health probes

The platform probes `GET /healthz` for startup and liveness, and `GET /` for readiness. Both need no environment variables (`/healthz` is static; `/` renders per request and works with every env unset).
