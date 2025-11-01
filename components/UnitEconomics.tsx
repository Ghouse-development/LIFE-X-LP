'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import financeData from '@/content/finance.json';

export function UnitEconomics() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="py-40 px-4 bg-gradient-to-b from-gray-50 to-white border-t border-gray-200">
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 max-w-6xl mx-auto">
          {financeData.models.map((model, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + 0.1 * index }}
              className="text-center"
            >
              {/* Main Value - 超巨大 */}
              <div className="mb-4">
                <div className="text-7xl md:text-9xl font-bold text-gray-900 leading-none">
                  {model.mainValue}
                </div>
              </div>

              {/* Sub Value */}
              <div className="text-2xl md:text-3xl font-medium text-gray-600 mb-4">
                {model.subValue}
              </div>

              {/* Title */}
              <div className="text-base text-gray-500">
                {model.title}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
