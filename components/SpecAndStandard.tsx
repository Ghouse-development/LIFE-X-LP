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
    <section ref={ref} className="py-24 px-4 bg-white">
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

        {/* Badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {specData.badges.map((badge, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-blue-50 p-6 rounded-lg border border-blue-100 text-center"
            >
              <div className="w-12 h-12 mx-auto mb-4">
                <Image
                  src={`/icons/${badge.icon}.svg`}
                  alt={badge.label}
                  width={48}
                  height={48}
                />
              </div>
              <h3 className="text-xl font-bold mb-2 text-blue-900">{badge.label}</h3>
              <p className="text-sm text-gray-600">{badge.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Visual Examples Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[
            { src: '/cases/case-61.jpg', alt: '耐震構造' },
            { src: '/cases/case-62.jpg', alt: '断熱性能' },
            { src: '/cases/case-63.jpg', alt: '省エネ設備' },
            { src: '/cases/case-64.jpg', alt: '換気システム' },
            { src: '/cases/case-65.jpg', alt: '高性能窓' },
            { src: '/cases/case-66.jpg', alt: '太陽光パネル' },
            { src: '/cases/case-67.jpg', alt: '給湯設備' },
            { src: '/cases/case-68.jpg', alt: '床暖房' },
          ].map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.4 + index * 0.05 }}
              className="relative aspect-square rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-2 left-2 right-2 text-white text-sm font-medium">
                  {image.alt}
                </div>
              </div>
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
