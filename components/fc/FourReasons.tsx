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
      alt: 'グラフテクトキッチン標準仕様の実例',
    },
    {
      title: '「規格住宅＝かっこ悪い」を覆す建築家が描いた上質なデザイン',
      description: '経験豊富な設計チームが外観から内装まで一体でプランニング。端正なラインと素材感が映え、住むほど誇れる一邸になる。',
      image: '/fc/gaikan/gaikan-01.jpg',
      alt: '建築家が設計した規格住宅の外観デザイン',
    },
    {
      title: 'どの広さを選んでも価格は均一 - わかりやすく、選びやすい',
      description: '４つの面積プランを用意。どの広さでも価格は同じなので、追加費用に悩まず「ちょうどいい住まい」を安心して選べる。',
      image: '/fc/gaikan/gaikan-02.jpg',
      alt: 'LIFE X 規格住宅の外観バリエーション',
    },
    {
      title: '注文住宅データから導いた暮らしやすさ重視の厳選プラン',
      description: '現場で寄せられた「こうだったら便利」を反映。家事がしやすい動線と適所収納を配置。毎日の移動と片づけが驚くほどラクになる。',
      image: '/fc/gaikan/gaikan-03.jpg',
      alt: '注文住宅データに基づく暮らしやすい間取りプラン',
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
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 auto-rows-fr">
        {reasons.map((reason, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="rounded-2xl border border-black/10 bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col min-h-[220px] sm:min-h-[unset]"
          >
            <div className="relative h-48 md:h-56">
              <Image
                src={reason.image}
                alt={reason.alt}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6 flex flex-col flex-1">
              <h3 className="font-serif text-lg md:text-xl font-bold text-[var(--primary)] mb-3 leading-relaxed break-words hyphens-auto">
                {reason.title}
              </h3>
              <p className="text-sm text-[var(--ink)] leading-relaxed line-clamp-3 sm:line-clamp-none">
                {reason.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
