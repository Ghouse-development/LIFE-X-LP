'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Section } from './Section'

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
    <Section
      id="testimonials"
      variant="white"
      spacing="2xl"
      title="実装サンプル"
      subtitle="LIFE X 導入による運用改善の効果イメージ"
    >
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
                    <p className="font-serif text-lg font-bold text-[var(--brand)] leading-tight break-words">
                      {testimonial.metric}
                    </p>
                  </div>
                )}

                {/* Reason - 2 lines explaining why */}
                {testimonial.reason && (
                  <p className="text-sm text-[var(--ink)] leading-relaxed mb-4 line-clamp-3 overflow-hidden">
                    {testimonial.reason}
                  </p>
                )}

                {/* Stats Grid */}
                <div className="flex gap-3 mb-4">
                  <div className="flex-1 text-center p-3 bg-[var(--brand)]/5 rounded-lg">
                    <p className="text-xs text-[var(--ink-muted)] mb-1">期間</p>
                    <p className="font-bold text-sm text-[var(--ink-strong)]">
                      {testimonial.stats.period}
                    </p>
                  </div>
                  <div className="flex-1 text-center p-3 bg-[var(--brand)]/5 rounded-lg">
                    <p className="text-xs text-[var(--ink-muted)] mb-1">実績</p>
                    <p className="font-bold text-sm text-[var(--ink-strong)]">
                      {testimonial.stats.contracts}
                    </p>
                  </div>
                </div>

                {/* Attribution */}
                <div className="flex items-center justify-between pt-4 border-t border-black/5">
                  <p className="font-semibold text-sm text-[var(--ink-strong)]">{testimonial.name}</p>
                  <p className="text-xs text-[var(--ink-muted)]">{testimonial.area}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <p className="mt-8 text-center text-sm text-[var(--ink-muted)] max-w-3xl mx-auto leading-relaxed">
        ※掲載内容は、標準的な運用改善効果を示す実装サンプルです。企業名・数値は匿名化しています。実際の効果は貴社の環境・体制により異なります。
      </p>
    </Section>
  )
}
