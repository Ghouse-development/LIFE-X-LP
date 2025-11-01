'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award, TrendingUp, Building2, CheckCircle } from 'lucide-react';

const achievements = [
  {
    icon: Award,
    title: 'ZEH ビルダー登録',
    description: '経済産業省・環境省認定のZEHビルダーとして登録済み',
  },
  {
    icon: Building2,
    title: '全国12拠点展開',
    description: '2023年度 加盟店数前年比150%増',
  },
  {
    icon: TrendingUp,
    title: '年間施工実績100棟超',
    description: '加盟店全体での施工実績（2023年度）',
  },
  {
    icon: CheckCircle,
    title: '顧客満足度98%',
    description: '引き渡し後アンケートでの総合満足度',
  },
];

const certifications = [
  '長期優良住宅対応',
  'ZEH基準適合',
  '耐震等級3取得実績',
  '省エネ等級6対応',
  'BELS評価取得可能',
  '住宅性能表示制度対応',
];

const mediaFeatures = [
  { title: '日経ビジネス', description: 'FC特集記事掲載（2024年2月号）' },
  { title: '住宅産業新聞', description: '新型FCモデルとして紹介（2023年10月）' },
  { title: 'フランチャイズWEBリポート', description: '注目FC企業30選に選出' },
];

export function Authority() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="py-40 px-4 bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">実績と信頼</h2>
          <p className="text-xl md:text-2xl text-gray-600">
            確かな実績と品質保証で安心をお届けします
          </p>
        </motion.div>

        {/* Achievements */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow text-center"
            >
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <achievement.icon className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{achievement.title}</h3>
              <p className="text-sm text-gray-600">{achievement.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gray-50 rounded-3xl p-8 md:p-12 mb-20"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-900">
            住宅性能・認証対応
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.05 }}
                className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow flex items-center"
              >
                <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                <span className="text-gray-800 font-medium text-sm">{cert}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Media Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-8 md:p-12 text-white"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-10">メディア掲載実績</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mediaFeatures.map((media, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                className="text-center"
              >
                <div className="bg-white text-gray-900 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-shadow">
                  <h4 className="text-xl font-bold mb-2">{media.title}</h4>
                  <p className="text-sm text-gray-600">{media.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center border-t border-gray-700 pt-8">
            <p className="text-lg text-gray-300">
              その他、業界専門誌・Webメディアで多数紹介されています
            </p>
          </div>
        </motion.div>

        {/* Trust Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="mt-16 bg-blue-600 rounded-3xl p-8 text-center text-white"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-3">
            10年間で加盟店ゼロ脱落の実績
          </h3>
          <p className="text-lg md:text-xl text-blue-100">
            充実したサポート体制で、すべての加盟店が継続的に成長しています
          </p>
        </motion.div>
      </div>
    </section>
  );
}
