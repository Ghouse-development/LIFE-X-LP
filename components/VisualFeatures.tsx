'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

// PG HOUSE風にシンプルに4つに厳選
const features = [
  {
    title: '開放感あふれる大空間リビング',
    description: '高い天井と大きな窓が生み出す、明るく広々とした空間。家族が自然と集まる心地よい場所。',
    image: '/cases/case-08.jpg',
    reverse: false,
  },
  {
    title: '機能美を追求したキッチン',
    description: '使いやすさとデザイン性を両立。料理が楽しくなる、洗練されたキッチン空間。',
    image: '/cases/case-10.jpg',
    reverse: true,
  },
  {
    title: '上質な眠りを約束する寝室',
    description: '静かで落ち着いた雰囲気。高い断熱性能と遮音性で、質の高い睡眠環境を実現。',
    image: '/cases/case-12.jpg',
    reverse: false,
  },
  {
    title: '美しく機能的な外観デザイン',
    description: 'シンプルながら存在感のある外観。耐久性と美しさを兼ね備えた外装材を使用。',
    image: '/cases/case-01.jpg',
    reverse: true,
  },
];

export function VisualFeatures() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="py-32 px-4 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-pg-5"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            こだわりの住空間
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            細部まで考え抜かれた設計と、高品質な素材。
            <br className="hidden md:block" />
            毎日の暮らしを豊かにする、上質な住まいをご提案します。
          </p>
        </motion.div>

        <div className="space-y-pg-5">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`flex flex-col ${
                feature.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'
              } gap-pg items-center`}
            >
              {/* Image */}
              <div className="w-full lg:w-1/2">
                <div className="relative aspect-[4/3] rounded overflow-hidden shadow-lg">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="w-full lg:w-1/2 space-y-pg-4">
                <div className="inline-block">
                  <span className="text-gray-600 font-bold text-sm tracking-wider uppercase">
                    Feature {index + 1}
                  </span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold leading-tight">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {feature.description}
                </p>
                <div className="pt-4">
                  <div className="inline-flex items-center text-gray-600 font-medium hover:text-gray-700 transition-colors cursor-pointer group">
                    <span>詳しく見る</span>
                    <svg
                      className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
