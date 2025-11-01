'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Check } from 'lucide-react';

const pricingItems = [
  {
    category: '加盟金',
    amount: '100万円',
    description: 'ブランド使用権・営業エリア保護',
  },
  {
    category: '研修費',
    amount: '50万円',
    description: '商品知識・設計・積算・営業ノウハウ',
  },
  {
    category: 'システム利用料',
    amount: '30万円',
    description: '見積・設計・顧客管理ツール一式',
  },
  {
    category: '初期サポート',
    amount: '70万円',
    description: '開業3ヶ月間の集中支援・営業同行',
  },
  {
    category: 'マーケティング支援',
    amount: '50万円',
    description: 'Web集客・広告素材・LP制作',
  },
];

const includedServices = [
  '商品カタログ・プレゼン資料一式',
  '設計図面テンプレート50種類',
  '積算自動化ツール',
  'CRM・顧客管理システム',
  'Web集客ツール（LP・広告素材）',
  '毎月のウェビナー研修（無制限参加）',
  '個別相談（月2回まで無料）',
  'オーナー専用コミュニティ',
];

export function PricingBreakdown() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const total = pricingItems.reduce((sum, item) => {
    const amount = parseInt(item.amount.replace(/[^\d]/g, ''));
    return sum + amount;
  }, 0);

  return (
    <section ref={ref} className="py-40 px-4 bg-white border-t border-gray-200">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">初期費用の内訳</h2>
          <p className="text-xl md:text-2xl text-gray-600">
            明朗会計・後から追加費用なし
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Pricing Breakdown */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-gray-50 rounded-3xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold mb-6 text-gray-900">費用項目</h3>
              <div className="space-y-4 mb-8">
                {pricingItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    className="flex justify-between items-start p-4 bg-white rounded-xl hover:shadow-md transition-shadow"
                  >
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">{item.category}</h4>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                    <div className="text-right ml-4">
                      <p className="text-lg font-bold text-gray-900">{item.amount}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="border-t-2 border-gray-300 pt-6">
                <div className="flex justify-between items-center">
                  <h4 className="text-2xl font-bold text-gray-900">合計</h4>
                  <p className="text-3xl font-bold text-blue-600">{total.toLocaleString()}万円</p>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  ※月額ロイヤリティ: 売上の3%（初年度は2%）
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right: What's Included */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-blue-50 rounded-3xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold mb-6 text-gray-900">初期費用に含まれるもの</h3>
              <div className="space-y-3">
                {includedServices.map((service, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.05 }}
                    className="flex items-start"
                  >
                    <Check className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    <p className="ml-3 text-gray-700">{service}</p>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-white rounded-xl">
                <h4 className="font-bold text-gray-900 mb-3">💡 従来FCとの比較</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">従来FC平均</span>
                    <span className="font-semibold text-gray-900">1,000万円〜</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">LIFE X</span>
                    <span className="font-semibold text-blue-600">{total.toLocaleString()}万円</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-200">
                    <span className="text-gray-900 font-bold">削減額</span>
                    <span className="text-green-600 font-bold">約70%削減</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-12 text-center bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-8 text-white"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-3">
            分割払い・リース対応可能
          </h3>
          <p className="text-lg md:text-xl mb-6 text-blue-100">
            初期費用の負担を軽減するプランもご用意しています
          </p>
          <p className="text-sm text-blue-200">
            詳細は30分無料相談でご説明いたします
          </p>
        </motion.div>
      </div>
    </section>
  );
}
