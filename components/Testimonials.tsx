'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const testimonials = [
  {
    quote: 'コスパの高さに驚きました！',
    detail: '他社と比較して、同じ予算で高性能住宅が建てられました。ZEH基準を超える断熱性能で、光熱費も大幅削減。',
    author: '関西エリア A社様',
  },
  {
    quote: '商品力が圧倒的です',
    detail: '耐震等級3相当で、お客様への提案がしやすい。設計の型があるので、短期間で高品質な住宅を提供できます。',
    author: '中部エリア B社様',
  },
  {
    quote: '集客支援が心強い',
    detail: 'Web広告の運用マニュアルと月次レビューで、開業3ヶ月で8棟の契約を獲得。少人数でも回せる仕組みです。',
    author: '九州エリア C社様',
  },
];

export function Testimonials() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="py-24 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-gray-600 font-semibold text-sm mb-2 uppercase tracking-wider">Testimonials</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            多くの加盟店が<br className="md:hidden" />
            「コスパの高さに驚いた！」
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            予算内でもっと価値のある事業を。<br />
            LIFE X フランチャイズなら実現できます。
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow"
            >
              {/* Quote Icon */}
              <div className="text-5xl text-gray-300 mb-4 leading-none">&ldquo;</div>

              {/* Main Quote */}
              <h3 className="text-xl font-bold mb-4 text-gray-900">
                {testimonial.quote}
              </h3>

              {/* Detail */}
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                {testimonial.detail}
              </p>

              {/* Author */}
              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm font-medium text-gray-500">
                  {testimonial.author}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 mb-4">
            実際の事例や収益モデルは、個別面談またはウェビナーでご説明します。
          </p>
        </motion.div>
      </div>
    </section>
  );
}
