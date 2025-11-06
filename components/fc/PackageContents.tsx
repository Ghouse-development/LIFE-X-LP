'use client'

import { motion } from 'framer-motion'
import { Section } from './Section'
import { FileText, Presentation, ClipboardList, DollarSign, Image as ImageIcon, Type } from 'lucide-react'

export function PackageContents() {
  const contents = [
    {
      icon: Presentation,
      title: '営業スライド雛形',
      description: '商談で使える提案資料テンプレート（表紙・商品概要・価格・施工事例）。初回商談から即使用可能。',
      detail: '約30ページのPowerPoint形式。貴社ロゴ差替のみで即使用可能。',
    },
    {
      icon: FileText,
      title: '標準仕様書（サンプル）',
      description: '断熱・気密・構造・設備の標準仕様を体系化した仕様書。地域特性に応じた調整方法も記載。',
      detail: '目次・抜粋版をPDFで提供。実務版は契約後に配布。',
    },
    {
      icon: DollarSign,
      title: '価格テーブル雛形',
      description: '坪数別の価格設定表と見積フォーマット。地域調整の考え方も含む。',
      detail: 'Excel形式。原価・粗利の計算式組込済み。',
    },
    {
      icon: ImageIcon,
      title: '外観・内観CGアセット',
      description: '提案・HP・広告で使用できる高品質CG画像（外観10パターン・内観6シーン）。',
      detail: '解像度1920×1080、JPEG形式。商用利用可。',
    },
    {
      icon: Type,
      title: '広告コピー・台本テンプレート',
      description: 'Web広告見出し・LP文章・電話対応台本・SNS投稿例の文例集。',
      detail: 'Word/Googleドキュメント形式。自社用にカスタマイズ可能。',
    },
    {
      icon: ClipboardList,
      title: '運用ガイド1pダイジェスト',
      description: '施工要領・品質チェックリスト・工程管理の要点をまとめた導入ガイド。',
      detail: 'PDF 1ページ。詳細版は契約後に提供。',
    },
  ]

  return (
    <Section
      id="package"
      variant="light"
      spacing="2xl"
      title="受け取れるもの"
      subtitle="サンプル請求で、これらの雛形・素材の一部を今すぐ確認できます"
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
              <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-[0_2px_20px_rgba(0,0,0,0.05)] flex flex-col h-full">
                <div className="w-12 h-12 bg-[var(--brand)]/10 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-[var(--brand)]" />
                </div>
                <h3 className="font-bold text-lg text-[var(--primary)] mb-2 break-words">
                  {item.title}
                </h3>
                <p className="text-sm text-[var(--ink)] leading-relaxed mb-3 line-clamp-3">
                  {item.description}
                </p>
                <p className="text-xs text-[var(--ink-muted)] leading-relaxed mt-auto pt-3 border-t border-black/5">
                  {item.detail}
                </p>
              </div>
            </motion.div>
          )
        })}
      </div>

      <div className="mt-12 text-center">
        <a
          href="#contact"
          className="inline-flex items-center justify-center h-12 px-6 rounded-xl bg-[#0f172a] text-white hover:bg-slate-900 font-medium shadow-lg focus:ring-2 focus:ring-[#0f172a] focus:ring-offset-2 transition-colors"
        >
          サンプル一式を請求
        </a>
      </div>

      <p className="mt-8 text-center text-sm text-[var(--ink-muted)] max-w-2xl mx-auto">
        ※提供物の内容は予告なく更新・追加される場合があります。詳細は個別面談にてご確認ください。
      </p>
    </Section>
  )
}
