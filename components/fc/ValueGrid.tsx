'use client'

import { motion } from 'framer-motion'
import { Shield, Sparkles, Rocket, Users, Package, LucideIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Section } from './Section'

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
    <Section id="value" variant="light" spacing="2xl">
      <div className="text-center mb-16">
        <motion.h2
          className="font-serif text-3xl md:text-5xl font-bold mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          選ばれる理由
        </motion.h2>
        <motion.p
          className="text-lg md:text-xl text-[#6B7280] max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          スモールスタートで始める高性能住宅FC
        </motion.p>
      </div>

      {/* Reasons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
        {data.reasons.map((reason, index) => {
          const Icon = iconMap[reason.icon] || Shield
          return (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <div className="w-14 h-14 bg-[#D9B66A]/10 rounded-xl flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7 text-[#D9B66A]" />
                  </div>
                  <h3 className="font-bold text-xl mb-3">{reason.title}</h3>
                  <p className="text-[#6B7280] leading-relaxed">{reason.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* KPI */}
      <div>
        <motion.h3
          className="font-serif text-2xl md:text-3xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          収益モデル概算
        </motion.h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.kpi.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card className="text-center border-2 border-[#D9B66A]/20 shadow-lg">
                <CardContent className="p-8">
                  <p className="text-sm text-[#6B7280] mb-2">{item.label}</p>
                  <p className="font-serif text-3xl md:text-4xl font-bold text-[#D9B66A] mb-3">
                    {item.value}
                  </p>
                  <p className="text-xs text-[#6B7280]">{item.note}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        <p className="text-center text-sm text-[#6B7280] mt-8">
          ※以上は参考値です。エリア・施策により変動します。確定値は契約前面談で開示します。
        </p>
      </div>
    </Section>
  )
}
