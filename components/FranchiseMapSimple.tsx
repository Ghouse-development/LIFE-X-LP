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

        {/* 日本地図ビジュアル */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-12 bg-gradient-to-b from-blue-50 to-white rounded-3xl p-8"
        >
          <div className="max-w-4xl mx-auto">
            <svg viewBox="0 0 800 600" className="w-full h-auto">
              {/* 日本地図（簡略版：地域ブロック表示） */}
              {/* 北海道・東北 */}
              <g>
                <rect
                  x="600"
                  y="20"
                  width="180"
                  height="140"
                  fill={getStoresByRegion(regions[0].prefectures).length > 0 ? '#3b82f6' : '#e5e7eb'}
                  stroke="#9ca3af"
                  strokeWidth="2"
                  rx="8"
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => setSelectedRegion(regions[0].name)}
                />
                <text x="690" y="80" fontSize="16" fill="white" fontWeight="bold" textAnchor="middle">
                  北海道・東北
                </text>
                <text x="690" y="105" fontSize="24" fill="white" fontWeight="bold" textAnchor="middle">
                  {getStoresByRegion(regions[0].prefectures).length}店
                </text>
              </g>

              {/* 関東 */}
              <g>
                <rect
                  x="580"
                  y="180"
                  width="200"
                  height="120"
                  fill={getStoresByRegion(regions[1].prefectures).length > 0 ? '#3b82f6' : '#e5e7eb'}
                  stroke="#9ca3af"
                  strokeWidth="2"
                  rx="8"
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => setSelectedRegion(regions[1].name)}
                />
                <text x="680" y="230" fontSize="16" fill="white" fontWeight="bold" textAnchor="middle">
                  関東
                </text>
                <text x="680" y="255" fontSize="24" fill="white" fontWeight="bold" textAnchor="middle">
                  {getStoresByRegion(regions[1].prefectures).length}店
                </text>
              </g>

              {/* 甲信越・北陸 */}
              <g>
                <rect
                  x="420"
                  y="160"
                  width="140"
                  height="120"
                  fill={getStoresByRegion(regions[2].prefectures).length > 0 ? '#3b82f6' : '#e5e7eb'}
                  stroke="#9ca3af"
                  strokeWidth="2"
                  rx="8"
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => setSelectedRegion(regions[2].name)}
                />
                <text x="490" y="210" fontSize="14" fill="white" fontWeight="bold" textAnchor="middle">
                  甲信越・北陸
                </text>
                <text x="490" y="235" fontSize="24" fill="white" fontWeight="bold" textAnchor="middle">
                  {getStoresByRegion(regions[2].prefectures).length}店
                </text>
              </g>

              {/* 東海 */}
              <g>
                <rect
                  x="480"
                  y="300"
                  width="160"
                  height="100"
                  fill={getStoresByRegion(regions[3].prefectures).length > 0 ? '#3b82f6' : '#e5e7eb'}
                  stroke="#9ca3af"
                  strokeWidth="2"
                  rx="8"
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => setSelectedRegion(regions[3].name)}
                />
                <text x="560" y="340" fontSize="16" fill="white" fontWeight="bold" textAnchor="middle">
                  東海
                </text>
                <text x="560" y="365" fontSize="24" fill="white" fontWeight="bold" textAnchor="middle">
                  {getStoresByRegion(regions[3].prefectures).length}店
                </text>
              </g>

              {/* 関西 */}
              <g>
                <rect
                  x="280"
                  y="300"
                  width="180"
                  height="120"
                  fill={getStoresByRegion(regions[4].prefectures).length > 0 ? '#3b82f6' : '#e5e7eb'}
                  stroke="#9ca3af"
                  strokeWidth="2"
                  rx="8"
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => setSelectedRegion(regions[4].name)}
                />
                <text x="370" y="350" fontSize="16" fill="white" fontWeight="bold" textAnchor="middle">
                  関西
                </text>
                <text x="370" y="375" fontSize="24" fill="white" fontWeight="bold" textAnchor="middle">
                  {getStoresByRegion(regions[4].prefectures).length}店
                </text>
              </g>

              {/* 中国 */}
              <g>
                <rect
                  x="80"
                  y="280"
                  width="180"
                  height="100"
                  fill={getStoresByRegion(regions[5].prefectures).length > 0 ? '#3b82f6' : '#e5e7eb'}
                  stroke="#9ca3af"
                  strokeWidth="2"
                  rx="8"
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => setSelectedRegion(regions[5].name)}
                />
                <text x="170" y="320" fontSize="16" fill="white" fontWeight="bold" textAnchor="middle">
                  中国
                </text>
                <text x="170" y="345" fontSize="24" fill="white" fontWeight="bold" textAnchor="middle">
                  {getStoresByRegion(regions[5].prefectures).length}店
                </text>
              </g>

              {/* 四国 */}
              <g>
                <rect
                  x="180"
                  y="400"
                  width="160"
                  height="90"
                  fill={getStoresByRegion(regions[6].prefectures).length > 0 ? '#3b82f6' : '#e5e7eb'}
                  stroke="#9ca3af"
                  strokeWidth="2"
                  rx="8"
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => setSelectedRegion(regions[6].name)}
                />
                <text x="260" y="435" fontSize="16" fill="white" fontWeight="bold" textAnchor="middle">
                  四国
                </text>
                <text x="260" y="460" fontSize="24" fill="white" fontWeight="bold" textAnchor="middle">
                  {getStoresByRegion(regions[6].prefectures).length}店
                </text>
              </g>

              {/* 九州・沖縄 */}
              <g>
                <rect
                  x="20"
                  y="400"
                  width="140"
                  height="180"
                  fill={getStoresByRegion(regions[7].prefectures).length > 0 ? '#3b82f6' : '#e5e7eb'}
                  stroke="#9ca3af"
                  strokeWidth="2"
                  rx="8"
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => setSelectedRegion(regions[7].name)}
                />
                <text x="90" y="480" fontSize="14" fill="white" fontWeight="bold" textAnchor="middle">
                  九州・沖縄
                </text>
                <text x="90" y="505" fontSize="24" fill="white" fontWeight="bold" textAnchor="middle">
                  {getStoresByRegion(regions[7].prefectures).length}店
                </text>
              </g>

              {/* 凡例 */}
              <g transform="translate(20, 20)">
                <rect x="0" y="0" width="20" height="20" fill="#3b82f6" rx="4" />
                <text x="30" y="15" fontSize="14" fill="#4b5563">加盟店あり</text>

                <rect x="120" y="0" width="20" height="20" fill="#e5e7eb" rx="4" />
                <text x="150" y="15" fontSize="14" fill="#4b5563">未展開</text>
              </g>
            </svg>

            <p className="text-center text-gray-600 mt-4 text-sm">
              地域をクリックすると詳細が表示されます
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
