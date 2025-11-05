'use client'

import { motion } from 'framer-motion'
import { Section } from './Section'
import { MapPin } from 'lucide-react'

interface MapProps {
  data: string[]
}

export function Map({ data }: MapProps) {
  return (
    <Section id="map" variant="light" spacing="xl">
      <div className="text-center mb-12">
        <motion.h2
          className="font-serif text-3xl md:text-4xl font-bold mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          全国展開エリア
        </motion.h2>
        <motion.p
          className="text-lg text-[#6B7280] max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          現在、以下のエリアで新規加盟を積極募集中です
        </motion.p>
      </div>

      <div className="max-w-[680px] mx-auto leading-relaxed">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {data.map((area, index) => (
            <motion.div
              key={area}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <MapPin className="w-5 h-5 text-[#D9B66A] flex-shrink-0" />
              <span className="font-medium text-[#0E1113]">{area}</span>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="text-center text-sm text-[#6B7280] mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          ※既存加盟店のテリトリーとの調整が必要です。面談時にご希望エリアをお伝えください。
        </motion.p>
      </div>
    </Section>
  )
}
