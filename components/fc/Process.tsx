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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        {data.map((step, index) => (
          <div key={step.step} className="relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.15 }}
            >
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  {/* Step Number */}
                  <div className="w-16 h-16 bg-[#D9B66A] rounded-full flex items-center justify-center mb-6">
                    <span className="font-serif text-2xl font-bold text-white">
                      {step.step}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-2xl font-bold mb-3">{step.title}</h3>

                  {/* Description */}
                  <p className="text-[#6B7280] leading-relaxed mb-4">{step.desc}</p>

                  {/* Duration */}
                  <div className="flex items-center gap-2 text-sm text-[#D9B66A]">
                    <span className="font-medium">{step.duration}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Arrow (except last item) */}
            {index < data.length - 1 && (
              <div className="hidden md:flex absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                <ArrowRight className="text-[#D9B66A] w-8 h-8" />
              </div>
            )}
          </div>
        ))}
      </div>
    </Section>
  )
}
