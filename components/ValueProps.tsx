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
          <h2 className="text-pg-xl md:text-5xl font-bold mb-6">
            3つの強み
          </h2>
          <p className="text-pg-base md:text-2xl text-gray-600 max-w-3xl mx-auto">
            高収益×高品質×短期立上げ
          </p>

          {/* 認証バッジ */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <div className="inline-flex items-center px-4 py-2 bg-blue-50 border border-blue-200 rounded-full">
              <span className="text-sm font-medium text-blue-800">ZEH基準適合</span>
            </div>
            <div className="inline-flex items-center px-4 py-2 bg-green-50 border border-green-200 rounded-full">
              <span className="text-sm font-medium text-green-800">全棟長期優良住宅</span>
            </div>
            <div className="inline-flex items-center px-4 py-2 bg-amber-50 border border-amber-200 rounded-full">
              <span className="text-sm font-medium text-amber-800">耐震等級3取得</span>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-pg">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg p-pg-4 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-gray-200 hover:border-pg-blue"
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

        {/* 実績数字（強調） */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20"
        >
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-12 border border-blue-100">
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-12 text-gray-900">
              選ばれる理由を数字で証明
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-bold text-pg-blue mb-2">12</div>
                <div className="text-sm md:text-base font-medium text-gray-700">加盟店数</div>
                <div className="text-xs text-gray-500 mt-1">全国展開中</div>
              </div>
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-bold text-pg-blue mb-2">3,800</div>
                <div className="text-sm md:text-base font-medium text-gray-700">平均年商（万円）</div>
                <div className="text-xs text-gray-500 mt-1">初年度実績</div>
              </div>
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-bold text-pg-blue mb-2">4.2</div>
                <div className="text-sm md:text-base font-medium text-gray-700">オーナー満足度</div>
                <div className="text-xs text-gray-500 mt-1">5点満点中</div>
              </div>
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-bold text-pg-blue mb-2">3〜6</div>
                <div className="text-sm md:text-base font-medium text-gray-700">開業期間（ヶ月）</div>
                <div className="text-xs text-gray-500 mt-1">最短3ヶ月</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
