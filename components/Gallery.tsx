'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import { useState } from 'react';

// 厳選した画像のみ使用（PG HOUSE風にシンプルに）
const galleryImages = [
  { src: '/cases/case-01.jpg', alt: 'LIFE X 外観 1', category: '外観' },
  { src: '/cases/case-03.jpg', alt: 'LIFE X 外観 2', category: '外観' },
  { src: '/cases/case-04.jpg', alt: 'LIFE X 外観 3', category: '外観' },

  { src: '/cases/case-08.jpg', alt: 'LIFE X リビング 1', category: 'リビング' },
  { src: '/cases/case-09.jpg', alt: 'LIFE X リビング 2', category: 'リビング' },
  { src: '/cases/case-36.jpg', alt: 'LIFE X リビング 3', category: 'リビング' },

  { src: '/cases/case-10.jpg', alt: 'LIFE X キッチン 1', category: 'キッチン' },
  { src: '/cases/case-11.jpg', alt: 'LIFE X キッチン 2', category: 'キッチン' },

  { src: '/cases/case-12.jpg', alt: 'LIFE X 寝室 1', category: '寝室' },
  { src: '/cases/case-13.jpg', alt: 'LIFE X 寝室 2', category: '寝室' },

  { src: '/cases/case-05.jpg', alt: 'LIFE X 内装 1', category: '内装' },
  { src: '/cases/case-06.jpg', alt: 'LIFE X 内装 2', category: '内装' },

  { src: '/cases/case-14.jpg', alt: 'LIFE X バスルーム', category: 'バスルーム' },
  { src: '/cases/case-15.jpg', alt: 'LIFE X 玄関', category: '玄関' },
  { src: '/cases/case-16.jpg', alt: 'LIFE X 収納', category: '収納' },
  { src: '/cases/case-17.jpg', alt: 'LIFE X バルコニー', category: 'バルコニー' },
];

const categories = ['すべて', '外観', 'リビング', 'キッチン', '寝室', '内装', 'バスルーム', '玄関', '収納', 'バルコニー'];

export function Gallery() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.05,
  });

  const [selectedCategory, setSelectedCategory] = useState('すべて');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const filteredImages = selectedCategory === 'すべて'
    ? galleryImages
    : galleryImages.filter(img => img.category === selectedCategory);

  return (
    <section ref={ref} className="py-24 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            LIFE X ギャラリー
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            実際の施工事例をご覧ください。高性能×デザイン性を兼ね備えた住空間。
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredImages.map((image, index) => (
            <motion.div
              key={image.src}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="relative aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group"
              onClick={() => setSelectedImage(image.src)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white text-sm font-medium">{image.alt}</p>
                  <p className="text-white/80 text-xs">{image.category}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-6xl max-h-[90vh] w-full h-full">
              <Image
                src={selectedImage}
                alt="拡大表示"
                fill
                className="object-contain"
                sizes="100vw"
              />
              <button
                className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 transition-colors"
                onClick={() => setSelectedImage(null)}
              >
                ×
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
