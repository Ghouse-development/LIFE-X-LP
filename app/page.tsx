import { Hero } from '@/components/Hero';
import { ValueProps } from '@/components/ValueProps';
import { VisualFeatures } from '@/components/VisualFeatures';
import { SpecAndStandard } from '@/components/SpecAndStandard';
import { Gallery } from '@/components/Gallery';
import { ImageShowcase } from '@/components/ImageShowcase';
import { UnitEconomics } from '@/components/UnitEconomics';
import { Flow } from '@/components/Flow';
import { Cases } from '@/components/Cases';
import { FranchiseMapClient } from '@/components/FranchiseMapClient';
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

        <ImageShowcase
          images={[
            '/cases/case-01.jpg', '/cases/case-02.jpg', '/cases/case-03.jpg',
            '/cases/case-04.jpg', '/cases/case-05.jpg', '/cases/case-06.jpg',
            '/cases/case-07.jpg', '/cases/case-08.jpg', '/cases/case-09.jpg',
            '/cases/case-10.jpg', '/cases/case-11.jpg', '/cases/case-12.jpg',
          ]}
        />

        <ValueProps />

        <ImageShowcase
          images={[
            '/cases/case-13.jpg', '/cases/case-14.jpg', '/cases/case-15.jpg',
            '/cases/case-16.jpg', '/cases/case-17.jpg', '/cases/case-18.jpg',
          ]}
        />

        <VisualFeatures />

        <ImageShowcase
          title="実例ギャラリー"
          subtitle="こだわりの施工実例をご覧ください"
          images={[
            '/cases/case-19.jpg', '/cases/case-20.jpg', '/cases/case-21.jpg',
            '/cases/case-22.jpg', '/cases/case-23.jpg', '/cases/case-24.jpg',
            '/cases/case-25.jpg', '/cases/case-26.jpg', '/cases/case-27.jpg',
            '/cases/case-28.jpg', '/cases/case-29.jpg', '/cases/case-30.jpg',
            '/cases/case-31.jpg', '/cases/case-32.jpg', '/cases/case-33.jpg',
            '/cases/case-34.jpg', '/cases/case-35.jpg', '/cases/case-36.jpg',
          ]}
        />

        <SpecAndStandard />
        <Gallery />

        <ImageShowcase
          images={[
            '/cases/case-37.jpg', '/cases/case-38.jpg', '/cases/case-39.jpg',
            '/cases/case-40.jpg', '/cases/case-41.jpg', '/cases/case-42.jpg',
            '/cases/case-43.jpg', '/cases/case-44.jpg', '/cases/case-45.jpg',
            '/cases/case-46.jpg', '/cases/case-47.jpg', '/cases/case-48.jpg',
          ]}
        />

        <UnitEconomics />
        <Flow />

        <ImageShowcase
          images={[
            '/cases/case-49.jpg', '/cases/case-50.jpg', '/cases/case-51.jpg',
            '/cases/case-52.jpg', '/cases/case-53.jpg', '/cases/case-54.jpg',
          ]}
        />

        <Cases />
        <FranchiseMapClient />
        <WebinarCTA />

        <ImageShowcase
          images={[
            '/cases/case-55.jpg', '/cases/case-56.jpg', '/cases/case-57.jpg',
            '/cases/case-58.jpg', '/cases/case-59.jpg', '/cases/case-60.jpg',
            '/cases/case-61.jpg', '/cases/case-62.jpg', '/cases/case-63.jpg',
            '/cases/case-64.jpg', '/cases/case-65.jpg', '/cases/case-66.jpg',
          ]}
        />

        <FAQ />

        <ImageShowcase
          images={[
            '/cases/case-67.jpg', '/cases/case-68.jpg', '/cases/case-69.jpg',
            '/cases/case-70.jpg', '/cases/case-71.jpg', '/cases/case-72.jpg',
            '/cases/case-73.jpg', '/cases/case-74.jpg', '/cases/case-75.jpg',
            '/cases/case-76.jpg', '/cases/case-77.jpg', '/cases/case-78.jpg',
          ]}
        />

        <LeadForm />

        <ImageShowcase
          images={[
            '/cases/case-79.jpg', '/cases/case-80.jpg', '/cases/case-81.jpg',
            '/cases/case-82.jpg', '/cases/case-83.jpg', '/cases/case-84.jpg',
            '/cases/case-85.jpg', '/cases/case-86.jpg',
          ]}
        />

        <FinalCTA />
      </main>
    </>
  );
}
