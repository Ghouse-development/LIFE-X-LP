'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Section } from './Section'

export function DesignGallery() {
  const scrollRef = useRef<HTMLDivElement>(null)

  // 厳選10プラン（gaikan-01.jpg 〜 gaikan-10.jpg）
  const designs = Array.from({ length: 10 }, (_, i) => ({
    id: `design-${i + 1}`,
    src: `/fc/gaikan/gaikan-${String(i + 1).padStart(2, '0')}.jpg`,
    alt: `LIFE X 規格住宅 外観プラン ${i + 1}`,
  }))

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  return (
    <Section
      id="design-gallery"
      variant="dark"
      spacing="2xl"
      title="外観デザイン"
      subtitle="厳選10プランから選べる外観バリエーション"
    >
      <div className="relative max-w-7xl mx-auto">
        {/* Scroll Buttons */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-colors"
          aria-label="前へ"
        >
          <ChevronLeft className="w-6 h-6 text-[var(--primary)]" />
        </button>
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-colors"
          aria-label="次へ"
        >
          <ChevronRight className="w-6 h-6 text-[var(--primary)]" />
        </button>

        {/* Horizontal Scroll Container */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory px-12 py-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {designs.map((design, index) => (
            <motion.div
              key={design.id}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="flex-shrink-0 w-[380px] snap-center"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl ring-2 ring-white/20 shadow-xl">
                <Image
                  src={design.src}
                  alt={design.alt}
                  fill
                  className="object-cover"
                  loading="lazy"
                />
              </div>
              <p className="text-center text-sm text-white/80 mt-3">プラン {index + 1}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </Section>
  )
}
