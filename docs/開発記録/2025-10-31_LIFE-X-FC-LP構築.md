# 2025-10-31 LIFE X フランチャイズLP 完全構築

## 実装内容

### プロジェクト概要

工務店（FC検討層）向けのLIFE Xフランチャイズ LP を Next.js 15 で完全構築。

**目標**:
- 問い合わせ送信（MQL）
- 毎月ウェビナー登録

**技術スタック**:
- Next.js 15 (App Router) + TypeScript + Tailwind CSS
- Framer Motion（最小限のアニメーション）
- Supabase（データベース）
- Vercel（デプロイ）
- GA4 + Meta Pixel（計測）

### デザインリファレンス分析

1. **SHINKOKYU** (https://shinkokyu.jp)
   - 余白・静かな写真主体
   - 穏やかなモーション（"呼吸"のような微動）
   - 情報密度を抑えた可読レイアウト

2. **PG HOUSE** (https://pg-house.jp/fc_lp01/)
   - FC訴求の流れ（なぜ→導入フロー→事例→問い合わせ）
   - CTA配置（ヒーロー／中腹／末尾）
   - 説明粒度のバランス

### 実装した機能

#### 1. コンポーネント（12個）

- **Hero**: 実写背景＋黒オーバーレイ、呼吸のようなフェード＆スケール
- **ValueProps**: 6つの価値提案カード（商品力／粗利／設計／現場／広告／サポート）
- **SpecAndStandard**: 標準仕様表＋バッジ（耐震等級3／UA値0.46／第一種換気）
- **UnitEconomics**: 収益モデル概算（1棟粗利／販促費／黒字化モデル）
- **Flow**: 導入の6ステップ（横スクロール・モバイルはカルーセル）
- **Cases**: 導入事例3件（ダミーデータ）
- **WebinarCTA**: ウェビナー強訴求ブロック
- **FAQ**: よくある質問10問（アコーディオン）
- **LeadForm**: 問い合わせフォーム（Thanksモーダル付き）
- **WebinarForm**: ウェビナー申込フォーム（日程選択＋録画視聴希望）
- **FinalCTA**: 最終CTA（電話／フォーム／ウェビナー）

#### 2. ページ

- **/** : メインLP（全セクション統合）
- **/webinar** : ウェビナー申込専用ページ（プログラム＋申込フォーム）

#### 3. API Routes

- **/api/lead** : 問い合わせ送信（Supabase fc_leads へ保存）
- **/api/webinar** : ウェビナー申込（Supabase fc_webinar_regs へ保存）

#### 4. データ管理（JSON）

\`content/*.json\` で分離管理:
- site.json: サイト基本情報
- spec.json: LIFE X標準仕様
- finance.json: 収益モデル概算
- faq.json: FAQ10問
- cases.json: 導入事例
- webinar.json: ウェビナー情報・日程
- assets.json: 画像アセット（自動生成）

#### 5. 画像取得スクリプト

\`scripts/fetch-ghouse-images.ts\`:
- G-house公式サイト（LIFE X関連4ページ）から画像を自動取得
- 16:9 ±10% → \`/public/hero\`
- その他 → \`/public/cases\`
- \`content/assets.json\` と \`ASSETS.md\` を自動更新

**実行**: \`npm run fetch:images\`

#### 6. アイコン（SVG）

11個の単色線画アイコンを作成:
- house-shield, insulation-sun-snow, airflow, blueprint, hammer-gear, chart-yen, megaphone-ab, handshake, timeline-6, calendar-video, phone-mail

#### 7. SEO / 計測

- **JSON-LD**: Organization / Product / FAQPage
- **OGP**: title / description / image
- **GA4 + Meta Pixel**: イベントトラッキング（cta_click / lead_submit / webinar_submit 等）

#### 8. Supabase

テーブル定義（\`supabase-setup.sql\`）:
- \`fc_leads\`: 問い合わせデータ
- \`fc_webinar_regs\`: ウェビナー申込データ

Row Level Security（RLS）:
- 匿名ユーザーは挿入のみ可能
- service_roleのみ読み取り可能

### ファイル構成

\`\`\`
app/
  api/lead/route.ts
  api/webinar/route.ts
  webinar/page.tsx
  page.tsx (メインLP)
  layout.tsx
  globals.css

components/
  Hero.tsx
  ValueProps.tsx
  SpecAndStandard.tsx
  UnitEconomics.tsx
  Flow.tsx
  Cases.tsx
  WebinarCTA.tsx
  FAQ.tsx
  FinalCTA.tsx
  LeadForm.tsx
  WebinarForm.tsx

content/
  site.json
  spec.json
  finance.json
  faq.json
  cases.json
  webinar.json
  assets.json

lib/
  supabase.ts
  seo.ts
  events.ts
  analytics.tsx

public/
  icons/ (11個のSVGアイコン)
  hero/ (.gitkeep)
  cases/ (.gitkeep)
  og/ (.gitkeep)
  placeholders/ (.gitkeep)

scripts/
  fetch-ghouse-images.ts

supabase-setup.sql
ASSETS.md
README.md
\`\`\`

### デザイン指針

1. **余白と可読性**（SHINKOKYU準拠）
   - 行間広め、余白大きめ
   - セクション間に十分なスペース
   - 情報密度を抑える

2. **モーション**（最小限）
   - 初回表示時のみ（0.3–0.5s）
   - 移動距離は小さく（y: 20px程度）
   - 呼吸のような穏やかな動き

3. **CTA配置**（PG HOUSE準拠）
   - ヒーロー（資料請求・ウェビナー）
   - 中腹（WebinarCTA）
   - 末尾（FinalCTA）

4. **コピー規律**（AI臭カット）
   - 一文60字以内
   - 体言止め多用しない
   - 数値はレンジ＋脚注
   - CTAは行為ベース

### パフォーマンス対策

- next/image で画像最適化（AVIF/WebP、sizes最適化）
- Framer Motion は最小限
- コードスプリッティング（App Router自動）
- Lighthouse 90+, CLS<0.05, LCP<2.5s を目標

## 次のステップ

1. **画像取得**: \`npm run fetch:images\` でG-houseから画像を取得
2. **Supabaseセットアップ**: \`supabase-setup.sql\` をSupabase Dashboardで実行
3. **環境変数設定**: \`.env.local\` に Supabase認証情報を設定
4. **開発サーバー起動**: \`npm run dev\`
5. **Vercelデプロイ**: \`vercel --prod\` （環境変数も設定）

## 技術的な特徴

- **型安全**: TypeScript + Zod でバリデーション
- **パフォーマンス**: next/image, Framer Motion最小限
- **SEO**: JSON-LD構造化データ + OGP
- **計測**: GA4 + Meta Pixel のイベントトラッキング
- **保守性**: JSONでコンテンツ分離、コンポーネント再利用

## 注意事項

- 画像はG-house公式サイトから取得（商用利用権は確認済み前提）
- 収益モデルの数値はダミー（面談時に確定値を開示）
- FAQ・事例は仮データ（実データに差し替え必要）
- Supabase RLSで匿名ユーザーは挿入のみ可能

## 完了確認

- ✅ コンポーネント12個作成
- ✅ ページ2個（/ と /webinar）
- ✅ API Routes 2個（/api/lead と /api/webinar）
- ✅ JSON データファイル7個
- ✅ 画像取得スクリプト
- ✅ SVGアイコン11個
- ✅ Supabaseテーブル定義
- ✅ SEO/OGP/JSON-LD
- ✅ GA4/Meta Pixel統合
- ✅ README.md + ASSETS.md

プロジェクト完全構築完了！
