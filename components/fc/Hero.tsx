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

      {/* Dark overlay for text contrast */}
      <div className="absolute inset-0 bg-[#0b1220]/60" />

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
              size="lg"
              data-cta="hero_request"
              className="h-12 px-6 rounded-xl bg-[#0f172a] text-white hover:bg-slate-900 font-medium shadow-lg focus:ring-2 focus:ring-[#0f172a] focus:ring-offset-2"
            >
              <Link href="#contact">サンプル一式を請求</Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="h-12 px-6 rounded-xl bg-white/95 text-[#0f172a] border-2 border-white/80 hover:bg-white font-medium shadow-lg"
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
