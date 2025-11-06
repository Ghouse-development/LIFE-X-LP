'use client'

import { motion } from 'framer-motion'
import { Clock, TrendingUp, CheckCircle2 } from 'lucide-react'
import { Section } from './Section'

export function ValueGrid() {
  const effects = [
    {
      icon: Clock,
      title: '商談負荷の削減',
      description: '商談時間の削減で、1人で扱える案件数が増やせます',
    },
    {
      icon: TrendingUp,
      title: '提案の安定化',
      description: '説明の揺れを抑えて、提案の通りやすさを高めます',
    },
    {
      icon: CheckCircle2,
      title: '品質の標準化',
      description: '付帯の製作・確認作業が規格化され、ミスと手戻りを減らします',
    },
  ]

  return (
    <Section
      id="effects"
      tone="light"
      spacing="xl"
      title="運用で得られる効果イメージ"
      subtitle="型があることで、少人数でも安定した運用が可能になります"
    >
      <div className="grid gap-6 md:grid-cols-3">
        {effects.map((item, index) => {
          const Icon = item.icon
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-[var(--brand)]/10 rounded-xl flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 text-[var(--brand)]" />
              </div>
              <h3 className="text-lg font-semibold text-[var(--ink-strong)] mb-2">{item.title}</h3>
              <p className="text-sm text-[var(--ink-muted)] leading-relaxed">{item.description}</p>
            </motion.div>
          )
        })}
      </div>
    </Section>
  )
}
