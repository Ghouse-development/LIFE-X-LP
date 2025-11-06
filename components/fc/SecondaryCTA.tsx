'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Calendar } from 'lucide-react'

export function SecondaryCTA() {
  return (
    <section id="consultation" className="py-12 md:py-16 bg-[var(--bg)]">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-3xl">
        <motion.div
          className="bg-white border border-[var(--line)] rounded-2xl p-8 md:p-10 text-center shadow-sm"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="w-14 h-14 rounded-full bg-[var(--gold)]/10 flex items-center justify-center mx-auto mb-5">
            <Calendar className="w-7 h-7 text-[var(--gold)]" />
          </div>

          <h3 className="heading-3 text-[var(--ink)] mb-3">
            個別相談で詳しく確認
          </h3>

          <p className="text-body mb-6 max-w-md mx-auto">
            具体的な導入可否とスケジュールをご案内します
          </p>

          <Link
            href="#webinar"
            className="btn-secondary inline-flex items-center justify-center"
            data-cta="secondary_consultation"
          >
            個別相談（30分）
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
