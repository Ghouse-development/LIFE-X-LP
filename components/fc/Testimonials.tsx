'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import { Section } from './Section'
import { Quote } from 'lucide-react'

interface Testimonial {
  id: string
  name: string
  area: string
  quote: string
  image: string
  stats: {
    period: string
    contracts: string
  }
  metric?: string
  reason?: string
}

interface TestimonialsProps {
  data: Testimonial[]
}

export function Testimonials({ data }: TestimonialsProps) {
  return (
    <Section id="testimonials" variant="white" spacing="2xl">
      <div className="text-center mb-16">
        <motion.h2
          className="font-serif text-3xl md:text-5xl font-bold mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          導入事例
        </motion.h2>
        <motion.p
          className="text-lg md:text-xl text-[#6B7280] max-w-[680px] mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          実際の加盟店の声をご紹介します
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.map((testimonial, index) => (
          <motion.div
            key={testimonial.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
              {/* Image */}
              <div className="relative aspect-[16/10]">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  fill
                  className="object-cover"
                />
              </div>

              <CardContent className="p-6">
                {/* Headline Metric - Bold fact line */}
                {testimonial.metric && (
                  <div className="mb-4 pb-4 border-b border-black/5">
                    <p className="font-serif text-lg font-bold text-[#D9B66A] leading-tight">
                      {testimonial.metric}
                    </p>
                  </div>
                )}

                {/* Reason - 2 lines explaining why */}
                {testimonial.reason && (
                  <p className="text-sm text-neutral-600 leading-relaxed mb-4">
                    {testimonial.reason}
                  </p>
                )}

                {/* Stats Grid */}
                <div className="flex gap-3 mb-4">
                  <div className="flex-1 text-center p-3 bg-[#D9B66A]/5 rounded-lg">
                    <p className="text-xs text-neutral-500 mb-1">期間</p>
                    <p className="font-bold text-sm text-[#0E1113]">
                      {testimonial.stats.period}
                    </p>
                  </div>
                  <div className="flex-1 text-center p-3 bg-[#D9B66A]/5 rounded-lg">
                    <p className="text-xs text-neutral-500 mb-1">実績</p>
                    <p className="font-bold text-sm text-[#0E1113]">
                      {testimonial.stats.contracts}
                    </p>
                  </div>
                </div>

                {/* Attribution */}
                <div className="flex items-center justify-between pt-4 border-t border-black/5">
                  <p className="font-semibold text-sm text-[#0E1113]">{testimonial.name}</p>
                  <p className="text-xs text-neutral-500">{testimonial.area}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
