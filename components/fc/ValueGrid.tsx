'use client'

import { motion } from 'framer-motion'
import { Shield, Sparkles, Rocket, Users, Package, LucideIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Section } from './Section'
import Link from 'next/link'

interface Reason {
  icon: string
  title: string
  desc: string
}

interface ValueGridProps {
  data: {
    reasons: Reason[]
    kpi: Array<{
      label: string
      value: string
      note: string
    }>
  }
}

const iconMap: Record<string, LucideIcon> = {
  Shield,
  Sparkles,
  Rocket,
  Users,
  Package,
}

export function ValueGrid({ data }: ValueGridProps) {
  return (
    <Section
      id="value"
      variant="light"
      spacing="2xl"
      title="選ばれる理由"
      subtitle="スモールスタートで始める高性能住宅FC"
    >
      {/* Reasons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20 auto-rows-fr">
        {data.reasons.map((reason, index) => {
          const Icon = iconMap[reason.icon] || Shield
          return (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex"
            >
              <Card className="flex-1 border border-black/5 shadow-lg hover:shadow-xl transition-shadow flex flex-col min-h-[220px] sm:min-h-[unset]">
                <CardContent className="p-8 flex flex-col flex-1">
                  <div className="w-14 h-14 bg-[var(--brand)]/10 rounded-xl flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7 text-[var(--brand)]" />
                  </div>
                  <h3 className="font-bold text-xl text-[var(--primary)] mb-3 break-words hyphens-auto">{reason.title}</h3>
                  <p className="text-[var(--ink)] leading-relaxed line-clamp-3 sm:line-clamp-none">{reason.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* KPI - Elegant strength with ultra-thin shadows */}
      <div>
        <motion.h3
          className="font-serif text-2xl md:text-3xl font-bold text-[var(--primary)] text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          収益モデル概算
        </motion.h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 max-w-5xl mx-auto">
          {data.kpi.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="rounded-2xl border border-black/5 bg-white p-6 shadow-[0_2px_20px_rgba(0,0,0,0.05)] text-center"
            >
              <div className="text-sm text-[var(--ink-muted)] mb-3">{item.label}</div>
              <div className="flex items-baseline justify-center gap-2 mb-4">
                <span className="font-serif text-5xl md:text-6xl font-extrabold text-[var(--primary)] tracking-[0.02em]">
                  {item.value.split('万円')[0]}
                </span>
                <span className="text-xl md:text-2xl text-[var(--ink-muted)] translate-y-[2px]">万円</span>
              </div>
              <p className="text-xs text-[var(--ink-muted)] leading-relaxed">{item.note}</p>
            </motion.div>
          ))}
        </div>
        <p className="text-center text-sm text-[var(--ink-muted)] mt-8 max-w-2xl mx-auto">
          ※以上は参考値です。エリア・施策により変動します。確定値は契約前面談で開示します。
        </p>
        <div className="text-center mt-8">
          <Button
            asChild
            variant="primary"
            size="lg"
            data-cta="value_request_materials"
          >
            <Link href="#contact">商圏別の収益モデルを資料で確認</Link>
          </Button>
        </div>
      </div>
    </Section>
  )
}
