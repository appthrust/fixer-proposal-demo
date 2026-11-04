# 株式会社FIXER様向け AppThrust ご提案ページ

1 ページ構成のご提案資料 + 社内文書に聞くライブデモ（Next.js App Router、データベース不要）。

- 文言はすべて `app/content.ts` にまとまっている。表現の修正はこのファイルだけで行う。
- 画面部品は `app/components/`。

Run locally:

```bash
npm install
npm run dev
```

## Platform health probes

The platform probes `GET /healthz` for startup and liveness, and `GET /` for readiness. Both are static and need no environment variables.
