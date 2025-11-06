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
    <Section
      id="faq"
      variant="white"
      spacing="2xl"
      title="よくある質問"
      subtitle="FC加盟に関する疑問にお答えします"
    >
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
              <AccordionTrigger className="text-left font-bold text-[var(--primary)] py-6 hover:no-underline text-base md:text-lg leading-[1.6]">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-[var(--ink)] leading-[1.7] pb-6 text-[15px]">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </Section>
  )
}
