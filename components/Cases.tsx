'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import casesData from '@/content/cases.json';

export function Cases() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="py-24 px-4 bg-white border-t border-gray-200">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-4"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{casesData.title}</h2>
          <p className="text-gray-600 text-lg">{casesData.description}</p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-sm text-gray-500 text-center mb-12"
        >
          {casesData.note}
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {casesData.cases.map((caseItem, index) => (
            <motion.div
              key={caseItem.id}
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative h-64">
                <Image
                  src={caseItem.image}
                  alt={caseItem.area}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-4">{caseItem.area}</h3>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">開業期間</span>
                    <span className="font-medium">{caseItem.stats.period}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">契約棟数</span>
                    <span className="font-medium text-gray-700">{caseItem.stats.contracts}</span>
                  </div>
                </div>

                <p className="text-sm text-gray-600 italic leading-relaxed border-l-4 border-gray-500 pl-4">
                  「{caseItem.comment}」
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
