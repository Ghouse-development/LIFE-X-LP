'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import Image from 'next/image';
import { trackCTAClick } from '@/lib/events';
import webinarData from '@/content/webinar.json';

export function WebinarCTA() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleCTAClick = () => {
    trackCTAClick('ウェビナーに申し込む', '/webinar');
  };

  return (
    <section ref={ref} className="py-24 px-4 bg-gray-800 text-white">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-block mb-4">
            <div className="w-16 h-16 mx-auto">
              <Image
                src="/icons/calendar-video.svg"
                alt="ウェビナー"
                width={64}
                height={64}
                className="filter invert"
              />
            </div>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold mb-6">{webinarData.title}</h2>
          <p className="text-xl md:text-2xl mb-2 text-blue-100">{webinarData.description}</p>

          <div className="inline-block bg-gray-700 border border-gray-600 rounded-lg px-6 py-4 mt-6">
            <div className="text-sm text-blue-100 mb-1">開催スケジュール</div>
            <div className="text-lg font-medium">
              {webinarData.schedule.frequency} {webinarData.schedule.time}
            </div>
            <div className="text-sm text-blue-100 mt-2">{webinarData.schedule.note}</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          {webinarData.benefits.map((benefit, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl mb-2">✓</div>
              <div className="text-sm leading-relaxed">{benefit}</div>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center"
        >
          <Link
            href="/webinar"
            onClick={handleCTAClick}
            className="inline-block px-12 py-5 bg-white text-gray-800 font-bold text-lg rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
          >
            ウェビナーに申し込む →
          </Link>

          <p className="text-sm text-gray-300 mt-4">
            参加費無料・オンライン開催（Zoom）
          </p>
        </motion.div>
      </div>
    </section>
  );
}
