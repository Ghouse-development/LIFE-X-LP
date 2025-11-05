import { Metadata } from 'next'
import { SiteHeader } from '@/components/fc/SiteHeader'
import { Hero } from '@/components/fc/Hero'
import { FloatingCTA } from '@/components/fc/FloatingCTA'
import { Concept } from '@/components/fc/Concept'
import { ValueGrid } from '@/components/fc/ValueGrid'
import { Performance } from '@/components/fc/Performance'
import { Gallery } from '@/components/fc/Gallery'
import { Process } from '@/components/fc/Process'
import { SupportTable } from '@/components/fc/SupportTable'
import { Testimonials } from '@/components/fc/Testimonials'
import { Map } from '@/components/fc/Map'
import { Webinar } from '@/components/fc/Webinar'
import { FAQ } from '@/components/fc/FAQ'
import { ContactForm } from '@/components/fc/ContactForm'
import { SiteFooter } from '@/components/fc/SiteFooter'
import { Toaster } from '@/components/ui/toaster'

// データ読み込み
import fcData from '@/data/fc.json'

export const metadata: Metadata = {
  title: 'LIFE X フランチャイズ | 少人数×短期立上げで始める高性能規格住宅',
  description:
    '商品・設計・現場・集客の「型」を提供。最小2名・初期投資300万円〜で始められるスモールスタートFC。毎月ウェビナー開催、まずは30分で概要相談。',
  keywords: [
    'フランチャイズ',
    '工務店',
    '高性能住宅',
    'FC加盟',
    '規格住宅',
    'LIFE X',
    'スモールスタート',
  ],
  openGraph: {
    title: 'LIFE X フランチャイズ | 少人数×短期立上げで始める高性能規格住宅',
    description:
      '商品・設計・現場・集客の「型」を提供。最小2名・初期投資300万円〜で始められるスモールスタートFC。',
    type: 'website',
    locale: 'ja_JP',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LIFE X フランチャイズ',
    description:
      '少人数×短期立上げで始める高性能規格住宅。最小2名・初期投資300万円〜でスタート可能。',
  },
}

export default function FCPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <SiteHeader />

      {/* Hero */}
      <Hero data={fcData.hero} />

      {/* Floating CTA */}
      <FloatingCTA />

      {/* Concept */}
      <Concept />

      {/* Value & KPI */}
      <ValueGrid
        data={{
          reasons: fcData.reasons,
          kpi: fcData.kpi,
        }}
      />

      {/* Performance */}
      <Performance data={fcData.performance} />

      {/* Gallery */}
      <Gallery data={fcData.gallery} />

      {/* Process */}
      <Process data={fcData.process} />

      {/* Support */}
      <SupportTable data={fcData.support} />

      {/* Testimonials */}
      <Testimonials data={fcData.testimonials} />

      {/* Map */}
      <Map data={fcData.areas} />

      {/* Webinar */}
      <Webinar data={fcData.webinar} />

      {/* FAQ */}
      <FAQ data={fcData.faq} />

      {/* Contact Form */}
      <ContactForm />

      {/* Footer */}
      <SiteFooter />

      {/* Toast */}
      <Toaster />
    </div>
  )
}
