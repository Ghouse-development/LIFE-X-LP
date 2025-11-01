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
    <section ref={ref} className="py-40 px-4 bg-gradient-to-b from-gray-50 to-white border-t border-gray-200">
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
          className="bg-white rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="grid grid-cols-3 gap-0 bg-gray-900 text-white p-6">
            <div className="text-center text-sm md:text-base font-medium">項目</div>
            <div className="text-center text-sm md:text-base font-medium">従来の住宅FC</div>
            <div className="text-center text-sm md:text-base font-medium bg-blue-600 rounded-lg p-2">
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
                className="grid grid-cols-3 gap-0 p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="text-center md:text-left font-semibold text-gray-900 text-sm md:text-base">
                  {item.category}
                </div>
                <div className="text-center text-gray-600 flex items-center justify-center text-sm md:text-base">
                  <X className="w-4 h-4 mr-1 text-red-500 flex-shrink-0" />
                  <span>{item.traditional}</span>
                </div>
                <div className="text-center text-gray-900 font-semibold flex items-center justify-center text-sm md:text-base">
                  <Check className="w-4 h-4 mr-1 text-green-500 flex-shrink-0" />
                  <span>{item.lifex}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Footer CTA */}
          <div className="bg-blue-50 p-8 text-center">
            <p className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
              初期投資を70%削減、開業期間を75%短縮
            </p>
            <p className="text-sm md:text-base text-gray-600 mb-6">
              まずは30分の無料相談で詳細をご確認ください
            </p>
            <Link
              href="#form"
              onClick={() => trackCTAClick('無料相談に申し込む', '#form')}
              className="inline-block px-10 py-4 bg-gray-900 text-white font-bold text-base rounded-lg hover:bg-gray-800 transition-colors"
            >
              無料相談に申し込む
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
