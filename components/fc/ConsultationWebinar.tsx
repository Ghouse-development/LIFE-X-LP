'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Section } from './Section'
import Link from 'next/link'

export function ConsultationWebinar() {
  return (
    <Section
      id="consultation"
      tone="light"
      spacing="xl"
      title="LIFE X 説明会・ウェビナー"
      subtitle="ニーズに合わせてご選択ください"
    >
      <div className="grid gap-6 md:grid-cols-2">
        {/* 個別相談 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
        >
          <h3 className="text-lg font-semibold text-[var(--ink-strong)] mb-3">個別相談</h3>
          <p className="text-[var(--ink-muted)] text-sm leading-relaxed mb-6">
            導入可否の初診断、商圏の考え方、初期投資シミュレーションなど、貴社の状況に合わせて個別にご相談いただけます。
          </p>
          <Button size="lg" asChild className="w-full bg-white text-[#0f172a] border-2 border-[#0f172a] hover:bg-gray-50 font-medium">
            <Link href="#contact">個別相談を予約</Link>
          </Button>
        </motion.div>

        {/* ウェビナー */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
        >
          <h3 className="text-lg font-semibold text-[var(--ink-strong)] mb-3">ウェビナー</h3>
          <p className="text-[var(--ink-muted)] text-sm leading-relaxed mb-2">
            LIFE Xフランチャイズの全体像と収益モデルを30分で解説します。
          </p>
          <p className="text-sm font-medium text-[var(--ink)] mb-6">
            次回：毎月第2・第4木曜 14:00〜
          </p>
          <Button size="lg" asChild className="w-full bg-[#0f172a] text-white hover:bg-slate-900 font-medium shadow-lg">
            <Link href="#contact">ウェビナーに申し込む</Link>
          </Button>
        </motion.div>
      </div>
    </Section>
  )
}
