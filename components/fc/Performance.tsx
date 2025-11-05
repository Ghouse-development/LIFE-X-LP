'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Section } from './Section'

interface PerformanceProps {
  data: {
    ua: string
    uaNote: string
    c: string
    cNote: string
    seismic: string
    seismicNote: string
    warranty: string
    warrantyNote: string
    note: string
  }
}

export function Performance({ data }: PerformanceProps) {
  const specs = [
    {
      label: '断熱性能',
      value: `UA値 ${data.ua}`,
      note: data.uaNote,
    },
    {
      label: '気密性能',
      value: `C値 ${data.c}`,
      note: data.cNote,
    },
    {
      label: '耐震性能',
      value: `耐震等級 ${data.seismic}`,
      note: data.seismicNote,
    },
    {
      label: '保証期間',
      value: `${data.warranty}年`,
      note: data.warrantyNote,
    },
  ]

  return (
    <Section
      id="performance"
      variant="white"
      spacing="2xl"
      title="性能・構造"
      subtitle="数値で語る性能、写真で語る生活の美"
    >
      <div className="grid gap-6 md:grid-cols-3 items-stretch mb-12">
        {/* Left: Main performance metrics (2 columns) */}
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {specs.slice(0, 3).map((spec, index) => (
            <motion.div
              key={spec.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="rounded-2xl border border-black/5 bg-white p-6 shadow-[0_2px_20px_rgba(0,0,0,0.05)] text-center"
            >
              <div className="text-sm text-[var(--ink-muted)] mb-2">{spec.label}</div>
              <div className="font-serif text-3xl md:text-4xl font-bold text-[var(--primary)] mb-3">
                {spec.value}
              </div>
              <p className="text-xs text-[var(--ink-muted)] leading-relaxed">{spec.note}</p>
            </motion.div>
          ))}
        </div>

        {/* Right: Evidence/Citation card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="rounded-2xl border border-black/5 bg-white p-6 shadow-[0_2px_20px_rgba(0,0,0,0.05)]"
        >
          <div className="text-sm font-medium text-[var(--primary)] mb-3">注釈 / 根拠</div>
          <ul className="space-y-2 text-sm text-[var(--ink)] leading-relaxed">
            <li>・数値は一例であり、仕様・地域・設計条件により変動します。</li>
            <li>・耐震は許容応力度計算に基づく設計指針（詳細は面談時に提示）。</li>
            <li>・図は概念図です。実際の納まりや部材構成は設計図書に準じます。</li>
          </ul>
        </motion.div>
      </div>
    </Section>
  )
}
