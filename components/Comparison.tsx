'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import { Check, X } from 'lucide-react';
import { trackCTAClick } from '@/lib/events';

const comparisonData = [
  {
    category: '初期投資',
    traditional: '1,000万円〜',
    lifex: '300万円〜',
    isAdvantage: true,
  },
  {
    category: '必要人員',
    traditional: '10名以上',
    lifex: '最小2名',
    isAdvantage: true,
  },
  {
    category: '開業期間',
    traditional: '12〜18ヶ月',
    lifex: '3〜6ヶ月',
    isAdvantage: true,
  },
  {
    category: 'サポート',
    traditional: '年1〜2回',
    lifex: '毎月ウェビナー',
    isAdvantage: true,
  },
];

export function Comparison() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="py-40 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">従来FCとの違い</h2>
          <p className="text-xl md:text-2xl text-gray-600">
            圧倒的に低リスク・短期間で始められる
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl border-2 border-gray-200 shadow-lg overflow-hidden"
        >
          {/* Header */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 bg-gray-900 text-white p-4 md:p-6">
            <div className="text-center text-sm md:text-base font-medium py-2 md:py-0">項目</div>
            <div className="text-center text-sm md:text-base font-medium py-2 md:py-0">従来の住宅FC</div>
            <div className="text-center text-sm md:text-base font-medium bg-success-green rounded-lg p-2">
              LIFE X
            </div>
          </div>

          {/* Rows */}
          <div className="divide-y divide-gray-200">
            {comparisonData.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-0 p-4 md:p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="text-center md:text-left font-semibold text-gray-900 text-sm md:text-base py-2 md:py-0">
                  {item.category}
                </div>
                <div className="text-center text-gray-600 flex items-center justify-center text-sm md:text-base py-2 md:py-0">
                  <X className="w-4 h-4 mr-1 text-red-500 flex-shrink-0" />
                  <span>{item.traditional}</span>
                </div>
                <div className="text-center text-gray-900 font-semibold flex items-center justify-center text-sm md:text-base py-2 md:py-0">
                  <Check className="w-4 h-4 mr-1 text-success-green flex-shrink-0" />
                  <span>{item.lifex}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Footer CTA */}
          <div className="bg-green-50 p-6 md:p-8 text-center">
            <p className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
              初期投資を70%削減、開業期間を75%短縮
            </p>
            <p className="text-sm md:text-base text-gray-600 mb-6">
              まずは30分の無料相談で詳細をご確認ください
            </p>
            <Link
              href="#form"
              onClick={() => trackCTAClick('無料相談に申し込む', '#form')}
              className="inline-block px-6 py-3 md:px-10 md:py-4 bg-revenue-orange text-white font-bold text-base md:text-lg rounded-lg hover:bg-orange-600 transition-all duration-300 hover:scale-105 shadow-xl"
            >
              無料相談に申し込む
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
