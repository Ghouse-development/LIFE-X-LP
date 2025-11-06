'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Section } from './Section'
import { FileText, Clock, Users } from 'lucide-react'

export function Concept() {
  const valueProps = [
    {
      title: '設計・打合せ負担を抑える',
      description: '標準仕様とディテール手引きで、誰でも高いデザイン性を再現。お施主様との打合せ時間を大幅に削減できます。',
      icon: FileText,
    },
    {
      title: '短期立上げ（最短8週間）',
      description: '営業〜施工フローと教育コンテンツをパッケージ化。スピーディーに販売運用を開始できます。',
      icon: Clock,
    },
    {
      title: '再現性（誰でも同品質で提案）',
      description: '台本・雛形・画像・運用ルールまで一式提供。少人数でも同品質の商談運用を実現します。',
      icon: Users,
    },
  ]

  return (
    <Section id="concept" variant="white" spacing="2xl">
      <div className="text-center mb-16">
        <motion.h2
          className="heading-2 text-[var(--ink)] mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          LIFE X が選ばれる理由
        </motion.h2>
        <motion.p
          className="text-lead max-w-[680px] mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          規格住宅の&ldquo;迷い&rdquo;を減らす仕組みを一式でご提供
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
        {valueProps.map((item, index) => {
          const Icon = item.icon
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white border border-[var(--line)] rounded-xl p-6 md:p-8 flex flex-col"
            >
              <div className="w-12 h-12 rounded-lg bg-[var(--gold)]/10 flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 text-[var(--gold)]" />
              </div>
              <h3 className="heading-3 text-[var(--ink)] mb-3">
                {item.title}
              </h3>
              <p className="text-body mb-6 flex-grow">
                {item.description}
              </p>
              <Link
                href="#contact"
                className="btn-secondary text-sm"
                data-cta={`concept_${index}`}
              >
                サンプル一式を請求
              </Link>
            </motion.div>
          )
        })}
      </div>
    </Section>
  )
}
