'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

const values = [
  {
    icon: '/icons/house-shield.svg',
    title: '商品力',
    description: '耐震等級3相当×UA値0.46以下の高性能住宅。ZEH基準を大幅にクリアする仕様を標準化。',
    specs: ['耐震等級3相当', 'UA値0.46以下'],
  },
  {
    icon: '/icons/chart-yen.svg',
    title: '粗利の見通し',
    description: '1棟500万円〜800万円の粗利レンジ。詳細な収益シミュレーションを面談時に提供。',
    specs: ['粗利 500-800万円/棟', '売上 2000-2500万円'],
  },
  {
    icon: '/icons/blueprint.svg',
    title: '設計・積算の型',
    description: '間取りは自由設計、構造・断熱は標準化。本部が設計支援を提供し、工期を短縮。',
    specs: ['自由設計対応', '設計期間 約2週間'],
  },
  {
    icon: '/icons/hammer-gear.svg',
    title: '現場標準化',
    description: '施工マニュアルと協力業者ネットワーク。着工から約4ヶ月で完成する工程管理。',
    specs: ['施工マニュアル完備', '工期 約4ヶ月'],
  },
  {
    icon: '/icons/megaphone-ab.svg',
    title: '広告運用の型',
    description: 'Web広告（Google・Meta等）の運用マニュアルと月次レビュー。初期3ヶ月は代行可能。',
    specs: ['運用マニュアル提供', '初期3ヶ月代行可'],
  },
  {
    icon: '/icons/handshake.svg',
    title: '伴走サポート',
    description: '開業前の研修から開業後の定例MTGまで。商品・集客・運営の全領域で支援。',
    specs: ['開業前研修', '定例MTG'],
  },
];

export function ValueProps() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="py-24 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            LIFE X が提供する価値
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            商品・設計・現場・集客・運営の「型」を提供し、
            <br className="hidden md:block" />
            少人数でも高品質な住宅事業を立ち上げられます。
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              {/* Large Icon */}
              <div className="w-16 h-16 mb-6 mx-auto">
                <Image
                  src={value.icon}
                  alt={value.title}
                  width={64}
                  height={64}
                  className="w-full h-full"
                />
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold mb-3 text-center">{value.title}</h3>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed mb-6 text-sm text-center">{value.description}</p>

              {/* Specs - Visual List */}
              <div className="bg-gray-100 rounded-lg p-4 space-y-2">
                {value.specs.map((spec, specIndex) => (
                  <div key={specIndex} className="flex items-center text-sm">
                    <div className="w-1.5 h-1.5 bg-gray-600 rounded-full mr-2 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{spec}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
