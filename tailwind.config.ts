import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // PG HOUSE カラースキーム
        'pg-blue': '#0693e3',
        'pg-gray': '#32373c',
        // 戦略的カラーパレット
        'success-green': '#10b981',      // 成功・実績・達成
        'revenue-orange': '#f97316',     // 収益・CTA・緊急性
        'trust-navy': '#1e3a8a',         // 信頼・保証・安心
      },
      // PG HOUSE デザインシステム
      fontSize: {
        'pg-sm': '13px',
        'pg-base': '20px',
        'pg-lg': '36px',
        'pg-xl': '42px',
      },
      spacing: {
        'pg-1': '0.44rem',  // 7px
        'pg-2': '0.67rem',  // 11px
        'pg-3': '1rem',     // 16px
        'pg-4': '1.5rem',   // 24px
        'pg-5': '2.25rem',  // 36px
        'pg-6': '3.38rem',  // 54px
        'pg-7': '5.06rem',  // 81px
      },
      gap: {
        'pg': '0.5em',      // PG HOUSE default gap
      },
      borderRadius: {
        'pg-pill': '9999px', // PG HOUSE pill buttons
      },
    },
  },
  plugins: [],
} satisfies Config;
