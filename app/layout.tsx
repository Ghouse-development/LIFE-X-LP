import type { Metadata } from "next";
// Google Fonts temporarily disabled due to connection issues
// import { Noto_Sans_JP, Noto_Serif_JP } from "next/font/google";
import "./globals.css";
import { Analytics } from "@/lib/analytics";

export const metadata: Metadata = {
  title: {
    default: "LIFE X フランチャイズ",
    template: "%s | LIFE X フランチャイズ",
  },
  description: "商品・設計・現場・集客の型を提供。毎月ウェビナー開催／まずは30分で概要相談。",
  icons: {
    icon: "/icons/house-shield.svg",
    apple: "/icons/house-shield.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="antialiased [font-feature-settings:'palt'] text-[#0E1113] bg-white">
        <Analytics />
        {children}
      </body>
    </html>
  );
}
