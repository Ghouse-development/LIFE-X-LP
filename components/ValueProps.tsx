'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

const values = [
  {
    icon: '/icons/chart-yen.svg',
    title: '収益性',
    mainValue: '500~800万円',
    subValue: '粗利/棟',
    note: '売上2000-2500万円で安定収益',
  },
  {
    icon: '/icons/house-shield.svg',
    title: '商品力',
    mainValue: '耐震等級 3',
    subValue: 'UA値 0.46',
    note: 'ZEH基準大幅クリア・全棟長期優良住宅',
  },
  {
    icon: '/icons/handshake.svg',
    title: '開業支援',
    mainValue: '3~6ヶ月',
    subValue: '開業期間',
    note: '設計・現場・集客すべての型を提供',
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
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            3つの強み
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
            高収益×高品質×短期立上げ
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

        {/* 実績数字（控えめに） */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 pt-12 border-t border-gray-200"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">12</div>
              <div className="text-sm text-gray-500">加盟店数</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">3,800</div>
              <div className="text-sm text-gray-500">平均年商（万円）</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">4.2</div>
              <div className="text-sm text-gray-500">オーナー満足度</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">3〜6</div>
              <div className="text-sm text-gray-500">開業期間（ヶ月）</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
