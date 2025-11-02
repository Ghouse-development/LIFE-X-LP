'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

export function Cases() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="py-40 px-4 bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            人生を変える家
          </h2>
        </motion.div>

        {/* 1つの巨大図解 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-6xl mx-auto"
        >
          <div className="relative aspect-[16/9] rounded-3xl overflow-hidden shadow-lg border-2 border-gray-200">
            <Image
              src="/cases/case-20.jpg"
              alt="LIFE X 高性能住宅コンセプト"
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </div>

          {/* 3つのキーメトリクス - 巨大表示 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 mt-16">
            <div className="text-center">
              <div className="text-sm md:text-base font-medium text-gray-500 uppercase tracking-wider mb-3">
                気密性
              </div>
              <div className="text-5xl md:text-7xl font-bold text-success-green mb-2">
                0.24
              </div>
              <div className="text-xl md:text-2xl font-medium text-gray-600 mb-2">
                C値
              </div>
              <p className="text-sm text-gray-500">
                高気密で冷暖房効率が良い
              </p>
            </div>
            <div className="text-center">
              <div className="text-sm md:text-base font-medium text-gray-500 uppercase tracking-wider mb-3">
                断熱性
              </div>
              <div className="text-5xl md:text-7xl font-bold text-success-green mb-2">
                0.46
              </div>
              <div className="text-xl md:text-2xl font-medium text-gray-600 mb-2">
                UA値
              </div>
              <p className="text-sm text-gray-500">
                ZEH基準大幅クリア
              </p>
            </div>
            <div className="text-center">
              <div className="text-sm md:text-base font-medium text-gray-500 uppercase tracking-wider mb-3">
                耐震性
              </div>
              <div className="text-5xl md:text-7xl font-bold text-success-green mb-2">
                等級3
              </div>
              <div className="text-xl md:text-2xl font-medium text-gray-600 mb-2">
                耐震等級
              </div>
              <p className="text-sm text-gray-500">
                建築基準法の1.5倍の耐震性
              </p>
            </div>
          </div>
        </motion.div>

        {/* 3つの導入事例 */}
        <div className="mt-20 space-y-8">
          {/* 事例1: コンチネンタルホーム */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-4xl mx-auto bg-white rounded-2xl p-8 md:p-12 shadow-md"
          >
            <div className="flex items-start gap-6 mb-6">
              <div className="relative w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src="/cases/case-01.jpg"
                  alt="コンチネンタルホーム"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">コンチネンタルホーム株式会社</h3>
                <p className="text-sm text-gray-600">栃木県佐野市 / 2024年11月加盟</p>
                <div className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                  開業3ヶ月で初受注達成
                </div>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed mb-6">
              大手FC説明会で1,500万円の初期投資を提示され、躊躇していました。LIFE Xは加盟金300万円。「これなら勝負できる」と即決しました。研修で設計・積算の型を習得し、営業だけに集中。開業3ヶ月で地元工務店との競合に勝ち、初受注を獲得。本部の遠隔サポートで無事引き渡しまで完了しました。
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-200">
              <div className="text-center py-2 sm:py-0">
                <p className="text-sm text-gray-500 mb-1">初年度売上見込</p>
                <p className="text-lg font-bold text-revenue-orange">3,200万円</p>
              </div>
              <div className="text-center py-2 sm:py-0">
                <p className="text-sm text-gray-500 mb-1">粗利率</p>
                <p className="text-lg font-bold text-revenue-orange">32%</p>
              </div>
              <div className="text-center py-2 sm:py-0">
                <p className="text-sm text-gray-500 mb-1">開業時人員</p>
                <p className="text-lg font-bold text-gray-900">2名</p>
              </div>
            </div>
          </motion.div>

          {/* 事例2: 東京エリア */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="max-w-4xl mx-auto bg-white rounded-2xl p-8 md:p-12 shadow-md"
          >
            <div className="flex items-start gap-6 mb-6">
              <div className="relative w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src="/cases/case-02.jpg"
                  alt="東京エリア加盟店"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">ビルダー転換事例</h3>
                <p className="text-sm text-gray-600">東京都 / 2024年6月加盟</p>
                <div className="inline-block mt-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                  初年度売上4,500万円達成
                </div>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed mb-6">
              地場ビルダーとして5年。高性能住宅の需要は感じるも、設計ノウハウがなく見積もりに2週間かかっていました。LIFE Xは設計図面・積算シートを即提供。商談スピードが3倍に加速。初年度2棟で4,500万円の売上を達成。「もっと早く出会いたかった」というのが本音です。
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-200">
              <div className="text-center py-2 sm:py-0">
                <p className="text-sm text-gray-500 mb-1">初年度売上</p>
                <p className="text-lg font-bold text-revenue-orange">4,500万円</p>
              </div>
              <div className="text-center py-2 sm:py-0">
                <p className="text-sm text-gray-500 mb-1">粗利率</p>
                <p className="text-lg font-bold text-revenue-orange">35%</p>
              </div>
              <div className="text-center py-2 sm:py-0">
                <p className="text-sm text-gray-500 mb-1">受注棟数</p>
                <p className="text-lg font-bold text-success-green">2棟</p>
              </div>
            </div>
          </motion.div>

          {/* 事例3: 関西エリア */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="max-w-4xl mx-auto bg-white rounded-2xl p-8 md:p-12 shadow-md"
          >
            <div className="flex items-start gap-6 mb-6">
              <div className="relative w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src="/cases/case-03.jpg"
                  alt="関西エリア加盟店"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">異業種からの参入</h3>
                <p className="text-sm text-gray-600">大阪府 / 2024年8月加盟</p>
                <div className="inline-block mt-2 px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                  開業5ヶ月で2棟受注
                </div>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed mb-6">
              不動産業界から転身。建設の知識ゼロから挑戦しました。3週間の研修で商品知識・営業トークを習得。5ヶ月目、初めてのお客様が「高性能なのにこの価格？」と即決。本部の施工サポートで無事竣工。2棟目も紹介で受注できました。業界未経験でもできると実感しています。
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-200">
              <div className="text-center py-2 sm:py-0">
                <p className="text-sm text-gray-500 mb-1">開業5ヶ月売上</p>
                <p className="text-lg font-bold text-revenue-orange">3,800万円</p>
              </div>
              <div className="text-center py-2 sm:py-0">
                <p className="text-sm text-gray-500 mb-1">粗利率</p>
                <p className="text-lg font-bold text-revenue-orange">33%</p>
              </div>
              <div className="text-center py-2 sm:py-0">
                <p className="text-sm text-gray-500 mb-1">開業時人員</p>
                <p className="text-lg font-bold text-gray-900">3名</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
