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
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image with overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={assetsData.hero.src}
          alt={assetsData.hero.alt}
          fill
          priority
          className="object-cover"
          sizes="100vw"
          quality={90}
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          {hero.title}
          <br />
          <span className="text-2xl md:text-4xl font-normal mt-2 block">
            {hero.subtitle}
          </span>
        </h1>

        <p className="text-lg md:text-xl mb-12 leading-relaxed max-w-2xl mx-auto">
          {hero.description}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {hero.cta.map((cta, index) => (
            <Link
              key={index}
              href={cta.href}
              onClick={() => handleCTAClick(cta.label, cta.href)}
              className={`
                px-8 py-4 rounded-lg font-medium text-lg transition-all duration-300
                ${
                  cta.variant === 'primary'
                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
                    : 'bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm border border-white/40'
                }
              `}
            >
              {cta.label}
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1.5 h-1.5 bg-white rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}
