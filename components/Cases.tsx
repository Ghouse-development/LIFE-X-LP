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
          <div className="relative aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl">
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16">
            <div className="text-center">
              <div className="text-sm md:text-base font-medium text-gray-500 uppercase tracking-wider mb-3">
                気密性
              </div>
              <div className="text-5xl md:text-7xl font-bold text-gray-900 mb-2">
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
              <div className="text-5xl md:text-7xl font-bold text-gray-900 mb-2">
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
              <div className="text-5xl md:text-7xl font-bold text-gray-900 mb-2">
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
      </div>
    </section>
  );
}
