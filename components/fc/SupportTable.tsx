'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Section } from './Section'
import { Check } from 'lucide-react'

interface SupportArea {
  area: string
  items: string[]
}

interface SupportTableProps {
  data: SupportArea[]
}

export function SupportTable({ data }: SupportTableProps) {
  return (
    <Section
      id="support"
      variant="white"
      spacing="2xl"
      title="サポート範囲"
      subtitle="営業から施工、マーケティングまで包括的にサポート"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((support, index) => (
          <motion.div
            key={support.area}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="bg-[var(--brand)]/5 pb-4">
                <CardTitle className="text-xl font-bold text-[var(--primary)] break-words">{support.area}</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-3">
                  {support.items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-[var(--brand)] flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-[var(--ink)] break-words">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
