'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Section } from './Section'

export function Concept() {
  const concepts = [
    {
      title: '美しさの再現性',
      description: '標準仕様とディテール手引きで、高いデザイン性を誰でも再現できます。',
      image: '/cases/case-20.jpg',
    },
    {
      title: '構造信頼性',
      description: '許容応力度計算による耐震等級3で、お施主様に安心を提供します。',
      image: '/cases/case-30.jpg',
    },
    {
      title: '立上げ速度',
      description: '営業〜施工フローと教育コンテンツをパッケージ化。最短3〜6ヶ月で開業できます。',
      image: '/cases/case-06.jpg',
    },
  ]

  return (
    <Section id="concept" variant="white" spacing="2xl">
      <div className="text-center mb-16">
        <motion.h2
          className="font-serif text-3xl md:text-5xl font-bold text-[var(--primary)] mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          LIFE X の設計思想
        </motion.h2>
        <motion.p
          className="text-lg md:text-xl text-[var(--ink)] max-w-[680px] mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          高性能×自由設計を両立する規格住宅の型を提供します
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
        {concepts.map((concept, index) => (
          <motion.div
            key={concept.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="group"
          >
            <div className="relative aspect-[4/3] mb-6 overflow-hidden rounded-2xl">
              <Image
                src={concept.image}
                alt={concept.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500 image-enhanced"
              />
            </div>
            <h3 className="font-serif text-xl md:text-2xl font-bold text-[var(--primary)] mb-3">
              {concept.title}
            </h3>
            <p className="text-[var(--ink)] leading-relaxed">
              {concept.description}
            </p>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
