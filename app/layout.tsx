import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AppThrust ご提案 | 株式会社FIXER様",
  description:
    "Sovereign GaiXer と AppThrust で、オンプレミスの生成 AI と業務アプリ基盤をセットで届ける協業のご提案",
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="scroll-smooth antialiased">
      <body className="min-h-screen bg-white text-slate-900">{children}</body>
    </html>
  );
}
