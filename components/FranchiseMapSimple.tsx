'use client';

import { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';
import { supabase } from '@/lib/supabase';
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
    joined_date: '2025-10-31',
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
    <section ref={ref} className="py-24 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            全国の加盟店
          </h2>
          <p className="text-gray-600 text-lg">
            現在、全国{stores.length}店舗で展開中。お近くの加盟店を探してみてください。
          </p>
        </motion.div>

        {/* 地域選択ボタン（PG HOUSEスタイル） */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          <button
            onClick={() => setSelectedRegion(null)}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
              selectedRegion === null
                ? 'bg-blue-600 text-white shadow-lg'
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
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  selectedRegion === region.name
                    ? 'bg-blue-600 text-white shadow-lg'
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {selectedStores.length > 0 ? (
            selectedStores.map((store) => (
              <div
                key={store.id}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
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
