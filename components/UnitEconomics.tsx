'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import financeData from '@/content/finance.json';

export function UnitEconomics() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="py-24 px-4 bg-gradient-to-b from-gray-50 to-white border-t border-gray-200">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-4"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{financeData.title}</h2>
          <p className="text-gray-600 text-lg">{financeData.description}</p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 mb-12 max-w-3xl mx-auto"
        >
          {financeData.disclaimer}
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {financeData.models.map((model, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + 0.1 * index }}
              className="bg-white p-6 rounded shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              {/* Icon */}
              <div className="w-16 h-16 mb-4 mx-auto">
                <Image src={`/icons/${model.icon}.svg`} alt={model.title} width={64} height={64} />
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold mb-4 text-center text-gray-700">{model.title}</h3>

              {/* Main Value - HUGE */}
              <div className="mb-2 text-center">
                <div className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                  {model.mainValue}
                </div>
              </div>

              {/* Sub Value */}
              <div className="text-lg font-medium text-gray-600 mb-4 text-center">
                {model.subValue}
              </div>

              {/* Note */}
              <div className="text-xs text-gray-500 text-center">
                {model.note}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
