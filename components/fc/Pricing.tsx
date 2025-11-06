'use client'

import { motion } from 'framer-motion'
import { Section } from './Section'
import Link from 'next/link'
import { Check } from 'lucide-react'

export function Pricing() {
  const plans = [
    {
      name: '標準プラン',
      description: '基本仕様で高性能住宅を実現',
      features: [
        '標準仕様（断熱・気密・構造）',
        '営業・設計・施工の型提供',
        '画像・雛形一式',
        '月次レビュー',
      ],
      note: '個別面談でご案内',
    },
    {
      name: 'プレミアムプラン',
      description: '上位仕様＋専任サポート',
      features: [
        '標準プランの全て',
        '上位設備・仕上げ対応',
        '専任PMによる伴走支援',
        '週次レビュー＋優先対応',
      ],
      note: '個別面談でご案内',
    },
  ]

  return (
    <Section
      id="pricing"
      variant="light"
      spacing="2xl"
      title="価格帯"
      subtitle="初期投資とロイヤリティは個別面談でご案内します"
    >
      <motion.p
        className="text-center text-body max-w-3xl mx-auto mb-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        エリア・事業規模により柔軟に調整。まずは提供内容をご確認ください。
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-white border border-[var(--line)] rounded-xl p-6 md:p-8 flex flex-col"
          >
            <h3 className="heading-3 text-[var(--ink)] mb-2">{plan.name}</h3>
            <p className="text-sm text-[var(--ink-muted)] mb-6">{plan.description}</p>

            <ul className="space-y-3 mb-6 flex-grow">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-2 text-body">
                  <Check className="w-5 h-5 text-[var(--gold)] shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <div className="pt-4 border-t border-[var(--line)]">
              <p className="text-sm font-medium text-[var(--ink)] text-center">
                {plan.note}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <p className="mt-8 text-xs text-[var(--ink-muted)] text-center max-w-2xl mx-auto">
        ※提供内容・料率はエリア・事業規模により調整します。詳細は個別面談でご確認ください。
      </p>

      <div className="mt-8 text-center">
        <Link
          href="#contact"
          className="btn-primary"
          data-cta="pricing_request"
        >
          サンプル一式を請求
        </Link>
      </div>
    </Section>
  )
}
