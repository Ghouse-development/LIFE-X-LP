'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import testimonialsData from '@/content/testimonials.json';

export function Testimonials() {
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
          <h2 className="text-4xl md:text-6xl font-bold mb-6">{testimonialsData.title}</h2>
          <p className="text-xl md:text-2xl text-gray-600">{testimonialsData.subtitle}</p>
        </motion.div>

        <div className="space-y-16">
          {testimonialsData.testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-gray-50 rounded-3xl p-8 md:p-12 shadow-lg"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                {/* Left: Image & Profile */}
                <div className="text-center md:text-left">
                  <div className="relative aspect-square w-40 h-40 mx-auto md:mx-0 mb-6 rounded-2xl overflow-hidden shadow-xl">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                      sizes="160px"
                    />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-gray-900">{testimonial.name}</h3>
                    <p className="text-base text-gray-600">{testimonial.position}</p>
                    <p className="text-sm text-gray-500">{testimonial.company}</p>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                    <div className="inline-block mt-3 px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                      {testimonial.achievement}
                    </div>
                  </div>
                </div>

                {/* Middle: Comment */}
                <div className="md:col-span-2 space-y-6">
                  <p className="text-lg md:text-xl leading-relaxed text-gray-700">
                    「{testimonial.comment}」
                  </p>

                  {/* Metrics */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-200">
                    {Object.entries(testimonial.metrics).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <p className="text-sm text-gray-500 mb-1 uppercase tracking-wider">
                          {key === 'revenue' && '売上'}
                          {key === 'profit' && '利益'}
                          {key === 'staff' && '人員'}
                          {key === 'inquiries' && '問い合わせ'}
                          {key === 'contracts' && '成約率'}
                        </p>
                        <p className="text-base md:text-lg font-semibold text-gray-900">
                          {value}
                        </p>
                      </div>
                    ))}
                  </div>

                  <p className="text-sm text-gray-500">
                    加盟日: {testimonial.joinedDate}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
