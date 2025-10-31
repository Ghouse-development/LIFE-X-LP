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
          className="object-cover opacity-40"
          sizes="100vw"
          quality={90}
        />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
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

        <p className="text-base md:text-lg mb-10 leading-relaxed max-w-2xl mx-auto">
          {hero.description}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {hero.cta.map((cta, index) => (
            <Link
              key={index}
              href={cta.href}
              onClick={() => handleCTAClick(cta.label, cta.href)}
              className={`
                px-8 py-3 rounded-lg font-medium text-base transition-all duration-300
                ${
                  cta.variant === 'primary'
                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
                    : 'bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm border border-white/30'
                }
              `}
            >
              {cta.label}
            </Link>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
