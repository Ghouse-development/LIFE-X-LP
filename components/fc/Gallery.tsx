'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X } from 'lucide-react'
import { Section } from './Section'

interface GalleryItem {
  id: string
  image: string
  alt: string
  category: string
}

interface GalleryProps {
  data: GalleryItem[]
}

export function Gallery({ data }: GalleryProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null)

  return (
    <Section id="gallery" variant="dark" spacing="2xl">
      <div className="text-center mb-16">
        <motion.h2
          className="font-serif text-3xl md:text-5xl font-bold mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          ギャラリー
        </motion.h2>
        <motion.p
          className="text-lg md:text-xl text-[#EDEFF1]/80 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          空間とディテールが織りなす美しさ
        </motion.p>
      </div>

      {/* Editorial asymmetric grid: 1 large + 3 medium + 4 small */}
      <div className="grid grid-cols-12 gap-6 max-w-7xl mx-auto">
        {data.map((item, index) => {
          // Layout logic: First = hero, next 3 = medium, rest = small
          let colSpan = 'col-span-12 md:col-span-3' // small default
          let aspectRatio = 'aspect-square'

          if (index === 0) {
            // Hero image - large and wide
            colSpan = 'col-span-12 md:col-span-8'
            aspectRatio = 'aspect-[16/10]'
          } else if (index >= 1 && index <= 3) {
            // Medium images
            colSpan = 'col-span-6 md:col-span-4'
            aspectRatio = 'aspect-[4/3]'
          }

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className={`${colSpan} relative ${aspectRatio} overflow-hidden rounded-2xl cursor-pointer group ring-1 ring-white/10`}
              onClick={() => setSelectedImage(item)}
            >
              <Image
                src={item.image}
                alt={item.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                <span className="text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium tracking-wide">
                  {item.category}
                </span>
              </div>
            </motion.div>
          )
        })}
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
                src={selectedImage.image}
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
