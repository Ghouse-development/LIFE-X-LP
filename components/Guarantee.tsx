'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Shield, HeadphonesIcon, TrendingUp, Users } from 'lucide-react';

const guarantees = [
  {
    icon: Shield,
    title: '初受注保証',
    description: '開業から6ヶ月以内に初受注できなかった場合、加盟金の50%を返金',
    details: '※研修を完了し、本部指定の営業活動を実施した場合に限ります',
  },
  {
    icon: HeadphonesIcon,
    title: '無制限サポート',
    description: '営業・設計・積算・施工に関する相談を無制限で対応',
    details: '平日9:00-18:00 専用ホットライン + Slackコミュニティ',
  },
  {
    icon: TrendingUp,
    title: '売上保証プログラム',
    description: '初年度売上が2,000万円未満の場合、2年目のロイヤリティを1%に減額',
    details: '本部推奨の施策を実施した加盟店が対象',
  },
  {
    icon: Users,
    title: '営業同行サポート',
    description: '開業後3ヶ月間、本部スタッフが商談に同行（月2回まで無料）',
    details: '商談ノウハウを実践で学べる貴重な機会',
  },
];

const supportPrograms = [
  {
    title: '毎月のウェビナー研修',
    items: [
      '最新の住宅トレンド解説',
      '成功事例の共有',
      '営業ロールプレイング',
      '設計・積算の実践講座',
    ],
  },
  {
    title: '年次イベント',
    items: [
      '全国オーナー総会（年1回）',
      '優秀店舗表彰',
      '工場見学ツアー',
      '新商品発表会',
    ],
  },
  {
    title: '継続的なツール提供',
    items: [
      'システムアップデート無料',
      '新規集客ツール配布',
      'プレゼン資料の定期更新',
      'マーケティング施策の共有',
    ],
  },
];

export function Guarantee() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="py-40 px-4 bg-gradient-to-b from-gray-50 to-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">安心の保証制度</h2>
          <p className="text-xl md:text-2xl text-gray-600">
            初めての方でも安心して開業できる充実のサポート体制
          </p>
        </motion.div>

        {/* Guarantees Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {guarantees.map((guarantee, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-shadow"
            >
              <div className="flex items-start mb-6">
                <div className="bg-blue-100 p-4 rounded-2xl mr-4">
                  <guarantee.icon className="w-8 h-8 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{guarantee.title}</h3>
                  <p className="text-lg text-gray-700 mb-3">{guarantee.description}</p>
                  <p className="text-sm text-gray-500">{guarantee.details}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Support Programs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gray-900 text-white rounded-3xl p-8 md:p-12"
        >
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-12">継続サポートプログラム</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {supportPrograms.map((program, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="bg-gray-800 rounded-2xl p-6"
              >
                <h4 className="text-xl font-bold mb-4 text-white">{program.title}</h4>
                <ul className="space-y-3">
                  {program.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start text-gray-300">
                      <span className="text-blue-400 mr-2">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center bg-blue-600 rounded-2xl p-6">
            <p className="text-xl md:text-2xl font-bold mb-2">
              オーナー満足度 4.2/5.0
            </p>
            <p className="text-blue-100">
              充実したサポート体制が高評価の理由です
            </p>
          </div>
        </motion.div>

        {/* Risk Reversal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-16 bg-gradient-to-r from-green-50 to-blue-50 rounded-3xl p-8 md:p-12 text-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            リスクを最小限に、成功を最大限に
          </h3>
          <p className="text-lg md:text-xl text-gray-700 mb-6">
            LIFE Xは「やってみたい」という挑戦を全力で応援します
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <p className="text-4xl font-bold text-blue-600 mb-2">6ヶ月</p>
              <p className="text-gray-700">初受注保証期間</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <p className="text-4xl font-bold text-blue-600 mb-2">無制限</p>
              <p className="text-gray-700">サポート相談回数</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <p className="text-4xl font-bold text-blue-600 mb-2">50%</p>
              <p className="text-gray-700">返金保証率</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
