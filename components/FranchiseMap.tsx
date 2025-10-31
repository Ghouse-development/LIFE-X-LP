'use client';

import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { MapPin } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// デフォルトマーカーアイコンの設定
const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = defaultIcon;

interface Store {
  id: string;
  name: string;
  prefecture: string;
  city: string;
  address: string;
  full_address: string;
  latitude: number | null;
  longitude: number | null;
  joined_date: string;
}

export function FranchiseMap() {
  const [stores, setStores] = useState<Store[]>([]);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // 加盟店データを取得
  useEffect(() => {
    const fetchStores = async () => {
      try {
        const { data, error } = await supabase
          .from('stores')
          .select('*')
          .order('joined_date', { ascending: false });

        if (error) throw error;
        setStores(data || []);
      } catch (error) {
        console.error('Error fetching stores:', error);
      }
    };

    fetchStores();
  }, []);

  // 地図の中心座標（日本の中心付近）
  const center: [number, number] = [36.5, 138.0];

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
            全国の加盟店MAP
          </h2>
          <p className="text-gray-600 text-lg">
            現在、全国{stores.length}店舗で展開中。お近くの加盟店を探してみてください。
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-lg shadow-lg overflow-hidden"
        >
          <div className="h-[600px] relative">
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
          </div>
        </motion.div>

        {/* 加盟店一覧 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12"
        >
          <h3 className="text-2xl font-bold mb-6 text-center">加盟店一覧</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stores.map((store) => (
              <div key={store.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h4 className="font-bold text-lg mb-2">{store.name}</h4>
                <div className="space-y-1 text-sm text-gray-600">
                  <p className="flex items-start">
                    <MapPin className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{store.full_address}</span>
                  </p>
                  <p className="text-xs text-gray-500">
                    加盟: {new Date(store.joined_date).toLocaleDateString('ja-JP')}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {stores.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <p>加盟店情報を読み込み中...</p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
