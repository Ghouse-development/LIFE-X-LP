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
    </Section>
  )
}
