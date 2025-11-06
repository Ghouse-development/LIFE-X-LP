'use client'

import { motion } from 'framer-motion'
import { Section } from './Section'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function Pricing() {
  const pricingData = [
    { size: '28〜30坪', total: '2,720万円', breakdown: '本体工事＋付帯工（地域により調整）' },
    { size: '30〜33坪', total: '2,830万円', breakdown: '本体工事＋付帯工（地域により調整）' },
    { size: '33〜36坪', total: '2,950万円', breakdown: '本体工事＋付帯工（地域により調整）' },
    { size: '36〜40坪', total: '3,180万円', breakdown: '本体工事＋付帯工（地域により調整）' },
  ]

  return (
    <Section
      id="pricing"
      variant="light"
      spacing="2xl"
      title="価格と提供範囲"
      subtitle="ワンプライスの考え方で、明確な価格設定"
    >
      <motion.p
        className="text-center text-[var(--ink)] max-w-3xl mx-auto mb-8 leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        価格帯はワンプライスの考え方。付帯工は地域特性に合わせて柔軟に調整します。
      </motion.p>

      <motion.div
        className="overflow-x-auto rounded-2xl border border-black/5 shadow-lg"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <table className="min-w-[720px] w-full text-sm">
          <thead className="bg-slate-50 text-slate-700">
            <tr>
              <th className="p-3 text-left font-semibold">坪数帯</th>
              <th className="p-3 text-left font-semibold">総額（税込）</th>
              <th className="p-3 text-left font-semibold">内訳（本体工事/付帯工目安）</th>
            </tr>
          </thead>
          <tbody className="[&>tr:nth-child(even)]:bg-slate-50">
            {pricingData.map((row, index) => (
              <tr key={index} className="border-t border-slate-200">
                <td className="p-3 font-medium text-[var(--ink-strong)]">{row.size}</td>
                <td className="p-3 font-bold text-[var(--primary)] text-lg">{row.total}</td>
                <td className="p-3 text-[var(--ink)]">{row.breakdown}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      <p className="mt-3 text-xs text-[var(--ink-muted)] text-center max-w-2xl mx-auto">
        ※表示は標準想定。地域・仕様により変動します。
      </p>

      <div className="mt-6 text-center">
        <Button
          asChild
          size="lg"
          className="h-12 px-6 rounded-xl bg-[#0f172a] text-white hover:bg-slate-900 font-medium shadow-lg focus:ring-2 focus:ring-[#0f172a] focus:ring-offset-2"
          data-cta="pricing_request"
        >
          <Link href="#contact">サンプル一式を請求</Link>
        </Button>
      </div>
    </Section>
  )
}
