import { Metadata } from 'next'
import { SiteHeader } from '@/components/fc/SiteHeader'
import { Hero } from '@/components/fc/Hero'
import { Subnav } from '@/components/fc/Subnav'
import { FloatingCTA } from '@/components/fc/FloatingCTA'
import { Concept } from '@/components/fc/Concept'
import { Comparison } from '@/components/fc/Comparison'
import { FourReasons } from '@/components/fc/FourReasons'
import { Reproducibility } from '@/components/fc/Reproducibility'
import { ValueGrid } from '@/components/fc/ValueGrid'
import { Performance } from '@/components/fc/Performance'
import { StandardEquipment } from '@/components/fc/StandardEquipment'
import { TrustAndSupport } from '@/components/fc/TrustAndSupport'
import { Gallery } from '@/components/fc/Gallery'
import { DesignGallery } from '@/components/fc/DesignGallery'
import { Process } from '@/components/fc/Process'
import { SupportTable } from '@/components/fc/SupportTable'
import { Testimonials } from '@/components/fc/Testimonials'
import { Map } from '@/components/fc/Map'
import { ConsultationWebinar } from '@/components/fc/ConsultationWebinar'
import { FAQ } from '@/components/fc/FAQ'
import { ContactForm } from '@/components/fc/ContactForm'
import { SiteFooter } from '@/components/fc/SiteFooter'
import { StructuredData } from '@/components/fc/StructuredData'
import { Toaster } from '@/components/ui/toaster'

// データ読み込み
import fcData from '@/data/fc.json'

export const metadata: Metadata = {
  title: 'LIFE X フランチャイズ | 設計負担削減・粗利安定化の高性能規格住宅FC',
  description:
    '建築家デザイン×HEAT20 G2相当×耐震等級3。営業・設計工数削減で成約率向上。最小2名・初期投資300万円〜、3-6ヶ月で立ち上げ。無料資料請求・30分説明会受付中。',
  keywords: [
    'LIFE X',
    'フランチャイズ',
    '工務店FC',
    '高性能住宅',
    '規格住宅',
    'HEAT20 G2',
    '建築家デザイン',
    '耐震等級3',
    'スモールスタート',
    '設計負担削減',
  ],
  openGraph: {
    title: 'LIFE X フランチャイズ | 設計負担削減・粗利安定化の高性能規格住宅FC',
    description:
      '建築家デザイン×HEAT20 G2相当×耐震等級3。営業・設計工数削減で成約率向上。最小2名・初期投資300万円〜で3-6ヶ月で立ち上げ可能。',
    type: 'website',
    locale: 'ja_JP',
    siteName: 'LIFE X',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LIFE X フランチャイズ | 高性能規格住宅FC',
    description:
      '設計負担削減・粗利安定化。建築家デザイン×HEAT20 G2×耐震等級3。最小2名・初期投資300万円〜。',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function FCPage() {
  return (
    <div className="min-h-screen">
      {/* Structured Data for SEO */}
      <StructuredData />

      {/* Header */}
      <SiteHeader />

      {/* Hero */}
      <Hero />

      {/* Subnav */}
      <Subnav />

      {/* Floating CTA */}
      <FloatingCTA />

      {/* Concept */}
      <Concept />

      {/* Comparison (Building Type Positioning) */}
      <Comparison />

      {/* Four Reasons */}
      <FourReasons />

      {/* Reproducibility Mechanism */}
      <Reproducibility />

      {/* Value & KPI */}
      <ValueGrid
        data={{
          reasons: fcData.reasons,
          kpi: fcData.kpi,
        }}
      />

      {/* Performance */}
      <Performance data={fcData.performance} />

      {/* Standard Equipment */}
      <StandardEquipment />

      {/* Trust & Support */}
      <TrustAndSupport />

      {/* Gallery */}
      <Gallery data={fcData.gallery} />

      {/* Design Gallery (Exterior Perspectives) */}
      <DesignGallery />

      {/* Process */}
      <Process data={fcData.process} />

      {/* Support */}
      <SupportTable data={fcData.support} />

      {/* Testimonials */}
      <Testimonials data={fcData.testimonials} />

      {/* Map */}
      <Map data={fcData.areas} />

      {/* Consultation & Webinar */}
      <ConsultationWebinar />

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
