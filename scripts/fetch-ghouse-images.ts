#!/usr/bin/env node

/**
 * G-house公式サイトから画像を取得するスクリプト
 *
 * 実行: npm run fetch:images
 *
 * 処理:
 * 1. 指定URLから<img>タグ、og:image を抽出
 * 2. 2000px上限でダウンロード
 * 3. 16:9 ±10% → /public/hero、その他 → /public/cases
 * 4. assets.json と ASSETS.md に記録
 */

import { writeFile, mkdir, readFile } from 'fs/promises';
import { existsSync } from 'fs';
import { join } from 'path';
import * as cheerio from 'cheerio';
import sharp from 'sharp';
import pLimit from 'p-limit';

const START_URLS = [
  'https://g-house.osaka.jp/product/life-x',
  'https://g-house.osaka.jp',
  'https://g-house.osaka.jp/technology',
  'https://g-house.osaka.jp/first'
];

const PUBLIC_DIR = join(process.cwd(), 'public');
const HERO_DIR = join(PUBLIC_DIR, 'hero');
const CASES_DIR = join(PUBLIC_DIR, 'cases');
const PLACEHOLDERS_DIR = join(PUBLIC_DIR, 'placeholders');
const ASSETS_JSON = join(process.cwd(), 'content', 'assets.json');
const ASSETS_MD = join(process.cwd(), 'ASSETS.md');

interface ImageMeta {
  src: string;
  sourceUrl: string;
  fetchedAt: string;
  width: number;
  height: number;
  aspectRatio: number;
  category: 'hero' | 'case' | 'other';
}

const limit = pLimit(3); // 同時ダウンロード数制限

async function ensureDirs() {
  for (const dir of [HERO_DIR, CASES_DIR, PLACEHOLDERS_DIR, join(process.cwd(), 'content')]) {
    if (!existsSync(dir)) {
      await mkdir(dir, { recursive: true });
    }
  }
}

async function fetchHTML(url: string): Promise<string> {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; ImageFetcher/1.0)',
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return await response.text();
  } catch (error) {
    console.error(`Failed to fetch ${url}:`, error);
    return '';
  }
}

function extractImageUrls(html: string, baseUrl: string): string[] {
  const $ = cheerio.load(html);
  const urls = new Set<string>();

  // <img> タグから
  $('img').each((_, el) => {
    const src = $(el).attr('src') || $(el).attr('data-src');
    if (src) {
      try {
        const url = new URL(src, baseUrl);
        if (url.protocol.startsWith('http')) {
          urls.add(url.href);
        }
      } catch {}
    }
  });

  // og:image から
  $('meta[property="og:image"]').each((_, el) => {
    const content = $(el).attr('content');
    if (content) {
      try {
        const url = new URL(content, baseUrl);
        if (url.protocol.startsWith('http')) {
          urls.add(url.href);
        }
      } catch {}
    }
  });

  return Array.from(urls);
}

async function downloadImage(url: string): Promise<{ buffer: Buffer; width: number; height: number } | null> {
  try {
    const response = await fetch(url);
    if (!response.ok) return null;

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // sharpで処理
    let image = sharp(buffer);
    const metadata = await image.metadata();

    if (!metadata.width || !metadata.height) return null;

    // 2000px上限でリサイズ
    const maxDimension = Math.max(metadata.width, metadata.height);
    if (maxDimension > 2000) {
      image = image.resize(2000, 2000, { fit: 'inside', withoutEnlargement: true });
    }

    const processedBuffer = await image.jpeg({ quality: 85 }).toBuffer();
    const newMetadata = await sharp(processedBuffer).metadata();

    return {
      buffer: processedBuffer,
      width: newMetadata.width || metadata.width,
      height: newMetadata.height || metadata.height,
    };
  } catch (error) {
    console.error(`Failed to download ${url}:`, error);
    return null;
  }
}

function categorizeImage(width: number, height: number): 'hero' | 'case' | 'other' {
  const aspectRatio = width / height;
  const targetRatio = 16 / 9;
  const tolerance = 0.1;

  // 16:9 ±10%
  if (Math.abs(aspectRatio - targetRatio) / targetRatio <= tolerance) {
    return 'hero';
  }

  return 'case';
}

async function saveImage(buffer: Buffer, category: 'hero' | 'case' | 'other', index: number): Promise<string> {
  const dir = category === 'hero' ? HERO_DIR : CASES_DIR;
  const filename = `${category}-${index.toString().padStart(2, '0')}.jpg`;
  const filepath = join(dir, filename);

  await writeFile(filepath, buffer);

  return `/${category}/${filename}`;
}

async function updateAssetsJson(images: ImageMeta[]) {
  const heroImages = images.filter(img => img.category === 'hero');
  const caseImages = images.filter(img => img.category === 'case');

  const assetsData = {
    hero: {
      src: heroImages[0]?.src || '/placeholders/hero-placeholder.jpg',
      alt: 'LIFE X - 高性能規格住宅',
      sourceUrl: heroImages[0]?.sourceUrl,
      fetchedAt: heroImages[0]?.fetchedAt,
    },
    cases: caseImages.slice(0, 6).map(img => ({
      src: img.src,
      alt: 'LIFE X 施工事例',
      sourceUrl: img.sourceUrl,
      fetchedAt: img.fetchedAt,
    })),
    fetchedAt: new Date().toISOString(),
  };

  await writeFile(ASSETS_JSON, JSON.stringify(assetsData, null, 2), 'utf-8');
  console.log(`✓ Updated ${ASSETS_JSON}`);
}

async function updateAssetsMd(images: ImageMeta[]) {
  const content = `# Assets Source Documentation

## 画像取得元

すべての画像は以下のG-house公式サイトから取得しています。

### 取得URL

${START_URLS.map(url => `- ${url}`).join('\n')}

### 取得日時

${new Date().toISOString()}

## 取得画像一覧

### Hero画像 (16:9 ±10%)

${images.filter(img => img.category === 'hero').map(img => `
- \`${img.src}\`
  - 元URL: ${img.sourceUrl}
  - サイズ: ${img.width}x${img.height} (${img.aspectRatio.toFixed(2)})
  - 取得日: ${img.fetchedAt}
`).join('\n')}

### 事例画像

${images.filter(img => img.category === 'case').map(img => `
- \`${img.src}\`
  - 元URL: ${img.sourceUrl}
  - サイズ: ${img.width}x${img.height} (${img.aspectRatio.toFixed(2)})
  - 取得日: ${img.fetchedAt}
`).join('\n')}

## 注意事項

- 画像はG-house公式サイトからLIFE X顧客向けページより取得
- 商用利用の権利は確認済みであることを前提としています
- 再取得が必要な場合: \`npm run fetch:images\`
`;

  await writeFile(ASSETS_MD, content, 'utf-8');
  console.log(`✓ Updated ${ASSETS_MD}`);
}

async function main() {
  console.log('🚀 Starting image fetch from G-house...\n');

  await ensureDirs();

  const allImageUrls = new Set<string>();
  const urlToSource = new Map<string, string>();

  // URLから画像URLを抽出
  for (const url of START_URLS) {
    console.log(`Fetching ${url}...`);
    const html = await fetchHTML(url);
    if (html) {
      const imageUrls = extractImageUrls(html, url);
      console.log(`  Found ${imageUrls.length} images`);
      imageUrls.forEach(imgUrl => {
        allImageUrls.add(imgUrl);
        urlToSource.set(imgUrl, url);
      });
    }
  }

  console.log(`\n📦 Total unique images: ${allImageUrls.size}\n`);

  // 画像をダウンロード・分類・保存
  const images: ImageMeta[] = [];
  let heroIndex = 0;
  let caseIndex = 0;

  const tasks = Array.from(allImageUrls).map((url, idx) =>
    limit(async () => {
      console.log(`[${idx + 1}/${allImageUrls.size}] Downloading ${url}...`);
      const result = await downloadImage(url);

      if (!result) {
        console.log(`  ✗ Failed`);
        return;
      }

      const { buffer, width, height } = result;
      const category = categorizeImage(width, height);
      const index = category === 'hero' ? heroIndex++ : caseIndex++;
      const savedPath = await saveImage(buffer, category, index);

      const aspectRatio = width / height;
      console.log(`  ✓ Saved to ${savedPath} (${width}x${height}, ${category})`);

      images.push({
        src: savedPath,
        sourceUrl: urlToSource.get(url) || '',
        fetchedAt: new Date().toISOString(),
        width,
        height,
        aspectRatio,
        category,
      });
    })
  );

  await Promise.all(tasks);

  console.log(`\n📊 Summary:`);
  console.log(`  Hero images: ${images.filter(img => img.category === 'hero').length}`);
  console.log(`  Case images: ${images.filter(img => img.category === 'case').length}`);

  // assets.json と ASSETS.md を更新
  await updateAssetsJson(images);
  await updateAssetsMd(images);

  console.log(`\n✅ Done!`);
}

main().catch(console.error);
