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
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 lg:px-8 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Problems */}
          {data.problems && data.problems.length > 0 && (
            <p className="text-sm md:text-base text-white/80 mb-6">
              {data.problems[0]}
            </p>
          )}

          {/* Title */}
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            {data.title}
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl lg:text-3xl font-light mb-4">
            {data.subtitle}
          </p>

          {/* Lead */}
          <p className="text-base md:text-lg max-w-3xl mx-auto mb-10 text-white/90 leading-relaxed">
            {data.lead}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              asChild
              size="lg"
              className="bg-[#D9B66A] hover:bg-[#E5C889] text-[#0E1113] text-base px-8 py-6 h-auto"
              data-gtm="cta_primary_request"
            >
              <Link href="#contact">資料請求・相談</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-[#0E1113] text-base px-8 py-6 h-auto"
              data-gtm="cta_secondary_consult"
            >
              <Link href="#webinar">次回ウェビナー</Link>
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
