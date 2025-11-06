'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FileText, DollarSign, Image } from 'lucide-react'

export function PrimaryCTA() {
  const items = [
    { icon: FileText, text: '営業スライド雛形' },
    { icon: DollarSign, text: '価格表雛形' },
    { icon: Image, text: '画像アセットの一部' },
  ]

  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-white to-[var(--bg)]">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-4xl">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="heading-2 text-[var(--ink)] mb-6">
            まずはサンプル一式をご確認ください
          </h2>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 text-left">
            {items.map((item, index) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <div className="w-8 h-8 rounded-lg bg-[var(--gold)]/10 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-[var(--gold)]" />
                  </div>
                  <span className="text-body">{item.text}</span>
                </motion.div>
              )
            })}
          </div>

          <Link
            href="#contact"
            className="btn-primary inline-flex items-center justify-center mb-4"
            data-cta="primary_request"
          >
            サンプル一式を請求
          </Link>

          <p className="text-sm text-[var(--ink-muted)]">
            すぐにダウンロードURLをお送りします
          </p>
        </motion.div>
      </div>
    </section>
  )
}
