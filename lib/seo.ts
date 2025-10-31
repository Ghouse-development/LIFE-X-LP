import type { Metadata } from 'next';
import siteData from '@/content/site.json';

export interface SEOProps {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  noindex?: boolean;
}

export function generateMetadata({
  title,
  description,
  path = '',
  image = '/og/default-og.jpg',
  noindex = false,
}: SEOProps = {}): Metadata {
  const baseUrl = siteData.url;
  const fullUrl = `${baseUrl}${path}`;
  const fullTitle = title ? `${title} | ${siteData.name}` : siteData.name;
  const fullDescription = description || siteData.description;

  return {
    title: fullTitle,
    description: fullDescription,
    openGraph: {
      title: fullTitle,
      description: fullDescription,
      url: fullUrl,
      siteName: siteData.name,
      images: [
        {
          url: `${baseUrl}${image}`,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      locale: 'ja_JP',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: fullDescription,
      images: [`${baseUrl}${image}`],
    },
    robots: noindex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
        },
    alternates: {
      canonical: fullUrl,
    },
  };
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteData.name,
    url: siteData.url,
    description: siteData.description,
    telephone: siteData.phone,
    email: siteData.email,
  };
}

export function generateProductSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'LIFE X フランチャイズ',
    description: '高性能規格住宅のフランチャイズパッケージ',
    brand: {
      '@type': 'Brand',
      name: 'LIFE X',
    },
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'JPY',
    },
  };
}

export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}
