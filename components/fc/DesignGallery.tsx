'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X } from 'lucide-react'
import { Section } from './Section'

export function DesignGallery() {
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null)

  // 外観パース画像リスト（gaikan-01.jpg 〜 gaikan-58.jpg）
  const designs = Array.from({ length: 58 }, (_, i) => ({
    id: `design-${i + 1}`,
    src: `/fc/gaikan/gaikan-${String(i + 1).padStart(2, '0')}.jpg`,
    alt: `LIFE X 規格住宅 外観デザイン ${i + 1}`,
  }))

  return (
    <Section
      id="design-gallery"
      variant="dark"
      spacing="2xl"
      title="外観デザイン集"
      subtitle="58パターンの外観バリエーション"
    >
      {/* Grid of exterior perspectives */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-7xl mx-auto">
        {designs.map((design, index) => (
          <motion.div
            key={design.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.02 }}
            className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group ring-1 ring-white/20"
            onClick={() => setSelectedImage({ src: design.src, alt: design.alt })}
          >
            <Image
              src={design.src}
              alt={design.alt}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-4 right-4 text-white p-2 hover:bg-white/10 rounded-full transition-colors"
              onClick={() => setSelectedImage(null)}
              aria-label="閉じる"
            >
              <X size={32} />
            </button>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative w-full h-full max-w-5xl max-h-[80vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                fill
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  )
}
