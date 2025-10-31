'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

const warranties = [
  {
    icon: 'house-shield',
    title: '構造保証',
    period: '20年',
    description: '主要構造部の保証で、長期にわたる安心を提供します。',
  },
  {
    icon: 'tools',
    title: 'アフターサポート',
    period: '10年',
    description: '定期点検と迅速な対応で、住まいの価値を守ります。',
  },
  {
    icon: 'handshake',
    title: 'FC継続支援',
    period: '無期限',
    description: '商品・集客・運営の全領域で、本部が継続的に支援します。',
  },
];

export function WarrantySupport() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="py-24 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            保証・サポート体制
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            長期的な安心と成長をサポートする体制を整えています。
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {warranties.map((warranty, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              {/* Icon Circle */}
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <Image
                  src={`/icons/${warranty.icon}.svg`}
                  alt={warranty.title}
                  width={56}
                  height={56}
                />
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold mb-2">{warranty.title}</h3>

              {/* Period - Large */}
              <div className="inline-block bg-gray-800 text-white rounded-lg py-3 px-8 mb-4">
                <span className="text-3xl font-bold">{warranty.period}</span>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed">
                {warranty.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-gray-500">
            ※詳細は契約時にご確認ください。保証内容は物件により異なる場合があります。
          </p>
        </motion.div>
      </div>
    </section>
  );
}
