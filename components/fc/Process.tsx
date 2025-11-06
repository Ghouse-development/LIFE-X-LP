'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Section } from './Section'
import { ArrowRight } from 'lucide-react'

interface ProcessStep {
  step: string
  title: string
  desc: string
  duration?: string
  deliverables?: string
  owner?: string
}

interface ProcessProps {
  data: ProcessStep[]
}

export function Process({ data }: ProcessProps) {
  return (
    <Section
      id="process"
      variant="light"
      spacing="2xl"
      title="導入ステップ"
      subtitle="相談から開業まで、スムーズな立上げをサポートします"
    >
      {/* Horizontal Timeline */}
      <div className="relative">
        {/* Timeline line (desktop only) */}
        <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-[var(--brand)]/20" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {data.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.15 }}
              className="relative flex flex-col"
            >
              {/* Timeline node */}
              <div className="hidden md:flex absolute top-12 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-[var(--brand)] rounded-full border-4 border-[var(--surface-alt)] z-10" />

              {/* Card */}
              <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-[0_2px_20px_rgba(0,0,0,0.05)] mt-20 md:mt-16 flex flex-col h-full">
                {/* Step Number Badge */}
                <div className="inline-flex items-center justify-center w-12 h-12 bg-[var(--brand)] rounded-full mb-4">
                  <span className="font-serif text-xl font-bold text-white">{step.step}</span>
                </div>

                {/* Title */}
                <h3 className="font-serif text-xl font-bold text-[var(--primary)] mb-2">{step.title}</h3>

                {/* Description */}
                <p className="text-sm text-[var(--ink)] leading-relaxed flex-1">{step.desc}</p>
              </div>

              {/* Arrow connector (except last) */}
              {index < data.length - 1 && (
                <div className="hidden md:block absolute top-12 right-0 transform translate-x-1/2 -translate-y-1/2">
                  <ArrowRight className="text-[var(--brand)] w-5 h-5" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}
