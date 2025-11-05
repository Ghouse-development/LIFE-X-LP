'use client'

import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

interface HeroProps {
  data: {
    title: string
    subtitle: string
    lead: string
    problems: string[]
  }
}

export function Hero({ data }: HeroProps) {
  return (
    <section id="hero" className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero/hero-01.jpg"
          alt="LIFE X フランチャイズ"
          fill
          className="object-cover image-enhanced"
          priority
          quality={90}
        />
        {/* Subtle overlay for sophistication */}
        <div className="absolute inset-0 bg-[#0B0D0F]/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 lg:px-8 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Title - Large serif with wide tracking for sophistication */}
          <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl tracking-wide leading-tight md:leading-[1.2] text-white mb-6">
            規格住宅の&ldquo;美しさと再現性&rdquo;を、<br className="hidden md:inline" />あなたの商圏の武器に。
          </h1>

          {/* Lead - Constrained width for breathing room */}
          <p className="mt-5 max-w-[680px] mx-auto text-white/80 text-base md:text-lg leading-relaxed mb-12">
            設計思想・標準仕様・営業〜施工フローまで、立上げの要素をワンパッケージで。
          </p>

          {/* Primary CTA + Secondary actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              asChild
              size="lg"
              className="bg-[#D9B66A] hover:bg-[#E5C889] text-[#0E1113] font-semibold text-base px-10 py-6 h-auto rounded-lg shadow-lg"
              data-gtm="cta_primary_request"
            >
              <Link href="#contact">資料請求・個別相談</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="ghost"
              className="text-white/90 hover:text-white hover:bg-white/10 text-base px-8 py-6 h-auto"
              data-gtm="cta_secondary_webinar"
            >
              <Link href="#webinar">ウェビナーを見る</Link>
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2" />
        </div>
      </motion.div>
    </section>
  )
}
