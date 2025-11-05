'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Section } from './Section'
import { ArrowRight } from 'lucide-react'

interface ProcessStep {
  step: string
  title: string
  desc: string
  duration: string
  deliverables?: string
  owner?: string
}

interface ProcessProps {
  data: ProcessStep[]
}

export function Process({ data }: ProcessProps) {
  return (
    <Section id="process" variant="light" spacing="2xl">
      <div className="text-center mb-16">
        <motion.h2
          className="font-serif text-3xl md:text-5xl font-bold mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          導入ステップ
        </motion.h2>
        <motion.p
          className="text-lg md:text-xl text-[#6B7280] max-w-[680px] mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          相談から開業まで、スムーズな立上げをサポートします
        </motion.p>
      </div>

      {/* Horizontal Timeline */}
      <div className="relative">
        {/* Timeline line (desktop only) */}
        <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-[#D9B66A]/20" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.15 }}
              className="relative"
            >
              {/* Timeline node */}
              <div className="hidden md:flex absolute top-12 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-[#D9B66A] rounded-full border-4 border-[#F8F9FA] z-10" />

              {/* Card */}
              <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-[0_2px_20px_rgba(0,0,0,0.05)] mt-20 md:mt-16">
                {/* Step Number Badge */}
                <div className="inline-flex items-center justify-center w-12 h-12 bg-[#D9B66A] rounded-full mb-4">
                  <span className="font-serif text-xl font-bold text-white">{step.step}</span>
                </div>

                {/* Title */}
                <h3 className="font-serif text-xl font-bold mb-2">{step.title}</h3>

                {/* Description */}
                <p className="text-sm text-neutral-600 leading-relaxed mb-4">{step.desc}</p>

                {/* Details Grid */}
                <div className="border-t border-black/5 pt-4 space-y-2 text-xs">
                  <div className="flex items-start gap-2">
                    <span className="text-neutral-500 font-medium min-w-[60px]">所要:</span>
                    <span className="text-[#D9B66A] font-medium">{step.duration}</span>
                  </div>
                  {step.deliverables && (
                    <div className="flex items-start gap-2">
                      <span className="text-neutral-500 font-medium min-w-[60px]">成果物:</span>
                      <span className="text-neutral-700">{step.deliverables}</span>
                    </div>
                  )}
                  {step.owner && (
                    <div className="flex items-start gap-2">
                      <span className="text-neutral-500 font-medium min-w-[60px]">責任:</span>
                      <span className="text-neutral-700">{step.owner}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Arrow connector (except last) */}
              {index < data.length - 1 && (
                <div className="hidden md:block absolute top-12 right-0 transform translate-x-1/2 -translate-y-1/2">
                  <ArrowRight className="text-[#D9B66A] w-5 h-5" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}
