# LIFE X フランチャイズ LP

LIFE X フランチャイズ向けランディングページ - Next.js 15 + Supabase + Vercel

## 概要

工務店（FC検討層）向けのランディングページ。商品力・収益モデル・導入フローを段階的に提示し、問い合わせ（MQL）とウェビナー登録を獲得します。

### 技術スタック

- **フレームワーク**: Next.js 15 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **アニメーション**: Framer Motion（最小限）
- **データベース**: Supabase
- **デプロイ**: Vercel
- **計測**: Google Analytics 4 + Meta Pixel

### デザインリファレンス

- **SHINKOKYU**: 余白・静かな写真主体・穏やかなモーション（"呼吸"のような微動）
- **PG HOUSE**: FC訴求の流れ（なぜ→導入フロー→事例→問い合わせ）とCTA配置

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

### 3. Supabaseのテーブル作成

Supabase Dashboard > SQL Editor で \`supabase-setup.sql\` を実行してください。

\`\`\`bash
# または、Supabase CLIを使用
supabase db push
\`\`\`

### 4. 画像の取得（G-house公式サイトから）

\`\`\`bash
npm run fetch:images
\`\`\`

このスクリプトは以下を実行します：

- G-house公式サイト（LIFE X関連ページ）から画像を自動取得
- 16:9 ±10%の画像は \`/public/hero\` に保存
- その他の画像は \`/public/cases\` に保存
- \`content/assets.json\` と \`ASSETS.md\` を自動更新

**注意**: 画像はG-house公式サイトからのみ取得します。商用利用の権利は確認済みであることを前提としています。

### 5. 開発サーバーの起動

\`\`\`bash
npm run dev
\`\`\`

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

## Vercelへのデプロイ

### Vercel CLIを使用

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

## ディレクトリ構成

\`\`\`
.
├── app/
│   ├── api/
│   │   ├── lead/route.ts          # 問い合わせAPI
│   │   └── webinar/route.ts       # ウェビナー申込API
│   ├── webinar/
│   │   └── page.tsx               # ウェビナーページ
│   ├── layout.tsx                 # ルートレイアウト
│   ├── page.tsx                   # ホームページ
│   └── globals.css                # グローバルスタイル
├── components/
│   ├── Hero.tsx                   # ヒーローセクション
│   ├── ValueProps.tsx             # 価値提案
│   ├── SpecAndStandard.tsx        # 標準仕様
│   ├── UnitEconomics.tsx          # 収益モデル
│   ├── Flow.tsx                   # 導入フロー
│   ├── Cases.tsx                  # 事例
│   ├── WebinarCTA.tsx             # ウェビナーCTA
│   ├── FAQ.tsx                    # よくある質問
│   ├── FinalCTA.tsx               # 最終CTA
│   ├── LeadForm.tsx               # 問い合わせフォーム
│   └── WebinarForm.tsx            # ウェビナー申込フォーム
├── content/
│   ├── site.json                  # サイト設定
│   ├── spec.json                  # 仕様データ
│   ├── finance.json               # 収益モデルデータ
│   ├── faq.json                   # FAQデータ
│   ├── cases.json                 # 事例データ
│   ├── webinar.json               # ウェビナーデータ
│   └── assets.json                # 画像アセット（自動生成）
├── lib/
│   ├── supabase.ts                # Supabaseクライアント
│   ├── seo.ts                     # SEO/OGP/JSON-LD
│   ├── events.ts                  # GA4/Meta Pixel イベント
│   └── analytics.tsx              # Analytics スクリプト
├── public/
│   ├── icons/                     # SVGアイコン（単色線画）
│   ├── hero/                      # ヒーロー画像（16:9）
│   ├── cases/                     # 事例画像
│   ├── og/                        # OG画像
│   └── placeholders/              # プレースホルダー画像
├── scripts/
│   └── fetch-ghouse-images.ts     # 画像取得スクリプト
├── supabase-setup.sql             # Supabaseテーブル定義
├── ASSETS.md                      # 画像出所記録（自動生成）
└── README.md                      # このファイル
\`\`\`

## コンテンツ更新

### JSONファイルの編集

各種コンテンツは \`content/*.json\` で管理されています：

- \`site.json\`: サイト基本情報、ヒーロー、フッター
- \`spec.json\`: LIFE X の標準仕様
- \`finance.json\`: 収益モデル概算
- \`faq.json\`: よくある質問（10問）
- \`cases.json\`: 導入事例（ダミーデータ）
- \`webinar.json\`: ウェビナー情報・日程
- \`assets.json\`: 画像アセット（自動生成、手動編集不要）

### 画像の更新

画像を更新する場合：

\`\`\`bash
npm run fetch:images
\`\`\`

手動で画像を追加する場合は、\`/public/hero\` または \`/public/cases\` に配置し、\`content/assets.json\` を手動更新してください。

## スクリプト

- \`npm run dev\`: 開発サーバーを起動
- \`npm run build\`: 本番用ビルドを作成
- \`npm run start\`: 本番サーバーを起動
- \`npm run lint\`: ESLintでコードをチェック
- \`npm run fetch:images\`: G-houseから画像を取得

## パフォーマンス目標

- **Lighthouse**: 90+
- **CLS**: <0.05
- **LCP**: <2.5s（3G Fast）

### 最適化手法

- Next.jsの\`next/image\`で画像最適化（AVIF/WebP、sizesレスポンシブ）
- Framer Motionは最小限（初回表示時のみ、0.3–0.5s、移動距離小）
- コードスプリッティング（App Router自動）
- クリティカルCSSのインライン化

## SEO/計測

### JSON-LD構造化データ

- Organization（サイト情報）
- Product（LIFE X フランチャイズ）
- FAQPage（よくある質問）

### イベントトラッキング

- \`cta_click\`: CTA クリック
- \`lead_submit\`: 問い合わせ送信
- \`webinar_view\`: ウェビナーページ閲覧
- \`webinar_submit\`: ウェビナー申込
- \`section_view\`: セクション表示
- \`phone_click\`: 電話番号クリック
- \`email_click\`: メールアドレスクリック

## データベース

### テーブル

#### \`fc_leads\`（問い合わせ）

| カラム | 型 | 説明 |
|--------|------|------|
| id | uuid | 主キー |
| company | text | 会社名・屋号 |
| name | text | 名前（必須） |
| email | text | メールアドレス（必須） |
| phone | text | 電話番号 |
| prefecture | text | 都道府県 |
| message | text | お問い合わせ内容 |
| source | text | 流入元 |
| utm | jsonb | UTMパラメータ |
| created_at | timestamptz | 作成日時 |

#### \`fc_webinar_regs\`（ウェビナー申込）

| カラム | 型 | 説明 |
|--------|------|------|
| id | uuid | 主キー |
| company | text | 会社名・屋号 |
| name | text | 名前（必須） |
| email | text | メールアドレス（必須） |
| phone | text | 電話番号 |
| prefecture | text | 都道府県 |
| desired_date | timestamptz | 希望日時 |
| recording_ok | boolean | 録画視聴希望 |
| utm | jsonb | UTMパラメータ |
| created_at | timestamptz | 作成日時 |

## コピー規律（AI臭カット）

- 一文60字以内
- 体言止め多用しない
- 抽象語・誇張語を避け、数値はレンジ＋脚注
- CTAは行為ベース：「30分で概要相談」「次回ウェビナーに申し込む」

## トラブルシューティング

### 画像が表示されない

\`npm run fetch:images\` を実行して画像を取得してください。

### Supabaseエラー

環境変数（\`.env.local\`）が正しく設定されているか確認してください。

### ビルドエラー

\`\`\`bash
rm -rf .next node_modules
npm install
npm run build
\`\`\`

## ライセンス

Private

## お問い合わせ

詳細は [ASSETS.md](./ASSETS.md) を参照してください。
