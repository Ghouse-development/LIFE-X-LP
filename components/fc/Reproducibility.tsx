'use client'

import { motion } from 'framer-motion'
import { Section } from './Section'

export function Reproducibility() {
  const mechanisms = [
    {
      title: '標準仕様',
      description: 'ディテール手引き・資材表・価格表を標準化',
    },
    {
      title: '設計ルール',
      description: '開口・天井・照明の型をプリセット',
    },
    {
      title: '営業台本',
      description: 'ヒアリング〜提案の言い回しと資料統一',
    },
    {
      title: '品質チェック',
      description: '社内検査と是正のフローを運用',
    },
  ]

  return (
    <Section
      id="reproducibility"
      tone="alt"
      spacing="xl"
      title="再現性を担保する仕組み"
      subtitle="誰でも同じクオリティを実現できる標準化されたシステム"
    >
      <div className="grid gap-6 md:grid-cols-4">
        {mechanisms.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="text-[var(--ink-strong)] font-semibold mb-2">{item.title}</div>
            <div className="text-sm text-[var(--ink-muted)] leading-relaxed">{item.description}</div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
