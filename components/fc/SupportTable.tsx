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
    <Section id="support" variant="white" spacing="2xl">
      <div className="text-center mb-16">
        <motion.h2
          className="font-serif text-3xl md:text-5xl font-bold mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          サポート範囲
        </motion.h2>
        <motion.p
          className="text-lg md:text-xl text-[#6B7280] max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          営業から施工、マーケティングまで包括的にサポート
        </motion.p>
      </div>

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
              <CardHeader className="bg-[#D9B66A]/5 pb-4">
                <CardTitle className="text-xl font-bold">{support.area}</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-3">
                  {support.items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-[#D9B66A] flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-[#6B7280]">{item}</span>
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
