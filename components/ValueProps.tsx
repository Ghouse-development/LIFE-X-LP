'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

const values = [
  {
    icon: '/icons/house-shield.svg',
    title: '商品力',
    mainValue: '耐震等級 3',
    subValue: 'UA値 0.46以下',
    note: 'ZEH基準を大幅にクリア',
  },
  {
    icon: '/icons/chart-yen.svg',
    title: '粗利の見通し',
    mainValue: '500~800万円',
    subValue: '/棟',
    note: '売上2000-2500万円',
  },
  {
    icon: '/icons/blueprint.svg',
    title: '設計・積算の型',
    mainValue: '約2週間',
    subValue: '設計期間',
    note: '自由設計×構造標準化',
  },
  {
    icon: '/icons/hammer-gear.svg',
    title: '現場標準化',
    mainValue: '約4ヶ月',
    subValue: '工期',
    note: '施工マニュアル完備',
  },
  {
    icon: '/icons/megaphone-ab.svg',
    title: '広告運用の型',
    mainValue: '初期3ヶ月',
    subValue: '運用代行可能',
    note: 'マニュアル+月次レビュー',
  },
  {
    icon: '/icons/handshake.svg',
    title: '伴走サポート',
    mainValue: '全領域',
    subValue: 'サポート',
    note: '開業前研修+定例MTG',
  },
];

export function ValueProps() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="py-40 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-pg-5"
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-pg">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded p-pg-4 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
            >
              {/* Icon */}
              <div className="w-20 h-20 mb-6 mx-auto">
                <Image
                  src={value.icon}
                  alt={value.title}
                  width={80}
                  height={80}
                  className="w-full h-full"
                />
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold mb-6 text-center text-gray-700">{value.title}</h3>

              {/* Main Value - 超巨大化 */}
              <div className="mb-4 text-center">
                <div className="text-5xl md:text-7xl font-bold text-gray-900 leading-none">
                  {value.mainValue}
                </div>
              </div>

              {/* Sub Value */}
              <div className="text-xl md:text-2xl font-medium text-gray-600 mb-8 text-center">
                {value.subValue}
              </div>

              {/* Note */}
              <div className="text-xs text-gray-500 text-center">
                {value.note}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
