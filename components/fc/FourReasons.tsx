'use client'

import { motion } from 'framer-motion'
import { Section } from './Section'
import Image from 'next/image'

export function FourReasons() {
  const reasons = [
    {
      title: 'グラフテクトキッチンや人気設備も最初から全部コミコミの標準仕様',
      description: '話題のキッチン、収納計画、スマートキーまで"ほしい"を標準搭載。オプションで迷わず、入居初日から理想の暮らしが整う。',
      image: '/fc/equipment/graftekt.jpg',
    },
    {
      title: '「規格住宅＝かっこ悪い」を覆す建築家が描いた上質なデザイン',
      description: '経験豊富な設計チームが外観から内装まで一体でプランニング。端正なラインと素材感が映え、住むほど誇れる一邸になる。',
      image: '/fc/gaikan/gaikan-01.jpg',
    },
    {
      title: 'どの広さを選んでも価格は均一 - わかりやすく、選びやすい',
      description: '４つの面積プランを用意。どの広さでも価格は同じなので、追加費用に悩まず「ちょうどいい住まい」を安心して選べる。',
      image: '/fc/gaikan/gaikan-02.jpg',
    },
    {
      title: '注文住宅データから導いた暮らしやすさ重視の厳選プラン',
      description: '現場で寄せられた「こうだったら便利」を反映。家事がしやすい動線と適所収納を配置。毎日の移動と片づけが驚くほどラクになる。',
      image: '/fc/gaikan/gaikan-03.jpg',
    },
  ]

  return (
    <Section
      id="four-reasons"
      tone="alt"
      spacing="xl"
      title="LIFE Xが選ばれる4つの魅力"
      subtitle="規格住宅の常識を変える、こだわりの標準仕様"
    >
      <div className="grid gap-8 md:grid-cols-2">
        {reasons.map((reason, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="rounded-2xl border border-black/10 bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="relative h-48 md:h-56">
              <Image
                src={reason.image}
                alt={reason.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="font-serif text-lg md:text-xl font-bold text-[var(--primary)] mb-3 leading-relaxed">
                {reason.title}
              </h3>
              <p className="text-sm text-[var(--ink)] leading-relaxed">
                {reason.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
