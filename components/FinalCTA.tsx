'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import Image from 'next/image';
import { trackCTAClick, trackContactClick } from '@/lib/events';
import siteData from '@/content/site.json';

export function FinalCTA() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handlePhoneClick = () => {
    trackContactClick('phone', siteData.phone);
  };

  const handleFormClick = () => {
    trackCTAClick('資料請求・相談フォーム', '#lead-form');
  };

  const handleWebinarClick = () => {
    trackCTAClick('ウェビナー申込', '/webinar');
  };

  return (
    <section ref={ref} className="relative py-24 px-4 text-white overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/cases/case-55.jpg"
          alt="お問い合わせ背景"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/95 to-black/95" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            まずはお気軽にご相談ください
          </h2>
          <p className="text-xl text-gray-300 mb-12 leading-relaxed max-w-2xl mx-auto">
            加盟金・収益モデル・支援内容など、
            <br className="hidden md:block" />
            詳細は個別面談またはウェビナーでご説明いたします。
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          {/* Phone */}
          <a
            href={`tel:${siteData.phone}`}
            onClick={handlePhoneClick}
            className="bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-8 transition-all duration-300 hover:scale-105"
          >
            <div className="w-12 h-12 mx-auto mb-4">
              <Image
                src="/icons/phone-mail.svg"
                alt="電話"
                width={48}
                height={48}
                className="filter invert"
              />
            </div>
            <div className="font-bold text-lg mb-2">お電話でのお問い合わせ</div>
            <div className="text-2xl font-bold text-blue-400 mb-2">{siteData.phone}</div>
            <div className="text-sm text-gray-400">平日 9:00〜18:00</div>
          </a>

          {/* Lead Form */}
          <Link
            href="#lead-form"
            onClick={handleFormClick}
            className="bg-blue-600 hover:bg-blue-700 border border-blue-500 rounded-lg p-8 transition-all duration-300 hover:scale-105 shadow-xl"
          >
            <div className="w-12 h-12 mx-auto mb-4">
              <Image
                src="/icons/phone-mail.svg"
                alt="資料請求"
                width={48}
                height={48}
                className="filter invert"
              />
            </div>
            <div className="font-bold text-lg mb-2">資料請求・相談フォーム</div>
            <div className="text-sm text-blue-100">
              24時間受付
              <br />
              1営業日以内に返信
            </div>
          </Link>

          {/* Webinar */}
          <Link
            href="/webinar"
            onClick={handleWebinarClick}
            className="bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-8 transition-all duration-300 hover:scale-105"
          >
            <div className="w-12 h-12 mx-auto mb-4">
              <Image
                src="/icons/calendar-video.svg"
                alt="ウェビナー"
                width={48}
                height={48}
                className="filter invert"
              />
            </div>
            <div className="font-bold text-lg mb-2">ウェビナー申込</div>
            <div className="text-sm text-gray-400">
              毎月開催
              <br />
              オンライン30分
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
