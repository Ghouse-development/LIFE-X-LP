'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import Image from 'next/image';

const steps = [
  {
    number: '01',
    title: '相談',
    description: 'まずは30分の概要相談。事業内容と疑問点を確認します。NDA締結後、詳細資料を提供。',
  },
  {
    number: '02',
    title: '商品・運用レクチャ',
    description: 'LIFE X の仕様、設計の型、集客手法を詳しく解説。実際の事例データも共有します。',
  },
  {
    number: '03',
    title: 'エリア調査',
    description: 'ご希望エリアの市場調査と競合分析。テリトリーの可否を確認し、事業計画を策定。',
  },
  {
    number: '04',
    title: '契約',
    description: 'FC契約締結。加盟金・ロイヤリティ等の条件を確定し、正式にスタート。',
  },
  {
    number: '05',
    title: 'モデル・広告立上げ',
    description: 'モデルハウスの企画・建築、Web広告の初期設定を本部がサポート。',
  },
  {
    number: '06',
    title: '初回着工',
    description: '初回顧客の着工。現場管理・施工品質を本部が伴走し、標準化を定着させます。',
  },
];

export function Flow() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? steps.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === steps.length - 1 ? 0 : prev + 1));
  };

  return (
    <section ref={ref} className="py-40 px-4 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-pg-5"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">導入の流れ</h2>
          <p className="text-gray-300 text-lg">
            契約から最短3〜6ヶ月で開業。6ステップで着実に立ち上げます。
          </p>
        </motion.div>

        {/* 図解: 導入フロー全体像 - 巨大化 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-16 max-w-6xl mx-auto"
        >
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl border-2 border-gray-700">
            <Image
              src="/cases/case-06.jpg"
              alt="LIFE X 導入フロー図解"
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </div>
          <p className="text-base text-gray-300 text-center mt-6 font-medium">
            スマートホーム機能を標準装備した最新の住宅システム
          </p>
        </motion.div>

        {/* Desktop: Horizontal layout - Text Focus */}
        <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-6 gap-pg">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative bg-gray-800 rounded-lg p-pg-4 border border-gray-700 hover:border-gray-600 transition-colors duration-300"
            >
              {/* Step Number - Large */}
              <div className="text-5xl font-bold text-gray-400 mb-4">{step.number}</div>

              {/* Title */}
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>

              {/* Description */}
              <p className="text-sm text-gray-300 leading-relaxed">{step.description}</p>

              {/* Arrow Connector */}
              {index < steps.length - 1 && (
                <div className="absolute top-1/2 -right-3 transform -translate-y-1/2 text-gray-500 text-2xl hidden lg:block">
                  →
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Mobile: Carousel - Text Focus */}
        <div className="md:hidden">
          <div className="relative rounded-lg overflow-hidden bg-gray-800 border border-gray-700">
            {/* Content */}
            <div className="p-pg-4">
              {/* Step Number */}
              <div className="text-6xl font-bold text-gray-400 mb-4">{steps[currentIndex].number}</div>

              {/* Title */}
              <h3 className="text-2xl font-bold mb-4">{steps[currentIndex].title}</h3>

              {/* Description */}
              <p className="text-gray-300 leading-relaxed">{steps[currentIndex].description}</p>
            </div>
          </div>

          <div className="flex items-center justify-between mt-6">
            <button
              onClick={handlePrev}
              className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
              aria-label="前へ"
            >
              ← 前へ
            </button>

            <div className="flex gap-2">
              {steps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex ? 'bg-gray-500' : 'bg-gray-700'
                  }`}
                  aria-label={`ステップ ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
              aria-label="次へ"
            >
              次へ →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
