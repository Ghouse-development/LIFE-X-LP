# LIFE X FC LP 画像生成プロンプト集

このファイルには、100点LP達成のための画像生成プロンプトを記載します。

---

## P0-1: Hero用決定カット（夕景LDK）

### 要件
- 夕景の高品質LDK空間
- 露出-12%、コントラスト+10%
- 暖色統一（夕日の自然光）
- "静けさ"と"雑誌級の写真力"

### 生成プロンプト

```
A stunning editorial-quality photograph of a modern Japanese LDK (living-dining-kitchen) space at golden hour.

Scene composition:
- Large floor-to-ceiling windows with warm sunset light streaming in
- Minimalist Scandinavian-Japanese fusion interior design
- Natural wood flooring (light oak or maple)
- Clean white walls with subtle texture
- Modern kitchen island with natural stone countertop
- Low-profile dining table with simple chairs
- Comfortable sofa facing the windows

Lighting and mood:
- Golden hour sunset lighting (16:30-17:00)
- Warm color temperature (3200K-3800K)
- Soft, diffused natural light
- Long shadows creating depth
- Exposure -12%, Contrast +10%
- Quiet, serene atmosphere

Technical requirements:
- Architectural photography style
- 16:10 aspect ratio
- Ultra high resolution (8K)
- Professional color grading
- Magazine editorial quality
- Shallow depth of field (f/2.8-f/4)
- Shot from corner angle to capture depth

Style references: Dezeen, ArchDaily, Kinfolk magazine interior photography
```

### 保存先
`/public/fc/hero-final.webp` または `/public/hero/hero-final.jpg`

---

## P0-2: ディテール4枚（接写）

### 2-1: 框（かまち）のディテール

```
Extreme close-up architectural detail photograph of a traditional Japanese entryway threshold (kamachi).

Subject:
- Natural wood threshold beam with beautiful grain
- Clean joint between wood and flooring
- Subtle shadow line showing craftsmanship
- Warm natural wood tone (oak or hinoki cypress)

Technical:
- Macro lens (100mm f/2.8)
- Focus on wood grain and joint precision
- Soft natural light from side
- Shallow depth of field
- High contrast to emphasize texture
- Editorial architectural detail style

Color: Warm wood tones, neutral background
Aspect ratio: 4:3 or square
Style: Architectural detail photography, magazine quality
```

**保存先**: `/public/fc/detail-kamachi.webp`

### 2-2: 巾木（はばき）のディテール

```
Close-up architectural detail photograph of a minimalist baseboard (habaki) junction.

Subject:
- Clean white painted baseboard meeting natural wood floor
- Perfect 90-degree angle showing precision craftsmanship
- Seamless joint with no gaps
- Subtle shadow line

Technical:
- 50mm or 85mm lens
- Side lighting to reveal edge and shadow
- Crisp focus on the junction line
- Minimal depth of field
- Clean, clinical composition

Color: White baseboard, light wood floor, neutral gray wall
Aspect ratio: 4:3
Style: Minimalist architectural photography, Scandinavian aesthetic
```

**保存先**: `/public/fc/detail-habaki.webp`

### 2-3: 窓回り（サッシ・額縁）のディテール

```
Architectural detail photograph of a modern window frame and surrounding trim (mawari-buchi).

Subject:
- Slim black or dark gray aluminum window frame
- Natural wood interior window trim
- Clean intersection between frame, trim, and white wall
- Soft light coming through window
- View of blurred greenery outside

Technical:
- 85mm lens
- Natural backlight from window
- Focus on the frame and trim intersection
- Slight lens flare for warmth
- Balanced exposure (interior and exterior visible)

Color: Dark frame, warm wood trim, white wall, soft outdoor light
Aspect ratio: 4:3
Style: Contemporary architectural photography, Japanese minimalism
```

**保存先**: `/public/fc/detail-window.webp`

### 2-4: 天板（カウンター・テーブル）のディテール

```
Close-up editorial photograph of a premium natural stone or wood countertop edge detail.

Subject:
- High-end kitchen island or table countertop edge
- Natural material (marble, quartz, or solid wood)
- Beveled or waterfall edge showing craftsmanship
- Subtle texture and grain pattern
- Clean underside joint with cabinetry

Technical:
- 100mm macro or 85mm lens
- Soft diffused lighting from above
- Focus on edge and material texture
- Shallow depth of field (f/2.8)
- Slight reflection on polished surface

Color: Neutral stone tones or warm wood, with soft shadows
Aspect ratio: 4:3 or square
Style: Kinfolk magazine, minimalist product photography aesthetic
```

**保存先**: `/public/fc/detail-countertop.webp`

---

## P0-3: 概念図（二重屋根・通気・制振）

### 要件
- 単色イラスト（黒/白/#D9B66Aアクセント）
- アイソメトリック図法
- 二重屋根、通気層、制振構造の関係を明示
- "編集感"のある抽象図

### 生成プロンプト

```
Minimalist isometric architectural diagram illustrating a high-performance house structure system.

Elements to show:
1. Double roof system (外屋根 + 内屋根)
2. Ventilation air gap between roofs (通気層)
3. Vibration damping structure (制振構造 - shown with damper symbols)
4. Foundation and structural frame outline

Visual style:
- Isometric projection (30° angle)
- Line art only - no shading, no gradients
- Three colors maximum:
  - Black (#0E1113) for main lines and structure
  - White/transparent background
  - Gold accent (#D9B66A) for highlighting key systems (ventilation flow arrows, dampers)
- Clean, technical drafting style
- Minimal annotations in Japanese (屋根, 通気層, 制振)
- Arrow indicators for airflow direction

Technical requirements:
- Vector-style appearance (clean, precise lines)
- High contrast
- Editorial diagram aesthetic (Monocle, Dezeen style)
- Square aspect ratio (1:1)
- Transparent or white background

Style references: Architectural section diagrams, technical illustration, infographic minimalism
```

**代替テキストプロンプト（よりシンプル）:**

```
Create a minimal isometric technical diagram showing:
- Cross-section of a house roof structure
- Two roof layers with air gap between them
- Small vibration dampers indicated at key structural points
- Simple arrows showing air circulation
- Colors: Black lines, white background, gold (#D9B66A) accent for highlights
- Style: Clean architectural line drawing, no shading, isometric view
- Labels in Japanese: 二重屋根, 通気層, 制振構造
```

**保存先**: `/public/fc/diagram-core.webp` または `.svg`

---

## P0-4: トーン統一（LUT仕様）

### 全画像に適用する色調整

```
Color grading specifications (LUT equivalent):

Highlights:
- Reduce by -8% to -12%
- Slight warm shift (+2 on red channel)

Shadows:
- Deepen by +5% to +8%
- Neutral or very slight cool shift

Midtones:
- Warm tone emphasis (+3 on red, +2 on yellow)
- Saturation -5% (for understated elegance)

Overall:
- Color temperature: 3500K-4000K (warm but not orange)
- Contrast: +8% to +10%
- Clarity/Structure: +5% (enhance texture without oversharpening)
- Vignette: Subtle -5% darkening at corners

Final aesthetic: "Quiet luxury" - warm, understated, magazine editorial quality
```

### 実装方法
- Photoshop: Camera Raw Filter → 上記パラメータ適用
- AI生成画像: プロンプトに "warm color grading, reduced highlights, deepened shadows, editorial magazine photography" を追加

### 対象画像
- `/public/hero/` 全ファイル
- `/public/fc/` 全ファイル
- `/public/gallery/` 全ファイル（ギャラリー用）

---

## 生成後のチェックリスト

- [ ] Hero画像が「静けさ」と「雑誌級の写真力」を備えているか
- [ ] ディテール4枚が接写で素材感・職人技を伝えているか
- [ ] 概念図が情報過多でなく、編集感があるか
- [ ] 全画像のトーンが統一され、色調が一定であるか
- [ ] WebP形式で最適化されているか（品質80-90、ファイルサイズ<500KB）

---

## 画像最適化コマンド

生成後、以下のコマンドでWebP変換・最適化を実行：

```bash
# ImageMagickを使用（要インストール）
magick convert input.jpg -quality 85 -define webp:method=6 output.webp

# または sharp-cli（Node.js）
npx sharp-cli --input input.jpg --output output.webp --quality 85
```

---

最終更新: 2025-11-05
作成者: Claude Code (100点LP仕上げプロジェクト)
