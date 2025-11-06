'use client'

import { motion } from 'framer-motion'
import { Section } from './Section'
import { CheckCircle2 } from 'lucide-react'

export function Roadmap() {
  const weeks = [
    {
      week: 'W1',
      title: '現状診断',
      tasks: ['既存体制・商圏・商品構成の棚卸し', '商談資料・広告・運用の現状分析'],
    },
    {
      week: 'W2',
      title: '研修 & 運用設計',
      tasks: ['商談フロー設計', '権限・レビュー体制の整備'],
    },
    {
      week: 'W3–W4',
      title: '制作',
      tasks: ['LP・チラシ制作', '価格雛形・台本作成'],
    },
    {
      week: 'W5',
      title: 'セットアップ',
      tasks: ['フォーム・タグ設置', '同意文・規約整備'],
    },
    {
      week: 'W6',
      title: '内部テスト',
      tasks: ['模擬商談実施', 'フィードバック反映・修正'],
    },
    {
      week: 'W7',
      title: 'ローンチ準備',
      tasks: ['告知・プレスリリース', '適用手順の最終確認'],
    },
    {
      week: 'W8',
      title: '稼働 & 週次レビュー',
      tasks: ['実案件での運用開始', '週次MTGで改善サイクル'],
    },
  ]

  return (
    <Section
      id="roadmap"
      variant="white"
      spacing="2xl"
      title="導入ロードマップ"
      subtitle="最短8週間で販売運用を開始"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {weeks.map((item, index) => (
          <motion.div
            key={item.week}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="bg-white border border-[var(--line)] rounded-xl p-5 flex flex-col"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-[var(--gold)]/10 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-[var(--gold)]">{item.week}</span>
              </div>
              <h3 className="heading-3 text-[var(--ink)] text-base">{item.title}</h3>
            </div>
            <ul className="space-y-2 flex-grow">
              {item.tasks.map((task, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-body">
                  <CheckCircle2 className="w-4 h-4 text-[var(--gold)] shrink-0 mt-0.5" />
                  <span>{task}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <motion.p
        className="mt-8 text-center text-sm text-[var(--ink-muted)] max-w-2xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
      >
        ※目安。環境により変動します。
      </motion.p>
    </Section>
  )
}
