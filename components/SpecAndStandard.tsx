'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import specData from '@/content/spec.json';

export function SpecAndStandard() {
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
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{specData.title}</h2>
          <p className="text-gray-600 text-lg">{specData.description}</p>
        </motion.div>

        {/* Badges - PG HOUSE Style */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {specData.badges.map((badge, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white border-2 border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors"
            >
              {/* Large Icon */}
              <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <Image
                  src={`/icons/${badge.icon}.svg`}
                  alt={badge.label}
                  width={56}
                  height={56}
                />
              </div>

              {/* Big Number/Label Box */}
              <div className="bg-gray-800 text-white rounded-lg py-4 px-6 mb-4">
                <h3 className="text-2xl font-bold">{badge.label}</h3>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-700 leading-relaxed">{badge.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Spec Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="space-y-8"
        >
          {specData.specs.map((category, catIndex) => (
            <div key={catIndex} className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-gray-100 px-6 py-3 border-b border-gray-200">
                <h3 className="font-bold text-lg">{category.category}</h3>
              </div>
              <div className="divide-y divide-gray-200">
                {category.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="px-6 py-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="font-medium text-gray-700">{item.label}</div>
                    <div className="md:col-span-2">
                      <div className="text-gray-900 mb-1">{item.value}</div>
                      {item.note && <div className="text-sm text-gray-500">{item.note}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Footnote */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8 text-sm text-gray-500 text-center"
        >
          {specData.footnote}
        </motion.p>
      </div>
    </section>
  );
}
