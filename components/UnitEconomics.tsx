'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import { trackCTAClick } from '@/lib/events';
import financeData from '@/content/finance.json';

export function UnitEconomics() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="py-40 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">{financeData.title}</h2>
          <p className="text-xl md:text-2xl text-gray-600">{financeData.description}</p>
        </motion.div>

        {/* シンプルな数字表示 - カードなし */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 max-w-6xl mx-auto">
          {financeData.models.map((model, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + 0.1 * index }}
              className="text-center"
            >
              {/* Title - 上部に配置 */}
              <div className="text-sm md:text-base font-medium text-gray-500 uppercase tracking-wider mb-4">
                {model.title}
              </div>

              {/* Main Value - 巨大 */}
              <div className="mb-3">
                <div className="text-5xl md:text-7xl font-bold text-revenue-orange leading-none">
                  {model.mainValue}
                </div>
              </div>

              {/* Sub Value */}
              <div className="text-xl md:text-2xl font-medium text-gray-600 mb-4">
                {model.subValue}
              </div>

              {/* Context - ストーリー性追加 */}
              {model.context && (
                <p className="text-sm text-gray-500 leading-relaxed max-w-xs mx-auto">
                  {model.context}
                </p>
              )}
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <Link
            href="#form"
            onClick={() => trackCTAClick('詳しい収益シミュレーションを見る', '#form')}
            className="inline-block px-6 py-3 md:px-10 md:py-4 bg-revenue-orange text-white font-bold text-base md:text-lg rounded-lg hover:bg-orange-600 transition-all duration-300 hover:scale-105 shadow-xl"
          >
            詳しい収益シミュレーションを見る
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
