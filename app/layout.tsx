import type { Metadata } from "next";
// import { Noto_Sans_JP, Noto_Serif_JP } from "next/font/google";
import "./globals.css";
import { Analytics } from "@/lib/analytics";

// Temporary fallback: Use system fonts due to Google Fonts connection issues
// const notoSansJP = Noto_Sans_JP({
//   variable: "--font-noto-sans-jp",
//   subsets: ["latin"],
//   weight: ["400", "500", "700", "900"],
// });

// const notoSerifJP = Noto_Serif_JP({
//   variable: "--font-noto-serif-jp",
//   subsets: ["latin"],
//   weight: ["400", "600", "700", "900"],
// });

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
      <body className="antialiased font-sans">
        <Analytics />
        {children}
      </body>
    </html>
  );
}
