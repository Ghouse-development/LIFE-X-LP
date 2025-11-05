'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Section } from './Section'
import { Calendar, Clock, Video, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import dayjs from 'dayjs'

interface WebinarProps {
  data: {
    title: string
    frequency: string
    time: string
    platform: string
    nextDates: string[]
    agenda: Array<{
      time: string
      title: string
      description: string
    }>
    benefits: string[]
  }
}

export function Webinar({ data }: WebinarProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'short',
    })
  }

  // Calculate days until next webinar
  const getDaysUntilNext = (dateString: string) => {
    const now = dayjs()
    const next = dayjs(dateString)
    const days = next.diff(now, 'day')
    return days
  }

  const nextWebinarDate = data.nextDates[0]
  const daysUntil = getDaysUntilNext(nextWebinarDate)

  return (
    <Section
      id="webinar"
      variant="white"
      spacing="2xl"
      title={data.title}
      subtitle="オンラインで30分、事業概要と収益モデルを解説します"
    >
      {/* Days Until Badge */}
      {daysUntil >= 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.05 }}
          className="inline-block mb-8 flex justify-center"
        >
          <div className="bg-[var(--brand)] text-white px-6 py-2 rounded-full font-bold text-sm tracking-wide shadow-md">
            直近開催まで あと{daysUntil}日
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Schedule */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <Card className="h-full border-2 border-[var(--brand)]/20 shadow-lg">
            <CardContent className="p-8">
              <h3 className="font-bold text-2xl text-[var(--primary)] mb-6">開催スケジュール</h3>

              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-[var(--brand)] flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium text-sm text-[var(--ink-muted)] mb-1">開催頻度</p>
                    <p className="font-bold text-[var(--ink-strong)]">{data.frequency}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[var(--brand)] flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium text-sm text-[var(--ink-muted)] mb-1">時間</p>
                    <p className="font-bold text-[var(--ink-strong)]">{data.time}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Video className="w-5 h-5 text-[var(--brand)] flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium text-sm text-[var(--ink-muted)] mb-1">プラットフォーム</p>
                    <p className="font-bold text-[var(--ink-strong)]">{data.platform}</p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <p className="font-medium text-sm text-[var(--ink-muted)] mb-3">次回開催日</p>
                <div className="space-y-2">
                  {data.nextDates.slice(0, 3).map((date) => (
                    <div key={date} className="bg-[var(--brand)]/5 p-3 rounded-lg">
                      <p className="text-sm font-medium text-[var(--ink-strong)]">{formatDate(date)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Agenda */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <Card className="h-full border-0 shadow-lg">
            <CardContent className="p-8">
              <h3 className="font-bold text-2xl text-[var(--primary)] mb-6">アジェンダ</h3>

              <div className="space-y-4">
                {data.agenda.map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-[var(--brand)]/10 rounded-lg flex items-center justify-center">
                      <span className="text-sm font-bold text-[var(--brand)]">{item.time}</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-[var(--ink-strong)] mb-1">{item.title}</h4>
                      <p className="text-sm text-[var(--ink)]">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Benefits */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="max-w-[680px] mx-auto leading-relaxed"
      >
        <Card className="bg-[var(--brand)]/5 border-0">
          <CardContent className="p-8">
            <h3 className="font-bold text-xl text-[var(--primary)] mb-6 text-center">参加メリット</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {data.benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[var(--brand)] flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-[var(--ink)]">{benefit}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* CTA */}
      <div className="text-center mt-10">
        <Button
          asChild
          variant="primary"
          size="lg"
          data-gtm="cta_webinar_register"
        >
          <Link href="#contact">次回ウェビナーに申し込む</Link>
        </Button>
        <p className="text-sm text-[var(--ink-muted)] mt-4">※録画視聴も可能です</p>
      </div>
    </Section>
  )
}
