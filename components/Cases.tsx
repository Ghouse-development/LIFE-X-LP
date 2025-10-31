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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {casesData.cases.map((caseItem, index) => (
            <motion.div
              key={caseItem.id}
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="bg-white rounded overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="relative h-56 md:h-64">
                <Image
                  src={caseItem.image}
                  alt={caseItem.area}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              <div className="p-8 text-center">
                {/* Main Number - HUGE */}
                <div className="mb-3">
                  <span className="text-5xl md:text-6xl font-bold text-gray-900">
                    {caseItem.stats.contracts}
                  </span>
                </div>

                {/* Period */}
                <div className="text-lg font-medium text-gray-600 mb-6">
                  {caseItem.stats.period}
                </div>

                {/* Area */}
                <h3 className="text-sm font-bold mb-4 text-gray-700">{caseItem.area}</h3>

                {/* Comment - Short */}
                <p className="text-xs text-gray-500 italic">
                  {caseItem.comment.slice(0, 40)}...
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
