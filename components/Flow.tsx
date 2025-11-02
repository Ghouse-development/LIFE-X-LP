'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';

const steps = [
  {
    number: '01',
    title: '相談',
    description: '30分の概要相談から開始',
  },
  {
    number: '02',
    title: '契約・研修',
    description: '契約締結後、商品・設計・集客の型を習得',
  },
  {
    number: '03',
    title: '開業',
    description: '3〜6ヶ月で初回着工、本部が全面伴走',
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
    <section ref={ref} className="py-40 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900">導入の流れ</h2>
          <p className="text-xl md:text-2xl text-gray-600">
            3ステップ、3〜6ヶ月で開業
          </p>
        </motion.div>

        {/* Desktop: Horizontal layout - Text Focus */}
        <div className="hidden md:grid md:grid-cols-3 gap-pg">
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

        {/* サポート・保証内容 - 競合分析から追加 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-20 bg-blue-50 rounded-3xl p-8 md:p-12 border border-blue-100"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-900">
            充実のサポート体制
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-pg-blue rounded-full flex items-center justify-center text-white text-2xl font-bold">
                ✓
              </div>
              <h4 className="font-bold text-lg mb-2 text-gray-900">毎月ウェビナー開催</h4>
              <p className="text-sm text-gray-600">
                最新の営業ノウハウ、施工事例、集客手法を毎月共有。オンラインで全国から参加可能。
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-pg-blue rounded-full flex items-center justify-center text-white text-2xl font-bold">
                ✓
              </div>
              <h4 className="font-bold text-lg mb-2 text-gray-900">施工サポート</h4>
              <p className="text-sm text-gray-600">
                設計図面の提供、施工マニュアル完備、現場管理のサポート。本部が遠隔でバックアップ。
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-pg-blue rounded-full flex items-center justify-center text-white text-2xl font-bold">
                ✓
              </div>
              <h4 className="font-bold text-lg mb-2 text-gray-900">集客支援</h4>
              <p className="text-sm text-gray-600">
                営業資料・チラシのテンプレート提供、WEBサイト構築支援、SNS運用アドバイス。
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
