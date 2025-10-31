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
    image: '/cases/case-23.jpg',
  },
  {
    number: '02',
    title: '商品・運用レクチャ',
    description: 'LIFE X の仕様、設計の型、集客手法を詳しく解説。実際の事例データも共有します。',
    image: '/cases/case-24.jpg',
  },
  {
    number: '03',
    title: 'エリア調査',
    description: 'ご希望エリアの市場調査と競合分析。テリトリーの可否を確認し、事業計画を策定。',
    image: '/cases/case-25.jpg',
  },
  {
    number: '04',
    title: '契約',
    description: 'FC契約締結。加盟金・ロイヤリティ等の条件を確定し、正式にスタート。',
    image: '/cases/case-26.jpg',
  },
  {
    number: '05',
    title: 'モデル・広告立上げ',
    description: 'モデルハウスの企画・建築、Web広告の初期設定を本部がサポート。',
    image: '/cases/case-27.jpg',
  },
  {
    number: '06',
    title: '初回着工',
    description: '初回顧客の着工。現場管理・施工品質を本部が伴走し、標準化を定着させます。',
    image: '/cases/case-28.jpg',
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
    <section ref={ref} className="py-24 px-4 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">導入の流れ</h2>
          <p className="text-gray-300 text-lg">
            契約から最短3〜6ヶ月で開業。6ステップで着実に立ち上げます。
          </p>
        </motion.div>

        {/* Desktop: Horizontal layout */}
        <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-6 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              {/* Image */}
              <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 16vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
                <div className="absolute bottom-2 left-2 text-4xl font-bold text-white/80">
                  {step.number}
                </div>
              </div>

              <h3 className="text-lg font-bold mb-2">{step.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{step.description}</p>

              {index < steps.length - 1 && (
                <div className="absolute top-24 -right-3 w-6 h-0.5 bg-blue-500/30 hidden lg:block" />
              )}
            </motion.div>
          ))}
        </div>

        {/* Mobile: Carousel */}
        <div className="md:hidden">
          <div className="relative rounded-lg overflow-hidden">
            {/* Image Background */}
            <div className="relative h-64">
              <Image
                src={steps[currentIndex].image}
                alt={steps[currentIndex].title}
                fill
                className="object-cover"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent" />
              <div className="absolute bottom-4 left-4 text-6xl font-bold text-white/80">
                {steps[currentIndex].number}
              </div>
            </div>

            {/* Content */}
            <div className="bg-gray-800 p-6">
              <h3 className="text-2xl font-bold mb-3">{steps[currentIndex].title}</h3>
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
                    index === currentIndex ? 'bg-blue-500' : 'bg-gray-600'
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
