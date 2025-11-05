'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Section } from './Section'

interface PerformanceProps {
  data: {
    ua: string
    uaNote: string
    c: string
    cNote: string
    seismic: string
    seismicNote: string
    warranty: string
    warrantyNote: string
    note: string
  }
}

export function Performance({ data }: PerformanceProps) {
  const specs = [
    {
      label: '断熱性能',
      value: `UA値 ${data.ua}`,
      note: data.uaNote,
    },
    {
      label: '気密性能',
      value: `C値 ${data.c}`,
      note: data.cNote,
    },
    {
      label: '耐震性能',
      value: `耐震等級 ${data.seismic}`,
      note: data.seismicNote,
    },
    {
      label: '保証期間',
      value: `${data.warranty}年`,
      note: data.warrantyNote,
    },
  ]

  return (
    <Section id="performance" variant="white" spacing="2xl">
      <div className="text-center mb-16">
        <motion.h2
          className="font-serif text-3xl md:text-5xl font-bold mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          性能・構造
        </motion.h2>
        <motion.p
          className="text-lg md:text-xl text-[#6B7280] max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          数値で語る性能、写真で語る生活の美
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {specs.map((spec, index) => (
          <motion.div
            key={spec.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Card className="h-full border-2 border-[#D9B66A]/20 shadow-lg">
              <CardContent className="p-8 text-center">
                <p className="text-sm text-[#6B7280] mb-3">{spec.label}</p>
                <p className="font-serif text-2xl md:text-3xl font-bold text-[#D9B66A] mb-4">
                  {spec.value}
                </p>
                <p className="text-xs text-[#6B7280] leading-relaxed">
                  {spec.note}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <p className="text-center text-sm text-[#6B7280] max-w-3xl mx-auto">
        {data.note}
      </p>
    </Section>
  )
}
