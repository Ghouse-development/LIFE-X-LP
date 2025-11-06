'use client'

import { motion } from 'framer-motion'
import { Section } from './Section'
import Image from 'next/image'
import { TrendingUp, TrendingDown, Clock } from 'lucide-react'

export function CaseStudies() {
  const cases = [
    {
      image: '/fc/gaikan/gaikan-01.jpg',
      title: 'A工務店様（栃木県）',
      size: '30坪',
      period: '3.5ヶ月',
      improvements: [
        { label: '営業回数', value: '▲40%', trend: 'down', icon: TrendingDown },
        { label: '設計工数', value: '▲60%', trend: 'down', icon: TrendingDown },
        { label: '成約率', value: '↑18%', trend: 'up', icon: TrendingUp },
      ],
    },
    {
      image: '/fc/gaikan/gaikan-02.jpg',
      title: 'B工務店様（茨城県）',
      size: '33坪',
      period: '3.2ヶ月',
      improvements: [
        { label: '商談期間', value: '▲30%', trend: 'down', icon: Clock },
        { label: '設計工数', value: '▲55%', trend: 'down', icon: TrendingDown },
        { label: '成約率', value: '↑22%', trend: 'up', icon: TrendingUp },
      ],
    },
    {
      image: '/fc/gaikan/gaikan-03.jpg',
      title: 'C工務店様（群馬県）',
      size: '35坪',
      period: '4.0ヶ月',
      improvements: [
        { label: '営業回数', value: '▲35%', trend: 'down', icon: TrendingDown },
        { label: '設計工数', value: '▲50%', trend: 'down', icon: TrendingDown },
        { label: '成約率', value: '↑15%', trend: 'up', icon: TrendingUp },
      ],
    },
  ]

  return (
    <Section
      id="case-studies"
      tone="alt"
      spacing="xl"
      title="導入事例"
      subtitle="規格住宅の効率化で、営業・設計工数を削減しながら成約率を向上"
    >
      <div className="grid gap-6 md:grid-cols-3">
        {cases.map((caseStudy, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="rounded-2xl border border-black/10 bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="relative h-48">
              <Image
                src={caseStudy.image}
                alt={caseStudy.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="font-bold text-[var(--primary)] text-lg mb-2">
                {caseStudy.title}
              </h3>
              <div className="flex gap-4 text-sm text-[var(--ink-muted)] mb-4">
                <span>規模：{caseStudy.size}</span>
                <span>工期：{caseStudy.period}</span>
              </div>
              <div className="space-y-2">
                {caseStudy.improvements.map((improvement, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2 rounded-lg bg-[var(--surface-alt)]"
                  >
                    <span className="text-sm text-[var(--ink)]">{improvement.label}</span>
                    <div className="flex items-center gap-1">
                      <improvement.icon
                        className={`w-4 h-4 ${
                          improvement.trend === 'up'
                            ? 'text-green-600'
                            : improvement.trend === 'down'
                            ? 'text-blue-600'
                            : 'text-[var(--ink-muted)]'
                        }`}
                      />
                      <span
                        className={`font-bold text-sm ${
                          improvement.trend === 'up'
                            ? 'text-green-600'
                            : improvement.trend === 'down'
                            ? 'text-blue-600'
                            : 'text-[var(--ink)]'
                        }`}
                      >
                        {improvement.value}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
