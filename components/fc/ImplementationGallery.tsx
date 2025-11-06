'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export function ImplementationGallery() {
  const [activeTab, setActiveTab] = useState<'materials' | 'web' | 'assets'>('materials')

  const tabs = [
    { id: 'materials' as const, label: '商談資料' },
    { id: 'web' as const, label: 'Web & 広告' },
    { id: 'assets' as const, label: '画像アセット' },
  ]

  const gallery = {
    materials: [
      { image: '/cases/case-08.jpg', caption: '商談で使う比較表（雛形）' },
      { image: '/cases/case-20.jpg', caption: '標準仕様説明スライド' },
      { image: '/cases/case-30.jpg', caption: '価格提示フォーマット' },
      { image: '/cases/case-06.jpg', caption: 'ヒアリングシート' },
      { image: '/cases/case-07.jpg', caption: '施工事例紹介ページ' },
      { image: '/cases/case-10.jpg', caption: 'Q&A台本集' },
    ],
    web: [
      { image: '/cases/case-15.jpg', caption: 'LP（トップビュー）' },
      { image: '/cases/case-25.jpg', caption: 'Web広告バナーセット' },
      { image: '/cases/case-35.jpg', caption: 'SNS投稿テンプレート' },
      { image: '/cases/case-12.jpg', caption: 'チラシデザイン（表面）' },
      { image: '/cases/case-22.jpg', caption: 'チラシデザイン（裏面）' },
      { image: '/cases/case-32.jpg', caption: 'メールマガジンテンプレート' },
    ],
    assets: [
      { image: '/cases/case-40.jpg', caption: '外観CG（プラン01）' },
      { image: '/cases/case-41.jpg', caption: '外観CG（プラン02）' },
      { image: '/cases/case-42.jpg', caption: 'リビング内観CG' },
      { image: '/cases/case-43.jpg', caption: 'キッチン内観CG' },
      { image: '/cases/case-44.jpg', caption: '寝室内観CG' },
      { image: '/cases/case-45.jpg', caption: '外構イメージCG' },
    ],
  }

  const currentGallery = gallery[activeTab]

  return (
    <section className="py-16 md:py-24 bg-[var(--dark-bg)]">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="heading-2 text-white mb-4">実装ギャラリー</h2>
          <p className="text-lead text-white/80 max-w-2xl mx-auto">
            実際に提供する資料・画像の一部をご覧いただけます
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-8 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-lg font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-white text-[var(--ink)]'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10"
        >
          {currentGallery.map((item, index) => (
            <motion.div
              key={`${activeTab}-${index}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="group"
            >
              <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-white/5 border border-white/10">
                <Image
                  src={item.image}
                  alt={item.caption}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="mt-3 text-sm text-white/70 text-center">{item.caption}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <div className="text-center">
          <Link href="#contact" className="btn-ghost-on-dark">
            サンプル一式を請求
          </Link>
        </div>
      </div>
    </section>
  )
}
