import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AppThrust ご提案 | 株式会社エクセディ様",
  description:
    "生成 AI で見つけた知見を、データを外に出さずに業務アプリにして、全拠点へ届ける基盤のご提案",
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
