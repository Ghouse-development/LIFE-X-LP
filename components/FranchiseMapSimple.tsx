'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { MapPin } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import 'leaflet/dist/leaflet.css';

// Dynamic import to avoid SSR issues with Leaflet
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
);

interface Store {
  id: string;
  name: string;
  prefecture: string;
  city: string;
  address: string;
  full_address: string;
  joined_date: string;
  latitude?: number;
  longitude?: number;
}

// 都道府県の中心座標マッピング
const prefectureCoordinates: Record<string, { lat: number; lng: number }> = {
  '北海道': { lat: 43.064, lng: 141.347 },
  '青森県': { lat: 40.824, lng: 140.740 },
  '岩手県': { lat: 39.704, lng: 141.153 },
  '宮城県': { lat: 38.269, lng: 140.872 },
  '秋田県': { lat: 39.719, lng: 140.103 },
  '山形県': { lat: 38.240, lng: 140.364 },
  '福島県': { lat: 37.750, lng: 140.468 },
  '茨城県': { lat: 36.342, lng: 140.447 },
  '栃木県': { lat: 36.566, lng: 139.883 },
  '群馬県': { lat: 36.391, lng: 139.061 },
  '埼玉県': { lat: 35.857, lng: 139.649 },
  '千葉県': { lat: 35.605, lng: 140.123 },
  '東京都': { lat: 35.690, lng: 139.692 },
  '神奈川県': { lat: 35.448, lng: 139.643 },
  '新潟県': { lat: 37.902, lng: 139.023 },
  '富山県': { lat: 36.696, lng: 137.213 },
  '石川県': { lat: 36.595, lng: 136.626 },
  '福井県': { lat: 36.065, lng: 136.222 },
  '山梨県': { lat: 35.664, lng: 138.568 },
  '長野県': { lat: 36.651, lng: 138.181 },
  '岐阜県': { lat: 35.391, lng: 136.722 },
  '静岡県': { lat: 34.977, lng: 138.383 },
  '愛知県': { lat: 35.181, lng: 136.907 },
  '三重県': { lat: 34.730, lng: 136.509 },
  '滋賀県': { lat: 35.004, lng: 135.869 },
  '京都府': { lat: 35.021, lng: 135.756 },
  '大阪府': { lat: 34.686, lng: 135.520 },
  '兵庫県': { lat: 34.691, lng: 135.183 },
  '奈良県': { lat: 34.685, lng: 135.833 },
  '和歌山県': { lat: 34.226, lng: 135.167 },
  '鳥取県': { lat: 35.504, lng: 134.238 },
  '島根県': { lat: 35.472, lng: 133.051 },
  '岡山県': { lat: 34.662, lng: 133.935 },
  '広島県': { lat: 34.397, lng: 132.460 },
  '山口県': { lat: 34.186, lng: 131.471 },
  '徳島県': { lat: 34.066, lng: 134.559 },
  '香川県': { lat: 34.340, lng: 134.043 },
  '愛媛県': { lat: 33.842, lng: 132.766 },
  '高知県': { lat: 33.560, lng: 133.531 },
  '福岡県': { lat: 33.606, lng: 130.418 },
  '佐賀県': { lat: 33.249, lng: 130.300 },
  '長崎県': { lat: 32.745, lng: 129.874 },
  '熊本県': { lat: 32.790, lng: 130.742 },
  '大分県': { lat: 33.238, lng: 131.613 },
  '宮崎県': { lat: 31.911, lng: 131.424 },
  '鹿児島県': { lat: 31.560, lng: 130.558 },
  '沖縄県': { lat: 26.212, lng: 127.681 },
};

// 実在する加盟店データのみ
const defaultStores: Store[] = [
  {
    id: '1',
    name: 'コンチネンタルホーム株式会社',
    prefecture: '栃木県',
    city: '佐野市',
    address: '大町2979-1',
    full_address: '栃木県佐野市大町2979-1',
    joined_date: '2024-11-01',
    latitude: 36.566,
    longitude: 139.883,
  },
];

// Leafletアイコンの設定（クライアントサイドでのみ）
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let DefaultIcon: any;
if (typeof window !== 'undefined') {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const L = require('leaflet');
  DefaultIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
}

export function FranchiseMapSimple() {
  const [stores, setStores] = useState<Store[]>(defaultStores);
  const [isClient, setIsClient] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    setIsClient(true);

    const fetchStores = async () => {
      if (!isSupabaseConfigured || !supabase) {
        return;
      }

      try {
        const { data, error } = await supabase
          .from('stores')
          .select('*')
          .order('joined_date', { ascending: false });

        if (error) throw error;

        if (data && data.length > 0) {
          // Supabaseデータに緯度経度がない場合は都道府県から推定
          const storesWithCoords = data.map((store: Store) => {
            if (store.latitude && store.longitude) {
              return store;
            }
            const coords = prefectureCoordinates[store.prefecture];
            if (coords) {
              // 市区町村によって少しランダムにずらす
              const offset = 0.1;
              return {
                ...store,
                latitude: coords.lat + (Math.random() - 0.5) * offset,
                longitude: coords.lng + (Math.random() - 0.5) * offset,
              };
            }
            return store;
          });
          setStores(storesWithCoords);
        }
      } catch (error) {
        console.error('Error fetching stores:', error);
      }
    };

    fetchStores();
  }, []);

  // 日本の中心座標
  const center: [number, number] = [36.5, 138.0];

  return (
    <section ref={ref} className="py-40 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900">全国展開中</h2>
          <p className="text-xl md:text-2xl text-gray-600">
            {stores.length}店舗の加盟店が全国で活躍中
          </p>
        </motion.div>

        {/* 地図表示 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-3xl shadow-lg overflow-hidden mb-16"
        >
          <div className="h-[600px] relative">
            {isClient && (
              <MapContainer
                center={center}
                zoom={5}
                style={{ height: '100%', width: '100%' }}
                scrollWheelZoom={false}
              >
                {/* CartoDB Positron - シンプルな白地図 */}
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                  url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                  subdomains="abcd"
                  maxZoom={20}
                />

                {stores.map((store) => {
                  if (!store.latitude || !store.longitude) return null;

                  return (
                    <Marker
                      key={store.id}
                      position={[store.latitude, store.longitude]}
                      icon={DefaultIcon}
                    >
                      <Popup>
                        <div className="p-2">
                          <h3 className="font-semibold text-lg mb-2">{store.name}</h3>
                          <div className="space-y-1 text-sm">
                            <p className="flex items-start">
                              <MapPin className="w-4 h-4 mr-1 mt-0.5 flex-shrink-0" />
                              <span>{store.full_address}</span>
                            </p>
                            <p className="text-gray-600">
                              加盟年月日: {new Date(store.joined_date).toLocaleDateString('ja-JP')}
                            </p>
                          </div>
                        </div>
                      </Popup>
                    </Marker>
                  );
                })}
              </MapContainer>
            )}
          </div>
        </motion.div>

        {/* 加盟店一覧（シンプル版） */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {stores.slice(0, 9).map((store, index) => (
            <motion.div
              key={store.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.05 }}
              className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-pg-blue flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg mb-2 text-gray-900">{store.name}</h3>
                  <p className="text-sm text-gray-600 mb-1">
                    {store.prefecture} {store.city}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(store.joined_date).toLocaleDateString('ja-JP')} 加盟
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
