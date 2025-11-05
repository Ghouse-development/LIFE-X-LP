# LIFE X フランチャイズ LP（FC版）

LIFE X フランチャイズ向けランディングページ - Next.js 15 + Supabase + shadcn/ui

## プロジェクト概要

工務店（FC検討層）向けのランディングページ。商品力・収益モデル・導入フローを段階的に提示し、問い合わせ（MQL）とウェビナー登録を獲得します。

### 技術スタック

- **フレームワーク**: Next.js 15 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS + shadcn/ui
- **フォーム**: react-hook-form + zod
- **アニメーション**: Framer Motion（最小限、0.3-0.4秒）
- **データベース**: Supabase
- **デプロイ**: Vercel
- **計測**: Google Analytics 4 + Meta Pixel
- **テスト**: Playwright + axe-core (a11y)

### デザインコンセプト

- **余白リッチ、写真主体、静かな自信**
- PGハウス参考：余白・静かな写真主体・穏やかなモーション
- 配色：ダーク (#0B0D0F) / ライト (#F8F9FA) / アクセント金 (#D9B66A)

## セットアップ

### 1. 依存関係のインストール

\`\`\`bash
npm install
\`\`\`

### 2. 環境変数の設定

\`.env.local.example\` を \`.env.local\` にコピーして、Supabaseの認証情報を設定してください。

\`\`\`bash
cp .env.local.example .env.local
\`\`\`

\`.env.local\` に以下を設定：

\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Optional
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_META_PIXEL_ID=123456789012345
\`\`\`

### 3. 開発サーバーの起動

\`\`\`bash
npm run dev
\`\`\`

ブラウザで [http://localhost:3000/fc](http://localhost:3000/fc) を開いてください。

## ディレクトリ構成

\`\`\`
.
├── app/
│   ├── fc/                         # FC専用ページ
│   │   └── page.tsx               # メインページ
│   ├── layout.tsx                 # ルートレイアウト（フォント設定）
│   └── globals.css                # グローバルスタイル
├── components/
│   ├── fc/                        # FC専用コンポーネント
│   │   ├── Section.tsx           # 汎用セクションラッパー
│   │   ├── SiteHeader.tsx        # ヘッダー
│   │   ├── SiteFooter.tsx        # フッター
│   │   ├── Hero.tsx              # ヒーロー
│   │   ├── FloatingCTA.tsx       # 固定CTA（右下）
│   │   ├── Concept.tsx           # コンセプト
│   │   ├── ValueGrid.tsx         # 価値提案・KPI
│   │   ├── Performance.tsx       # 性能・構造
│   │   ├── Gallery.tsx           # ギャラリー（Lightbox付）
│   │   ├── Process.tsx           # 導入ステップ
│   │   ├── SupportTable.tsx      # サポート範囲
│   │   ├── Testimonials.tsx      # 導入事例
│   │   ├── Map.tsx               # 全国展開エリア
│   │   ├── Webinar.tsx           # ウェビナー
│   │   ├── FAQ.tsx               # よくある質問（Accordion）
│   │   └── ContactForm.tsx       # 問い合わせフォーム（3ステップ、draft保存）
│   └── ui/                        # shadcn/ui コンポーネント
├── data/
│   └── fc.json                    # FCページデータ（統合JSON）
├── lib/
│   ├── utils.ts                   # cn() utility
│   ├── supabase.ts                # Supabaseクライアント
│   ├── seo.ts                     # SEO/OGP/JSON-LD
│   ├── events.ts                  # GA4/Meta Pixel イベント
│   └── analytics.tsx              # Analytics スクリプト
├── styles/
│   └── theme.ts                   # テーマトークン（色/余白/角丸/影）
├── public/
│   ├── fc/
│   │   ├── prompts.md            # 画像生成プロンプト
│   │   ├── hero-01.webp          # ヒーロー画像
│   │   ├── concept_*.webp        # コンセプト画像
│   │   ├── kitchen.webp          # キッチン画像
│   │   └── gallery_*.webp        # ギャラリー画像
│   ├── cases/                     # 事例画像（既存流用）
│   └── icons/                     # SVGアイコン
├── tests/
│   ├── accessibility.spec.ts     # アクセシビリティテスト
│   └── screenshot.spec.ts        # スクリーンショットテスト
├── playwright.config.ts          # Playwright設定
└── README.md                     # このファイル
\`\`\`

## スクリプト

- \`npm run dev\`: 開発サーバーを起動
- \`npm run build\`: 本番用ビルドを作成
- \`npm run start\`: 本番サーバーを起動
- \`npm run lint\`: ESLintでコードをチェック
- \`npm run preview\`: ビルド後にプレビュー
- \`npm run snap\`: スクリーンショット自動出力（PC/768/390）
- \`npm run a11y\`: アクセシビリティ重大エラー検出
- \`npm test\`: すべてのPlaywrightテストを実行
- \`npm run test:ui\`: Playwright UIモードでテスト

## コンテンツ編集

### データの編集

すべてのコンテンツは \`data/fc.json\` で一元管理されています：

\`\`\`json
{
  "hero": { ... },           // ヒーローセクション
  "kpi": [ ... ],           // 収益モデル
  "reasons": [ ... ],       // 選ばれる理由
  "performance": { ... },   // 性能データ
  "process": [ ... ],       // 導入ステップ
  "support": [ ... ],       // サポート範囲
  "testimonials": [ ... ],  // 導入事例
  "areas": [ ... ],         // 展開エリア
  "webinar": { ... },       // ウェビナー情報
  "faq": [ ... ],           // よくある質問
  "contact": { ... },       // 連絡先
  "gallery": [ ... ]        // ギャラリー画像
}
\`\`\`

### 配色の変更

配色を変更する場合は、以下のファイルを編集してください：

1. **\`styles/theme.ts\`** - テーマトークン（グローバル定義）
2. **各コンポーネント** - インライン色指定（例：\`bg-[#D9B66A]\`）

主要な色：

- ダーク背景: \`#0B0D0F\`
- ライト背景: \`#F8F9FA\`
- アクセント金: \`#D9B66A\`
- 補助青: \`#4C86E8\`

### 画像の追加・変更

画像を変更する場合は、\`/public/fc/prompts.md\` に記載されている生成プロンプトを参照してください。

**重要**: すべてオリジナル画像として生成してください。第三者の著作権を侵害しないこと。

## テスト

### アクセシビリティテスト

\`\`\`bash
npm run a11y
\`\`\`

WCAG 2.1 AA基準でチェックします。重大なエラーがある場合、テストが失敗します。

### スクリーンショットテスト

\`\`\`bash
npm run snap
\`\`\`

PC/タブレット/モバイルの3つのビューポートでスクリーンショットを自動生成します。
結果は \`tests/screenshots/\` に保存されます。

## パフォーマンス目標

- **Lighthouse**: 90+
- **CLS**: <0.1
- **LCP**: <2.5s（3G Fast）

### 最適化手法

- Next.jsの\`next/image\`で画像最適化（AVIF/WebP、sizesレスポンシブ）
- Framer Motionは最小限（初回表示時のみ、0.3-0.4s、移動距離小）
- コードスプリッティング（App Router自動）
- Noto Sans JP / Noto Serif JP フォント最適化

## SEO/計測

### JSON-LD構造化データ

- Organization（サイト情報）
- Product（LIFE X フランチャイズ）
- FAQPage（よくある質問）

### イベントトラッキング

主要なイベント（\`data-gtm\`属性で設定）：

- \`cta_primary_request\`: 資料請求CTA
- \`cta_secondary_consult\`: 個別相談CTA
- \`cta_tertiary_webinar\`: ウェビナーCTA
- \`floating_cta_*\`: FloatingCTAからのアクション
- \`form_step*_next\`: フォームステップ遷移
- \`form_submit\`: フォーム送信完了

## デプロイ

### Vercelへのデプロイ

\`\`\`bash
# Vercelにログイン
vercel login

# プロジェクトをリンク
vercel link

# 環境変数を設定
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add SUPABASE_SERVICE_ROLE_KEY
vercel env add NEXT_PUBLIC_GA_ID
vercel env add NEXT_PUBLIC_META_PIXEL_ID

# デプロイ
vercel --prod
\`\`\`

### Vercel Dashboardを使用

1. [Vercel Dashboard](https://vercel.com/dashboard)にアクセス
2. GitHubリポジトリをインポート
3. 環境変数を設定（上記参照）
4. デプロイ

## コピー規律（AI臭カット）

- 一文60字以内
- 体言止め多用しない
- 抽象語・誇張語を避け、数値はレンジ＋脚注
- CTAは行為ベース：「30分で概要相談」「次回ウェビナーに申し込む」

## トラブルシューティング

### ビルドエラー

\`\`\`bash
rm -rf .next node_modules
npm install
npm run build
\`\`\`

### 型エラー

shadcn/ui のコンポーネントで型エラーが出る場合は、\`@hookform/resolvers\` のバージョンを確認してください。

### 画像が表示されない

\`/public/fc/\` 配下に画像を配置してください。プレースホルダーとして \`/cases/\` の既存画像を使用できます。

## 法務・ブランド注意事項

- 参考サイト（PGハウス等）の文言/画像/図版/コードを直接流用しない
- 画像・アイコンは商用可能か自社生成のみ
- 性能表記など第三者出典が必要な箇所は注釈でダミー表現→本番差替え
- ロゴ・商標は自社および許諾済みのみ

## ライセンス

Private

## 制作記録

このプロジェクトは、プロンプト「【Claude Code 一発実装プロンプト】LIFE X フランチャイズ LP」に基づいて作成されました。

- **作成日**: 2025-01-05
- **コンセプト**: 余白リッチ、上品な金色、静かな自信
- **参考**: PGハウス（構成・レイアウトの空気感のみ）
