'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { trackCTAClick } from '@/lib/events';
import assetsData from '@/content/assets.json';
import siteData from '@/content/site.json';

export function Hero() {
  const { hero } = siteData;

  const handleCTAClick = (label: string, href: string) => {
    trackCTAClick(label, href);
  };

  return (
    <section className="relative py-32 px-4 flex items-center justify-center overflow-hidden bg-gray-900">
      {/* Background Image with overlay - PG HOUSE style */}
      <div className="absolute inset-0 z-0">
        <Image
          src={assetsData.hero.src}
          alt={assetsData.hero.alt}
          fill
          priority
          className="object-cover opacity-30"
          sizes="100vw"
          quality={90}
        />
        {/* Dark gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-10 max-w-4xl mx-auto text-center text-white"
      >
        <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
          {hero.title}
          <br />
          <span className="text-xl md:text-3xl font-normal mt-2 block">
            {hero.subtitle}
          </span>
        </h1>

        <p className="text-base md:text-lg mb-6 leading-relaxed max-w-2xl mx-auto">
          {hero.description}
        </p>

        {/* Trust Indicators - 競合分析から追加 */}
        <div className="mb-8 flex flex-wrap items-center justify-center gap-4 md:gap-6 text-sm md:text-base">
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2">
            <span className="text-blue-400 font-bold">12</span>
            <span>加盟店</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2">
            <span className="text-blue-400 font-bold">4.2</span>
            <span>満足度</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2">
            <span className="text-blue-400 font-bold">3〜6ヶ月</span>
            <span>開業</span>
          </div>
        </div>

        {/* Problem Statement - シンプル1文 */}
        {hero.problems && hero.problems.length > 0 && (
          <div className="mb-8 max-w-3xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg px-6 py-4">
              <p className="text-lg md:text-xl text-center">
                <span className="text-red-400 mr-2">✗</span>
                {hero.problems[0]}
              </p>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {hero.cta.map((cta, index) => (
            <Link
              key={index}
              href={cta.href}
              onClick={() => handleCTAClick(cta.label, cta.href)}
              className={`
                px-10 py-4 rounded-lg font-bold text-lg transition-all duration-300 hover:scale-105
                ${
                  cta.variant === 'primary'
                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-2xl hover:shadow-blue-500/50'
                    : 'bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm border-2 border-white/50 shadow-lg'
                }
              `}
            >
              {cta.label}
            </Link>
          ))}
        </div>

        {/* CTA下の補足文 - 競合分析から */}
        <p className="mt-4 text-sm text-white/80">
          参加費無料・オンライン開催 / 電話・メールでのご相談も受付中
        </p>

        {/* 安心感・限定性の追加 */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 max-w-2xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="flex items-center justify-center gap-2 bg-green-600/20 backdrop-blur-sm border border-green-500/40 rounded-lg px-4 py-3">
              <span className="text-green-400 text-lg">✓</span>
              <span className="text-white/90">初年度売上未達なら研修費返金</span>
            </div>
            <div className="flex items-center justify-center gap-2 bg-amber-600/20 backdrop-blur-sm border border-amber-500/40 rounded-lg px-4 py-3">
              <span className="text-amber-400 text-lg">⚠</span>
              <span className="text-white/90">募集エリア残りわずか</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
