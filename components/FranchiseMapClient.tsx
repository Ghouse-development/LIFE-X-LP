'use client';

import dynamic from 'next/dynamic';

// Leafletを使うコンポーネントは動的インポート（SSR無効化）
const FranchiseMap = dynamic(
  () => import('./FranchiseMap').then((mod) => mod.FranchiseMap),
  { ssr: false }
);

export function FranchiseMapClient() {
  return <FranchiseMap />;
}
