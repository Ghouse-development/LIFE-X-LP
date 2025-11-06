'use client'

import { motion } from 'framer-motion'
import { Section } from './Section'
import { Check, X, Minus } from 'lucide-react'

export function Comparison() {
  const items = [
    {
      category: '建売住宅',
      price: { icon: Check, label: '安い', color: 'text-green-600' },
      freedom: { icon: X, label: '選べない', color: 'text-red-600' },
      period: { icon: Check, label: '即入居', color: 'text-green-600' },
    },
    {
      category: 'LIFE X',
      price: { icon: Check, label: '適正価格', color: 'text-green-600' },
      freedom: { icon: Minus, label: '厳選プラン', color: 'text-blue-600' },
      period: { icon: Check, label: '3〜4ヶ月', color: 'text-green-600' },
      highlight: true,
    },
    {
      category: '注文住宅',
      price: { icon: X, label: '高額', color: 'text-red-600' },
      freedom: { icon: Check, label: '自由設計', color: 'text-green-600' },
      period: { icon: X, label: '6ヶ月〜', color: 'text-red-600' },
    },
  ]

  return (
    <Section
      id="comparison"
      tone="light"
      spacing="xl"
      title="LIFE Xのポジショニング"
      subtitle="建売と注文住宅のいいとこ取り"
    >
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3 max-w-5xl mx-auto">
        {items.map((item, index) => (
          <motion.div
            key={item.category}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className={`rounded-2xl border ${
              item.highlight
                ? 'border-[var(--primary)] bg-gradient-to-b from-[var(--primary)]/5 to-white shadow-lg'
                : 'border-black/10 bg-white'
            } p-6`}
          >
            <h3
              className={`font-bold text-center mb-6 text-xl ${
                item.highlight ? 'text-[var(--primary)]' : 'text-[var(--ink)]'
              }`}
            >
              {item.category}
              {item.highlight && (
                <span className="block text-xs font-normal text-[var(--ink-muted)] mt-1">
                  規格住宅
                </span>
              )}
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-black/5">
                <span className="text-sm text-[var(--ink-muted)]">価格</span>
                <div className="flex items-center gap-2">
                  <item.price.icon className={`w-5 h-5 ${item.price.color}`} />
                  <span className={`text-sm font-medium ${item.price.color}`}>
                    {item.price.label}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-black/5">
                <span className="text-sm text-[var(--ink-muted)]">自由度</span>
                <div className="flex items-center gap-2">
                  <item.freedom.icon className={`w-5 h-5 ${item.freedom.color}`} />
                  <span className={`text-sm font-medium ${item.freedom.color}`}>
                    {item.freedom.label}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between py-3">
                <span className="text-sm text-[var(--ink-muted)]">工期</span>
                <div className="flex items-center gap-2">
                  <item.period.icon className={`w-5 h-5 ${item.period.color}`} />
                  <span className={`text-sm font-medium ${item.period.color}`}>
                    {item.period.label}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
