'use client'

import { motion } from 'framer-motion'
import { Section } from './Section'
import { AlertCircle, Users2, TrendingUp } from 'lucide-react'

export function ThreeContradictions() {
  const contradictions = [
    {
      icon: AlertCircle,
      title: '品質を上げたいが、<br />設計負荷が増える',
      description: '高性能住宅を打ち出すほど、断熱・気密・構造計算の負荷が増加。小規模工務店では設計体制の構築が困難。',
      solution: '標準仕様とディテール手引きで、設計負荷を削減しながら高性能を実現。',
    },
    {
      icon: Users2,
      title: '少人数で回したいが、<br />属人化が進む',
      description: '営業・設計・施工の知見が特定の担当者に集中。担当者の離職や負荷集中でビジネスが停滞するリスク。',
      solution: '型化された営業台本・設計ルール・施工要領で、誰でも同じ品質を再現可能に。',
    },
    {
      icon: TrendingUp,
      title: '棟数を増やしたいが、<br />品質が揺れる',
      description: '案件が増えるほど、説明・提案・施工の品質にバラつきが発生。顧客満足度の低下や手戻りコストが増大。',
      solution: 'チェックリストとレビュー体制で、棟数を増やしても一定の品質を担保する仕組み。',
    },
  ]

  return (
    <Section
      id="contradictions"
      tone="alt"
      spacing="xl"
      title="フランチャイズ導入の3つの矛盾"
      subtitle="スモールスタートで高品質を目指すほど、直面する構造的な課題"
    >
      <div className="grid gap-6 md:grid-cols-3">
        {contradictions.map((item, index) => {
          const Icon = item.icon
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm"
            >
              <div className="w-12 h-12 bg-[var(--brand-accent)]/10 rounded-xl flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 text-[var(--brand-accent)]" />
              </div>
              <h3
                className="text-lg font-semibold text-[var(--ink-strong)] mb-3 leading-tight"
                dangerouslySetInnerHTML={{ __html: item.title }}
              />
              <p className="text-sm text-[var(--ink)] leading-relaxed mb-4">{item.description}</p>
              <div className="pt-4 border-t border-black/5">
                <p className="text-xs text-[var(--brand-accent)] font-medium mb-1">→ 解決策</p>
                <p className="text-sm text-[var(--ink-muted)] leading-relaxed">{item.solution}</p>
              </div>
            </motion.div>
          )
        })}
      </div>
    </Section>
  )
}
