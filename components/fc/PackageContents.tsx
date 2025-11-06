'use client'

import { motion } from 'framer-motion'
import { Section } from './Section'
import { FileText, Presentation, ClipboardList, DollarSign, Image as ImageIcon, Type } from 'lucide-react'

export function PackageContents() {
  const contents = [
    {
      icon: FileText,
      title: '設計ガイド一式',
      description: '標準仕様書・ディテール手引き・構造計算雛形',
    },
    {
      icon: Presentation,
      title: '営業ツール',
      description: '提案スライドテンプレート・営業台本・VR素材',
    },
    {
      icon: ClipboardList,
      title: '運用マニュアル',
      description: '施工要領書・品質チェックリスト・工程管理表',
    },
    {
      icon: DollarSign,
      title: '価格設定ツール',
      description: '価格テーブル雛形・見積作成フォーマット',
    },
    {
      icon: ImageIcon,
      title: 'デザイン素材',
      description: '外観CG・内観写真・Webサイト用画像アセット',
    },
    {
      icon: Type,
      title: 'コピー・文例集',
      description: '広告文・SNS投稿例・FAQ回答例',
    },
  ]

  return (
    <Section
      id="package"
      variant="light"
      spacing="2xl"
      title="提供パッケージ"
      subtitle="再現性を担保する具体的な提供物"
    >
      <motion.p
        className="text-center text-[var(--ink)] max-w-3xl mx-auto mb-12 leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        設計・営業・施工・マーケティングの各フェーズで必要なツール・雛形・素材を一式提供。
        <br className="hidden md:block" />
        初日から使える実践的な提供物で、短期立上げを実現します。
      </motion.p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
        {contents.map((item, index) => {
          const Icon = item.icon
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex flex-col"
            >
              <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-[0_2px_20px_rgba(0,0,0,0.05)] flex flex-col h-full min-h-[160px]">
                <div className="w-12 h-12 bg-[var(--brand)]/10 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-[var(--brand)]" />
                </div>
                <h3 className="font-bold text-lg text-[var(--primary)] mb-2 break-words">
                  {item.title}
                </h3>
                <p className="text-sm text-[var(--ink)] leading-relaxed overflow-hidden">
                  {item.description}
                </p>
              </div>
            </motion.div>
          )
        })}
      </div>

      <p className="mt-8 text-center text-sm text-[var(--ink-muted)] max-w-2xl mx-auto">
        ※提供物の内容は予告なく更新・追加される場合があります。詳細は個別面談にてご確認ください。
      </p>
    </Section>
  )
}
