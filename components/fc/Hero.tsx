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
        src="/hero/hero-01.jpg"
        alt="上質なLDK空間のイメージ"
        fill
        priority
        className="object-cover"
      />

      {/* Black overlay 55% for better text contrast */}
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
            設計思想・標準仕様・営業〜施工・教育/販促までをワンパッケージで。最短3〜6ヶ月で立ち上げ。
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-6">
            <Button
              asChild
              variant="primary"
              size="lg"
              data-gtm="cta_primary_request"
            >
              <Link href="#contact">資料請求</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-[var(--ink-strong)]"
              data-gtm="cta_secondary_consult"
            >
              <Link href="#contact">個別相談</Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              size="lg"
              className="text-white/90 hover:text-white hover:no-underline hover:bg-white/10"
              data-gtm="cta_tertiary_webinar"
            >
              <Link href="#webinar">ウェビナー</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
