# Assets Source Documentation

## 画像取得元

すべての画像は以下のG-house公式サイトから取得しています。

### 取得対象URL

- https://g-house.osaka.jp/product/life-x
- https://g-house.osaka.jp
- https://g-house.osaka.jp/technology
- https://g-house.osaka.jp/first

### 取得方法

\`\`\`bash
npm run fetch:images
\`\`\`

このスクリプトは以下を実行します：

1. 上記URLから\`<img>\`タグと\`og:image\`を抽出
2. 画像をダウンロード（2000px上限）
3. アスペクト比で分類：
   - **16:9 ±10%** → \`/public/hero\` （ヒーロー画像）
   - **その他** → \`/public/cases\` （事例画像）
4. \`content/assets.json\` を自動更新
5. この\`ASSETS.md\`を自動更新

### 取得日時

**まだ実行されていません。** \`npm run fetch:images\` を実行してください。

## 取得画像一覧

### Hero画像 (16:9 ±10%)

（\`npm run fetch:images\` 実行後に自動記録されます）

### 事例画像

（\`npm run fetch:images\` 実行後に自動記録されます）

## 注意事項

- 画像はG-house公式サイトのLIFE X関連ページから取得
- 商用利用の権利は確認済みであることを前提としています
- 画像の著作権はG-houseに帰属します
- 再取得が必要な場合: \`npm run fetch:images\`

## アイコン

\`/public/icons\` 内のSVGアイコンはすべて独自作成（単色線画、stroke="currentColor"）。

- house-shield.svg - 耐震性能
- insulation-sun-snow.svg - 断熱性能
- airflow.svg - 換気システム
- blueprint.svg - 設計・積算
- hammer-gear.svg - 現場標準化
- chart-yen.svg - 収益モデル
- megaphone-ab.svg - 広告運用
- handshake.svg - 伴走サポート
- timeline-6.svg - 導入フロー
- calendar-video.svg - ウェビナー
- phone-mail.svg - お問い合わせ

## プレースホルダー

実際の画像が取得されるまでのプレースホルダーは、各ディレクトリの\`.gitkeep\`ファイルで管理しています。

## 更新履歴

- 2025-10-31: プロジェクト初期セットアップ、画像取得スクリプト作成
