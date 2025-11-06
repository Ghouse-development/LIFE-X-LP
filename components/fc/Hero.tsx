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
      <div className="absolute inset-0 bg-black/20" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 pt-28 md:pt-36 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-sm px-3 h-8 border border-white/20 text-white text-sm font-medium">
            LIFE X
          </span>

          <h1 className="mt-6 font-serif text-white text-3xl md:text-5xl tracking-[0.03em] leading-tight drop-shadow-lg">
            規格住宅の&ldquo;美しさと再現性&rdquo;を、<br className="hidden md:block" />あなたの商圏の武器に。
          </h1>

          <p className="mt-4 max-w-2xl text-white/90 leading-relaxed text-base md:text-lg">
            工務店向けフランチャイズ・パッケージ｜設計・打合せ負担を抑え、短期立上げで&ldquo;美しさと再現性&rdquo;を実現。
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              asChild
              variant="primary"
              size="lg"
              data-cta="hero_request"
              className="h-12 px-6 rounded-xl bg-white text-[var(--primary)] hover:bg-white/90"
            >
              <Link href="#contact">資料請求</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-12 px-6 rounded-xl border-2 border-white/80 text-white hover:bg-white/20"
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
