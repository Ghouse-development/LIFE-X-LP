'use client'

import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export function Hero() {
  return (
    <section className="relative min-h-[72vh] md:min-h-[78vh] flex items-center">
      {/* Background Image */}
      <Image
        src="/cases/case-08.jpg"
        alt="LIFE X 規格住宅の外観"
        fill
        priority
        className="object-cover"
      />

      {/* Black overlay for text contrast */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 pt-28 md:pt-36 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="font-serif text-white text-4xl md:text-6xl tracking-[0.03em] leading-[1.2] drop-shadow">
            規格住宅の&ldquo;美しさと再現性&rdquo;を、あなたの商圏の武器に。
          </h1>

          <p className="mt-5 max-w-[680px] text-white/90 leading-relaxed text-base md:text-lg">
            設計負担を削減し、粗利を安定化。LIFE X フランチャイズ
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              asChild
              variant="primary"
              size="lg"
              data-cta="hero_request"
            >
              <Link href="#contact">無料資料請求</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-[var(--ink-strong)]"
              data-cta="hero_webinar"
            >
              <Link href="#webinar">30分で分かる説明会</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
