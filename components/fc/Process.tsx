'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Section } from './Section'
import { ArrowRight } from 'lucide-react'

interface ProcessStep {
  week: string
  title: string
  desc: string
  deliverable: string
  step?: string  // 後方互換性
  duration?: string
  deliverables?: string
  owner?: string
}

interface ProcessProps {
  data: ProcessStep[]
}

export function Process({ data }: ProcessProps) {
  return (
    <Section
      id="process"
      variant="light"
      spacing="2xl"
      title="最短8週間ロードマップ"
      subtitle="契約から稼働開始まで、週単位の具体的なステップ"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-fr">
          {data.map((step, index) => (
            <motion.div
              key={step.week}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="relative flex flex-col"
            >
              <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-[0_2px_20px_rgba(0,0,0,0.05)] flex flex-col h-full">
                {/* Week Badge */}
                <div className="inline-flex items-center justify-center px-3 py-1 bg-[var(--brand)]/10 rounded-full mb-3 self-start">
                  <span className="font-semibold text-sm text-[var(--brand)]">{step.week}</span>
                </div>

                {/* Title */}
                <h3 className="font-bold text-lg text-[var(--primary)] mb-2 break-words">{step.title}</h3>

                {/* Description */}
                <p className="text-sm text-[var(--ink)] leading-relaxed mb-3 line-clamp-4">{step.desc}</p>

                {/* Deliverable */}
                <div className="mt-auto pt-3 border-t border-black/5">
                  <p className="text-xs text-[var(--ink-muted)]">
                    <span className="font-medium">成果物：</span>{step.deliverable}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-[var(--ink-muted)] max-w-3xl mx-auto">
          ※目安期間です。貴社の環境・体制により前後します。詳細スケジュールは契約時に調整します。
        </p>
      </div>
    </Section>
  )
}
