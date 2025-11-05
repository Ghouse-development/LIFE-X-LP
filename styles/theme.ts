/**
 * LIFE X FC テーマ設定
 * PGハウス参考：上品で余白リッチな空気感
 */

export const theme = {
  colors: {
    // 背景色
    bg: {
      dark: '#0B0D0F',      // ダークセクション背景
      light: '#F8F9FA',     // ライトセクション背景
      white: '#FFFFFF',     // 純白背景
    },
    // テキスト色
    text: {
      light: '#0E1113',     // ライト地でのテキスト
      dark: '#EDEFF1',      // ダーク地でのテキスト
      muted: '#6B7280',     // サブテキスト
    },
    // アクセント色
    accent: {
      primary: '#D9B66A',   // 上品な金（メインCTA）
      secondary: '#4C86E8', // 補助リンク・CTAホバー
      hover: '#E5C889',     // プライマリホバー
    },
    // セマンティックカラー
    border: {
      light: '#E5E7EB',
      dark: '#374151',
    }
  },

  fonts: {
    // 見出し用フォント
    heading: '"Noto Serif JP", "Playfair Display", serif',
    // 本文用フォント
    body: '"Noto Sans JP", "Inter", sans-serif',
  },

  // 余白トークン（プロンプト指示：最後に+10-15%拡大）
  spacing: {
    xs: '0.5rem',    // 8px
    sm: '1rem',      // 16px
    md: '1.75rem',   // 28px (+15%)
    lg: '3rem',      // 48px (+15%)
    xl: '5rem',      // 80px (+15%)
    '2xl': '7rem',   // 112px (+15%)
    '3xl': '10rem',  // 160px (+15%)
  },

  // 角丸
  radius: {
    sm: '0.25rem',   // 4px
    md: '0.5rem',    // 8px
    lg: '0.75rem',   // 12px
    xl: '1rem',      // 16px
    '2xl': '1.5rem', // 24px（プロンプト指示）
    full: '9999px',
  },

  // シャドウ（薄め）
  shadow: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.03)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02)',
  },

  // アニメーション（0.3–0.4s、fade/slideのみ）
  animation: {
    duration: {
      fast: '0.3s',
      normal: '0.4s',
    },
    easing: {
      inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
    },
  },

  // ブレークポイント
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
} as const

export type Theme = typeof theme
