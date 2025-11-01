'use client';

import { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface Store {
  id: string;
  name: string;
  prefecture: string;
  city: string;
  address: string;
  full_address: string;
  joined_date: string;
}

// 地域別グループ（PG HOUSEスタイル）
const regions = [
  { name: '北海道・東北', prefectures: ['北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県'] },
  { name: '関東', prefectures: ['茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県'] },
  { name: '甲信越・北陸', prefectures: ['新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県'] },
  { name: '東海', prefectures: ['岐阜県', '静岡県', '愛知県', '三重県'] },
  { name: '関西', prefectures: ['滋賀県', '京都府', '大阪府', '兵庫県', '奈良県', '和歌山県'] },
  { name: '中国', prefectures: ['鳥取県', '島根県', '岡山県', '広島県', '山口県'] },
  { name: '四国', prefectures: ['徳島県', '香川県', '愛媛県', '高知県'] },
  { name: '九州・沖縄', prefectures: ['福岡県', '佐賀県', '長崎県', '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県'] },
];

// 仮データ（Supabaseテーブル作成前も表示されるように）
const defaultStores: Store[] = [
  {
    id: '1',
    name: 'コンチネンタルホーム株式会社',
    prefecture: '栃木県',
    city: '佐野市',
    address: '大町2979-1',
    full_address: '栃木県佐野市大町2979-1',
    joined_date: '2024-11-01',
  },
  {
    id: '2',
    name: 'LIFE X 東京',
    prefecture: '東京都',
    city: '渋谷区',
    address: '渋谷1-1-1',
    full_address: '東京都渋谷区渋谷1-1-1',
    joined_date: '2024-06-15',
  },
  {
    id: '3',
    name: 'LIFE X 大阪',
    prefecture: '大阪府',
    city: '大阪市',
    address: '北区梅田1-1-1',
    full_address: '大阪府大阪市北区梅田1-1-1',
    joined_date: '2024-08-20',
  },
  {
    id: '4',
    name: 'LIFE X 福岡',
    prefecture: '福岡県',
    city: '福岡市',
    address: '博多区博多駅前1-1-1',
    full_address: '福岡県福岡市博多区博多駅前1-1-1',
    joined_date: '2024-04-10',
  },
  {
    id: '5',
    name: 'LIFE X 愛知',
    prefecture: '愛知県',
    city: '名古屋市',
    address: '中村区名駅1-1-1',
    full_address: '愛知県名古屋市中村区名駅1-1-1',
    joined_date: '2024-05-22',
  },
  {
    id: '6',
    name: 'LIFE X 北海道',
    prefecture: '北海道',
    city: '札幌市',
    address: '中央区北1条西1-1-1',
    full_address: '北海道札幌市中央区北1条西1-1-1',
    joined_date: '2024-03-15',
  },
  {
    id: '7',
    name: 'LIFE X 広島',
    prefecture: '広島県',
    city: '広島市',
    address: '中区紙屋町1-1-1',
    full_address: '広島県広島市中区紙屋町1-1-1',
    joined_date: '2024-07-08',
  },
  {
    id: '8',
    name: 'LIFE X 宮城',
    prefecture: '宮城県',
    city: '仙台市',
    address: '青葉区中央1-1-1',
    full_address: '宮城県仙台市青葉区中央1-1-1',
    joined_date: '2024-02-28',
  },
  {
    id: '9',
    name: 'LIFE X 静岡',
    prefecture: '静岡県',
    city: '静岡市',
    address: '葵区呉服町1-1-1',
    full_address: '静岡県静岡市葵区呉服町1-1-1',
    joined_date: '2024-09-12',
  },
  {
    id: '10',
    name: 'LIFE X 神奈川',
    prefecture: '神奈川県',
    city: '横浜市',
    address: '西区みなとみらい1-1-1',
    full_address: '神奈川県横浜市西区みなとみらい1-1-1',
    joined_date: '2024-01-20',
  },
  {
    id: '11',
    name: 'LIFE X 兵庫',
    prefecture: '兵庫県',
    city: '神戸市',
    address: '中央区三宮町1-1-1',
    full_address: '兵庫県神戸市中央区三宮町1-1-1',
    joined_date: '2024-10-05',
  },
  {
    id: '12',
    name: 'LIFE X 埼玉',
    prefecture: '埼玉県',
    city: 'さいたま市',
    address: '大宮区桜木町1-1-1',
    full_address: '埼玉県さいたま市大宮区桜木町1-1-1',
    joined_date: '2024-12-01',
  },
];

export function FranchiseMapSimple() {
  const [stores, setStores] = useState<Store[]>(defaultStores);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // 加盟店データを取得（Supabaseから）
  useEffect(() => {
    const fetchStores = async () => {
      // Supabaseが設定されていない場合は早期リターン
      if (!isSupabaseConfigured) {
        return;
      }

      try {
        const { data, error } = await supabase
          .from('stores')
          .select('*')
          .order('joined_date', { ascending: false });

        if (error) {
          console.log('Supabase stores table not ready, using default data');
          return; // エラー時は仮データのまま
        }

        if (data && data.length > 0) {
          setStores(data); // データがあれば上書き
        }
      } catch (error) {
        console.log('Error fetching stores, using default data:', error);
      }
    };

    fetchStores();
  }, []);

  // 地域別の加盟店数を計算
  const getStoresByRegion = (prefectures: string[]) => {
    return stores.filter(store => prefectures.includes(store.prefecture));
  };

  // 選択された地域の加盟店
  const selectedStores = selectedRegion
    ? getStoresByRegion(regions.find(r => r.name === selectedRegion)?.prefectures || [])
    : stores;

  return (
    <section ref={ref} className="py-40 px-4 bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-pg-5"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            全国の加盟店
          </h2>
          <p className="text-gray-600 text-lg">
            現在、全国{stores.length}店舗で展開中。お近くの加盟店を探してみてください。
          </p>
        </motion.div>

        {/* 日本地図ビジュアル - 白地図 + ピン配置 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-12 bg-gradient-to-b from-blue-50 to-white rounded-3xl p-8"
        >
          <div className="max-w-4xl mx-auto">
            <svg viewBox="0 0 1000 1200" className="w-full h-auto">
              {/* 日本地図（白地図） */}
              <g id="japan-map" fill="#f9fafb" stroke="#9ca3af" strokeWidth="2">
                {/* 北海道 */}
                <path d="M 820,80 L 900,60 L 950,100 L 940,180 L 880,200 L 800,180 L 780,120 Z" />

                {/* 本州 */}
                {/* 東北地方 */}
                <path d="M 850,220 L 900,240 L 920,320 L 900,400 L 880,450 L 860,480 L 840,460 L 820,420 L 800,360 L 810,280 L 830,240 Z" />

                {/* 関東地方 */}
                <path d="M 860,480 L 880,510 L 900,540 L 920,580 L 900,620 L 860,640 L 820,630 L 800,600 L 790,560 L 810,520 L 840,490 Z" />

                {/* 中部地方 */}
                <path d="M 790,560 L 800,600 L 780,640 L 740,660 L 700,670 L 660,660 L 640,630 L 650,590 L 680,560 L 720,550 L 760,555 Z" />

                {/* 近畿地方 */}
                <path d="M 660,660 L 700,670 L 720,700 L 720,740 L 680,760 L 640,750 L 610,720 L 620,680 L 640,665 Z" />

                {/* 中国地方 */}
                <path d="M 610,720 L 640,750 L 620,790 L 560,810 L 480,820 L 420,810 L 400,780 L 420,740 L 480,730 L 540,735 L 590,730 Z" />

                {/* 四国 */}
                <path d="M 560,840 L 620,850 L 650,880 L 640,920 L 580,930 L 520,920 L 480,890 L 500,860 L 540,845 Z" />

                {/* 九州 */}
                <path d="M 350,860 L 400,880 L 430,920 L 440,980 L 420,1040 L 380,1080 L 320,1100 L 260,1080 L 240,1020 L 250,960 L 280,900 L 320,870 Z" />
              </g>

              {/* 加盟店ピン配置 */}
              {stores.map((store, index) => {
                // 都道府県別の座標マッピング
                const prefectureCoords: { [key: string]: { x: number; y: number } } = {
                  '北海道': { x: 870, y: 130 },
                  '青森県': { x: 870, y: 260 },
                  '岩手県': { x: 890, y: 300 },
                  '宮城県': { x: 880, y: 350 },
                  '秋田県': { x: 850, y: 310 },
                  '山形県': { x: 850, y: 370 },
                  '福島県': { x: 860, y: 430 },
                  '茨城県': { x: 880, y: 500 },
                  '栃木県': { x: 850, y: 510 },
                  '群馬県': { x: 820, y: 520 },
                  '埼玉県': { x: 850, y: 550 },
                  '千葉県': { x: 900, y: 560 },
                  '東京都': { x: 870, y: 580 },
                  '神奈川県': { x: 860, y: 610 },
                  '新潟県': { x: 800, y: 450 },
                  '富山県': { x: 750, y: 510 },
                  '石川県': { x: 730, y: 530 },
                  '福井県': { x: 710, y: 560 },
                  '山梨県': { x: 820, y: 580 },
                  '長野県': { x: 780, y: 560 },
                  '岐阜県': { x: 740, y: 600 },
                  '静岡県': { x: 800, y: 630 },
                  '愛知県': { x: 740, y: 640 },
                  '三重県': { x: 720, y: 670 },
                  '滋賀県': { x: 690, y: 660 },
                  '京都府': { x: 690, y: 690 },
                  '大阪府': { x: 670, y: 710 },
                  '兵庫県': { x: 640, y: 700 },
                  '奈良県': { x: 690, y: 720 },
                  '和歌山県': { x: 680, y: 750 },
                  '鳥取県': { x: 600, y: 720 },
                  '島根県': { x: 550, y: 730 },
                  '岡山県': { x: 600, y: 760 },
                  '広島県': { x: 540, y: 770 },
                  '山口県': { x: 470, y: 790 },
                  '徳島県': { x: 640, y: 860 },
                  '香川県': { x: 600, y: 850 },
                  '愛媛県': { x: 550, y: 870 },
                  '高知県': { x: 590, y: 900 },
                  '福岡県': { x: 380, y: 890 },
                  '佐賀県': { x: 340, y: 910 },
                  '長崎県': { x: 300, y: 930 },
                  '熊本県': { x: 350, y: 960 },
                  '大分県': { x: 420, y: 920 },
                  '宮崎県': { x: 400, y: 1000 },
                  '鹿児島県': { x: 340, y: 1050 },
                  '沖縄県': { x: 250, y: 1150 },
                };

                const coords = prefectureCoords[store.prefecture];
                if (!coords) return null;

                return (
                  <g key={store.id}>
                    {/* ピン */}
                    <circle
                      cx={coords.x}
                      cy={coords.y}
                      r="12"
                      fill="#3b82f6"
                      stroke="white"
                      strokeWidth="3"
                      className="cursor-pointer hover:fill-blue-700 transition-colors"
                      onClick={() => setSelectedRegion(null)}
                    />
                    {/* ピン下の影 */}
                    <ellipse
                      cx={coords.x}
                      cy={coords.y + 2}
                      rx="8"
                      ry="3"
                      fill="black"
                      opacity="0.2"
                    />
                  </g>
                );
              })}

              {/* 凡例 */}
              <g transform="translate(50, 50)">
                <circle cx="10" cy="10" r="10" fill="#3b82f6" stroke="white" strokeWidth="2" />
                <text x="30" y="15" fontSize="16" fill="#4b5563" fontWeight="500">加盟店（全{stores.length}店）</text>
              </g>
            </svg>

            <p className="text-center text-gray-600 mt-4 text-sm">
              各ピンは加盟店の所在地を示しています
            </p>
          </div>
        </motion.div>

        {/* 地域選択ボタン（PG HOUSEスタイル） */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-pg mb-pg-5"
        >
          <button
            onClick={() => setSelectedRegion(null)}
            className={`px-6 py-3 rounded-pg-pill font-medium transition-all duration-300 ${
              selectedRegion === null
                ? 'bg-gray-700 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            すべて ({stores.length})
          </button>
          {regions.map((region) => {
            const count = getStoresByRegion(region.prefectures).length;
            return (
              <button
                key={region.name}
                onClick={() => setSelectedRegion(region.name)}
                className={`px-6 py-3 rounded-pg-pill font-medium transition-all duration-300 ${
                  selectedRegion === region.name
                    ? 'bg-gray-700 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {region.name} ({count})
              </button>
            );
          })}
        </motion.div>

        {/* 加盟店カード一覧（PG HOUSEスタイル） */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-pg"
        >
          {selectedStores.length > 0 ? (
            selectedStores.map((store) => (
              <div
                key={store.id}
                className="bg-white p-pg-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <h4 className="font-bold text-lg mb-3">{store.name}</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <p className="flex items-start">
                    <MapPin className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0 text-blue-600" />
                    <span>{store.full_address}</span>
                  </p>
                  <p className="text-xs text-gray-500 pl-6">
                    加盟: {new Date(store.joined_date).toLocaleDateString('ja-JP', {
                      year: 'numeric',
                      month: 'long',
                    })}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-gray-500">
              <p>この地域には加盟店がまだありません。</p>
              <p className="text-sm mt-2">新規加盟をご検討ください。</p>
            </div>
          )}
        </motion.div>

        {/* 加盟店がない場合のメッセージ */}
        {stores.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p>加盟店情報を読み込み中...</p>
          </div>
        )}
      </div>
    </section>
  );
}
