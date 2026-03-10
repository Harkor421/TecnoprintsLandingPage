import { Metadata } from 'next'

export const siteConfig = {
  name: 'Tecnoprints',
  description: 'Servicio de impresión 3D en Barranquilla, Colombia. Prototipado rápido, piezas personalizadas en PLA con impresoras Bambu Lab. Cotización inmediata, entrega en 24-48 horas.',
  url: 'https://tecnoprints.com',
  ogImage: '/og-image.jpg',
  links: {
    instagram: 'https://instagram.com/tecnoprintsco',
    whatsapp: 'https://wa.me/573239267656',
  },
  keywords: [
    'impresión 3D Barranquilla',
    'impresiones 3D Barranquilla',
    'servicio impresión 3D Colombia',
    'impresión 3D',
    'prototipado rápido Barranquilla',
    'piezas 3D personalizadas',
    'impresión PLA Colombia',
    'impresión FDM',
    'impresión 3D bajo demanda',
    'Bambu Lab Colombia',
    'cotización impresión 3D',
    'impresión 3D estudiantes',
    'prototipos 3D Barranquilla',
  ],
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover' as const,
}

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} - Impresión 3D en Barranquilla, Colombia`,
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
    locale: 'es_CO',
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
    creator: '@tecnoprintsco',
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

// Schema: LocalBusiness (used in root layout — appears on every page)
export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    image: `${siteConfig.url}/og-image.jpg`,
    telephone: '+573239267656',
    email: 'contact@tecnoprints.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Cra. 53 #Calle 96 - 24',
      addressLocality: 'Barranquilla',
      addressRegion: 'Atlántico',
      addressCountry: 'CO',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 10.9685,
      longitude: -74.7813,
    },
    areaServed: {
      '@type': 'Country',
      name: 'Colombia',
    },
    sameAs: [siteConfig.links.instagram],
    priceRange: '$$',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '18:00',
    },
  }
}

// Schema: Service (used on homepage and service page)
export function generateServiceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Impresión 3D',
    provider: {
      '@type': 'LocalBusiness',
      name: siteConfig.name,
    },
    areaServed: {
      '@type': 'City',
      name: 'Barranquilla',
    },
    description: 'Servicio de impresión 3D profesional con impresoras Bambu Lab. Prototipado rápido, piezas personalizadas, producción en lotes.',
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'COP',
    },
  }
}

// Schema: FAQPage (used on homepage)
export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
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
  }
}

// Schema: Article (used on blog posts)
export function generateArticleSchema(article: {
  title: string
  description: string
  slug: string
  datePublished: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    datePublished: article.datePublished,
    dateModified: article.datePublished,
    author: {
      '@type': 'Organization',
      name: siteConfig.name,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/logo.png`,
      },
    },
    mainEntityOfPage: `${siteConfig.url}/blog/${article.slug}`,
  }
}

// Schema: BreadcrumbList (used on sub-pages)
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}
