# LIFE-X-LP

LIFE-X Landing Page - Next.js + Supabase + Vercelで構築されたランディングページ

## 技術スタック

- **フレームワーク**: Next.js 15 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **データベース**: Supabase
- **デプロイ**: Vercel

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 環境変数の設定

`.env.example` を `.env.local` にコピーして、Supabaseの認証情報を設定してください。

```bash
cp .env.example .env.local
```

### 3. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

## Vercelへのデプロイ

### Vercel CLIを使用

```bash
# Vercelにログイン
vercel login

# プロジェクトをリンク
vercel link

# 環境変数を設定
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add SUPABASE_SERVICE_ROLE_KEY

# デプロイ
vercel --prod
```

### Vercel Dashboardを使用

1. [Vercel Dashboard](https://vercel.com/dashboard)にアクセス
2. GitHubリポジトリをインポート
3. 環境変数を設定
4. デプロイ

## ディレクトリ構成

```
.
├── app/                  # Next.js App Router
│   ├── layout.tsx       # ルートレイアウト
│   ├── page.tsx         # ホームページ
│   └── globals.css      # グローバルスタイル
├── lib/                 # ユーティリティ
│   └── supabase.ts      # Supabaseクライアント
├── docs/                # ドキュメント
│   ├── 開発記録/        # 開発進捗の記録
│   ├── 目的/            # プロジェクトの目的
│   └── 重要事項/        # 重要事項や技術的決定
└── public/              # 静的ファイル
```

## ドキュメント

プロジェクトのドキュメントは `docs/` ディレクトリに整理されています：

- **開発記録**: 日々の開発進捗や実装内容
- **目的**: プロジェクトのビジョンや目標
- **重要事項**: セキュリティやデプロイに関する重要事項

## スクリプト

- `npm run dev`: 開発サーバーを起動
- `npm run build`: 本番用ビルドを作成
- `npm run start`: 本番サーバーを起動
- `npm run lint`: ESLintでコードをチェック

## ライセンス

Private
