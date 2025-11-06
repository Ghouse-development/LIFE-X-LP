'use client'

import { motion } from 'framer-motion'
import { Section } from './Section'

interface PerformanceProps {
  data: {
    thermal: string
    thermalNote: string
    structure: string
    structureNote: string
    warranty: string
    warrantyNote: string
    note: string
  }
}

export function Performance({ data }: PerformanceProps) {
  const specs = [
    {
      label: '断熱性能',
      value: data.thermal,
      note: data.thermalNote,
    },
    {
      label: '構造設計',
      value: data.structure,
      note: data.structureNote,
    },
    {
      label: '保証',
      value: data.warranty,
      note: data.warrantyNote,
    },
  ]

  return (
    <Section
      id="performance"
      variant="white"
      spacing="2xl"
      title="性能・構造"
      subtitle="高水準の性能で快適な暮らしを実現"
    >
      <div className="grid gap-6 md:grid-cols-3 mb-12">
        {specs.map((spec, index) => (
          <motion.div
            key={spec.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="rounded-2xl border border-black/5 bg-white p-6 shadow-[0_2px_20px_rgba(0,0,0,0.05)] text-center"
          >
            <div className="text-sm font-medium text-[var(--ink-strong)] mb-2 break-words">{spec.label}</div>
            <div className="font-serif text-2xl md:text-3xl font-bold text-[var(--primary)] mb-3 break-words">
              {spec.value}
            </div>
            <p className="text-xs text-[var(--ink)] leading-relaxed overflow-hidden">{spec.note}</p>
          </motion.div>
        ))}
      </div>

      <p className="text-center text-sm text-[var(--ink-muted)] mt-6 max-w-3xl mx-auto">
        {data.note}
      </p>
    </Section>
  )
}
