import { Metadata } from 'next'

export const siteConfig = {
  name: 'Tecnoprints',
  description: 'Servicios profesionales de impresión 3D para prototipado y producción. Entrega rápida, impresiones PLA de alta calidad para tus proyectos.',
  url: 'https://tecnoprints.com',
  ogImage: '/og-image.jpg',
  links: {
    twitter: 'https://twitter.com/tecnoprints',
    github: 'https://github.com/tecnoprints',
  },
  keywords: [
    'impresión 3D',
    'servicios de impresión 3D',
    'impresión PLA',
    'impresión FDM',
    'prototipado',
    'piezas personalizadas',
    'prototipado rápido',
    'impresión 3D bajo demanda',
    'México',
  ],
}

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} - Servicios Profesionales de Impresión 3D`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    type: 'website',
    locale: 'es_MX',
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
      availableLanguage: ['Spanish', 'English'],
    },
    offers: {
      '@type': 'Offer',
      description: 'Servicios de Impresión 3D',
      availability: 'https://schema.org/InStock',
    },
  }
}
