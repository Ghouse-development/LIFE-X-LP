'use client'

import { motion } from 'framer-motion'
import { Section } from './Section'
import Image from 'next/image'

export function StandardEquipment() {
  const equipment = [
    {
      name: 'グラフテクトキッチン',
      description: 'BOSCH食洗機・タッチレス水栓・ダイニング収納・キッチンコンセント標準',
      image: '/fc/equipment/graftekt.jpg',
    },
    {
      name: 'AICA洗面化粧台',
      description: 'スマートサニタリーU / W1220・W1675（間取りに合わせて選択）',
      image: '/fc/equipment/aica.jpg',
    },
    {
      name: '全熱交換型第一種換気',
      description: '高効率換気システムで快適な室内環境を実現',
      image: '/fc/equipment/ventilation.jpg',
    },
    {
      name: 'スマートキー玄関ドア',
      description: 'タッチ&キーレスで快適な出入り、防犯性も向上',
      image: '/fc/equipment/smartkey.jpg',
    },
  ]

  const otherFeatures = [
    '全室照明デザイン',
    'リモコンニッチ',
    '天井ハイドア',
    '全室収納プラン',
    'ホームIoT標準',
    'Panasonic エコキュート370L',
  ]

  return (
    <Section
      id="equipment"
      tone="light"
      spacing="xl"
      title="充実の標準仕様"
      subtitle="通常はオプション扱いの設備を、最初から標準で"
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
        {equipment.map((item, index) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="rounded-2xl border border-black/10 bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="relative h-40">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-bold text-[var(--primary)] mb-2">{item.name}</h3>
              <p className="text-xs text-[var(--ink-muted)] leading-relaxed">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Other features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="max-w-4xl mx-auto"
      >
        <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
          <h3 className="font-bold text-[var(--primary)] mb-4 text-center">その他の標準装備</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {otherFeatures.map((feature) => (
              <div
                key={feature}
                className="flex items-center gap-2 text-sm text-[var(--ink)]"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--brand)]" />
                {feature}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </Section>
  )
}
