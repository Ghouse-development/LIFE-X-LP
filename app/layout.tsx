import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { Analytics } from "@/lib/analytics";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "LIFE X フランチャイズ",
    template: "%s | LIFE X フランチャイズ",
  },
  description: "商品・設計・現場・集客の型を提供。毎月ウェビナー開催／まずは30分で概要相談。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${notoSansJP.variable} antialiased`}>
        <Analytics />
        {children}
      </body>
    </html>
  );
}
