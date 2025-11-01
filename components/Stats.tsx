'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const stats = [
  {
    value: '12',
    label: '加盟店数',
    suffix: '店舗',
    description: '全国で展開中',
  },
  {
    value: '3,800',
    label: '平均年商',
    suffix: '万円',
    description: '加盟店平均（初年度）',
  },
  {
    value: '4.2',
    label: 'オーナー満足度',
    suffix: '/5.0',
    description: '加盟店アンケート結果',
  },
  {
    value: '3〜6',
    label: '開業期間',
    suffix: 'ヶ月',
    description: '契約から初受注まで',
  },
];

export function Stats() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="py-20 px-4 bg-gray-900 text-white border-y border-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="mb-3">
                <span className="text-4xl md:text-6xl font-bold text-white">
                  {stat.value}
                </span>
                <span className="text-2xl md:text-3xl font-medium text-gray-400 ml-1">
                  {stat.suffix}
                </span>
              </div>
              <div className="text-base md:text-lg font-semibold text-gray-300 mb-2">
                {stat.label}
              </div>
              <div className="text-xs md:text-sm text-gray-500">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
