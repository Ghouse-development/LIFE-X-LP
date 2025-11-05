'use client'

import { motion } from 'framer-motion'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Section } from './Section'

interface FAQItem {
  q: string
  a: string
}

interface FAQProps {
  data: FAQItem[]
}

export function FAQ({ data }: FAQProps) {
  return (
    <Section id="faq" variant="white" spacing="2xl">
      <div className="text-center mb-16">
        <motion.h2
          className="font-serif text-3xl md:text-5xl font-bold mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          よくある質問
        </motion.h2>
        <motion.p
          className="text-lg md:text-xl text-[#6B7280] max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          FC加盟に関する疑問にお答えします
        </motion.p>
      </div>

      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <Accordion type="single" collapsible className="space-y-4">
          {data.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border border-gray-200 rounded-2xl px-6 bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <AccordionTrigger className="text-left font-bold py-6 hover:no-underline">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-[#6B7280] leading-relaxed pb-6">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </Section>
  )
}
