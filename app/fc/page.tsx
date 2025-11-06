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
import { Pricing } from '@/components/fc/Pricing'
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
  metadataBase: new URL('https://life-x-lp.vercel.app'),
  title: 'LIFE X',
  description:
    '規格住宅の美しさと再現性を、あなたの商圏の武器に。設計・打合せの負担を抑え、短期立上げを実現するLIFE X。',
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
  alternates: {
    canonical: '/fc',
  },
  openGraph: {
    title: 'LIFE X',
    description:
      '規格住宅の美しさと再現性を、あなたの商圏の武器に。',
    url: '/fc',
    type: 'website',
    locale: 'ja_JP',
    siteName: 'LIFE X',
    images: [
      {
        url: '/cases/case-08.jpg',
        width: 1200,
        height: 630,
        alt: 'LIFE X 規格住宅の外観',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LIFE X',
    description:
      '規格住宅の美しさと再現性を、あなたの商圏の武器に。',
    images: ['/cases/case-08.jpg'],
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

      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-4 focus:left-4 focus:px-4 focus:py-2 focus:bg-white focus:text-[var(--primary)] focus:rounded focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
      >
        メインコンテンツへスキップ
      </a>

      {/* Header */}
      <SiteHeader />

      {/* Hero */}
      <Hero />

      {/* Subnav */}
      <Subnav />

      {/* Floating CTA */}
      <FloatingCTA />

      {/* Main Content */}
      <main id="main-content">
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
        }}
      />

      {/* Pricing */}
      <Pricing />

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
      </main>

      {/* Footer */}
      <SiteFooter />

      {/* Toast */}
      <Toaster />
    </div>
  )
}
