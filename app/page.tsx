import { Hero } from '@/components/Hero';
import { ValueProps } from '@/components/ValueProps';
import { VisualFeatures } from '@/components/VisualFeatures';
import { SpecAndStandard } from '@/components/SpecAndStandard';
import { Gallery } from '@/components/Gallery';
import { UnitEconomics } from '@/components/UnitEconomics';
import { Flow } from '@/components/Flow';
import { Cases } from '@/components/Cases';
import { WarrantySupport } from '@/components/WarrantySupport';
import { FranchiseMapSimple } from '@/components/FranchiseMapSimple';
import { WebinarCTA } from '@/components/WebinarCTA';
import { FAQ } from '@/components/FAQ';
import { FinalCTA } from '@/components/FinalCTA';
import { LeadForm } from '@/components/LeadForm';
import { generateMetadata, generateOrganizationSchema, generateProductSchema, generateFAQSchema } from '@/lib/seo';
import faqData from '@/content/faq.json';

export const metadata = generateMetadata({
  title: 'LIFE X フランチャイズ | 少人数×短期立上げで始める高性能規格住宅',
  description: '商品・設計・現場・集客の型を提供。毎月ウェビナー開催／まずは30分で概要相談。',
  path: '/',
});

export default function Home() {
  const organizationSchema = generateOrganizationSchema();
  const productSchema = generateProductSchema();
  const faqSchema = generateFAQSchema(faqData.faqs);

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main>
        <Hero />
        <ValueProps />
        <VisualFeatures />
        <SpecAndStandard />
        <UnitEconomics />
        <Flow />
        <Cases />
        <Gallery />
        <WarrantySupport />
        <FranchiseMapSimple />
        <WebinarCTA />
        <FAQ />
        <LeadForm />
        <FinalCTA />
      </main>
    </>
  );
}
