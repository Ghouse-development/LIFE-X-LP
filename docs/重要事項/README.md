# 重要事項

このディレクトリには、プロジェクトの重要事項を記述します。

## 記録する内容

- セキュリティに関する注意事項
- 環境変数の管理方法
- デプロイ時の注意事項
- 重要な技術的決定事項
- チーム内のルールやガイドライン

## 環境変数

### 必須の環境変数

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### セキュリティ

- サービスロールキーはサーバーサイドでのみ使用してください
- 環境変数は `.env.local` に保存し、Gitにコミットしないでください
- 本番環境ではVercelの環境変数設定を使用してください

## デプロイ

### Vercelへのデプロイ

1. Vercel CLIでプロジェクトをリンク
2. 環境変数を設定
3. デプロイを実行

詳細は後述のドキュメントを参照してください。
