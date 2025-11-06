'use client'

import { motion } from 'framer-motion'
import { Section } from './Section'
import Image from 'next/image'
import { Youtube, Instagram, Globe, TrendingUp } from 'lucide-react'

export function TrustAndSupport() {
  const marketingSupport = [
    {
      icon: Youtube,
      title: 'YouTube 2.9万人',
      description: 'ルームツアーチャンネルで商品認知向上',
    },
    {
      icon: Instagram,
      title: 'Instagram 2.5万人',
      description: 'SNS・META広告ノウハウを水平展開',
    },
    {
      icon: Globe,
      title: '年間HP 100万PV',
      description: 'HP最適化ノウハウを共有',
    },
    {
      icon: TrendingUp,
      title: '導入2ヶ月間集客支援',
      description: 'Gハウスが集客マーケティングを実施',
    },
  ]

  return (
    <Section
      id="trust"
      tone="alt"
      spacing="xl"
      title="信頼と実績"
      subtitle="建築家の設計思想 × 実証済みの集客ノウハウ"
    >
      <div className="grid gap-8 lg:grid-cols-2 mb-12">
        {/* 谷尻氏紹介 */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl border border-black/10 bg-white p-8 shadow-sm"
        >
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="relative w-32 h-32 flex-shrink-0 rounded-full overflow-hidden">
              <Image
                src="/fc/tanijiri/tanijiri.jpg"
                alt="建築家 谷尻誠氏"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="font-serif text-xl md:text-2xl font-bold text-[var(--primary)] mb-2">
                建築家が描いた上質なデザイン
              </h3>
              <p className="text-sm text-[var(--ink)] leading-relaxed mb-3">
                経験豊富な設計チームが外観から内装まで一体でプランニング。端正なラインと素材感が映え、住むほど誇れる一邸になる。
              </p>
              <p className="text-xs text-[var(--ink-muted)]">
                「規格住宅＝かっこ悪い」という常識を覆す、建築家ならではの洗練されたデザインを実現。
              </p>
            </div>
          </div>
        </motion.div>

        {/* 集客実績 */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl border border-black/10 bg-white p-8 shadow-sm"
        >
          <h3 className="font-serif text-xl md:text-2xl font-bold text-[var(--primary)] mb-6">
            Gハウスの集客ノウハウを活用
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {marketingSupport.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center p-4 rounded-xl bg-[var(--surface-alt)]"
              >
                <item.icon className="w-8 h-8 text-[var(--brand)] mb-2" />
                <div className="font-bold text-[var(--primary)] text-sm mb-1">{item.title}</div>
                <p className="text-xs text-[var(--ink-muted)] leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* 実績数値 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="max-w-4xl mx-auto"
      >
        <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="font-serif text-3xl md:text-4xl font-bold text-[var(--primary)] mb-1">
                46億円
              </div>
              <div className="text-xs text-[var(--ink-muted)]">年商（2025年）</div>
            </div>
            <div>
              <div className="font-serif text-3xl md:text-4xl font-bold text-[var(--primary)] mb-1">
                1,685件
              </div>
              <div className="text-xs text-[var(--ink-muted)]">年間来場予約</div>
            </div>
            <div>
              <div className="font-serif text-3xl md:text-4xl font-bold text-[var(--primary)] mb-1">
                16.1%
              </div>
              <div className="text-xs text-[var(--ink-muted)]">成約率</div>
            </div>
            <div>
              <div className="font-serif text-3xl md:text-4xl font-bold text-[var(--primary)] mb-1">
                54万人
              </div>
              <div className="text-xs text-[var(--ink-muted)]">年間HP訪問者</div>
            </div>
          </div>
        </div>
      </motion.div>
    </Section>
  )
}
