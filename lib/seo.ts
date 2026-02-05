import { Metadata } from 'next'

export const siteConfig = {
  name: 'Tecnoprints',
  description: 'Professional 3D printing services for prototyping and production. Fast turnaround, high quality PLA prints for your projects.',
  url: 'https://tecnoprints.com',
  ogImage: '/og-image.jpg',
  links: {
    twitter: 'https://twitter.com/tecnoprints',
    github: 'https://github.com/tecnoprints',
  },
  keywords: [
    '3D printing',
    '3D printing services',
    'PLA printing',
    'FDM printing',
    'prototyping',
    'custom parts',
    'rapid prototyping',
    '3D print on demand',
  ],
}

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} - Professional 3D Printing Services`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: '@tecnoprints',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export function generateStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    sameAs: [siteConfig.links.twitter, siteConfig.links.github],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: ['English'],
    },
    offers: {
      '@type': 'Offer',
      description: '3D Printing Services',
      availability: 'https://schema.org/InStock',
    },
  }
}
