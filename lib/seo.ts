import { Metadata } from 'next'

export const siteConfig = {
  name: 'Tecnoprints',
  description: 'Servicio de impresión 3D en Barranquilla, Colombia. Prototipado rápido, piezas personalizadas en PLA con impresoras Bambu Lab. Cotización inmediata, entrega en mismo día hasta 48 horas.',
  url: 'https://tecnoprints.com',
  ogImage: '/og-image.jpg',
  links: {
    instagram: 'https://instagram.com/tecnoprintsco',
    tiktok: 'https://www.tiktok.com/@tecnoprints',
    whatsapp: 'https://wa.me/573239267656',
  },
  keywords: [
    // Core Barranquilla
    'impresión 3D Barranquilla',
    'impresiones 3D Barranquilla',
    'servicio impresión 3D Barranquilla',
    'imprimir en 3D Barranquilla',
    'donde imprimir 3D en Barranquilla',
    'impresión 3D cerca de mí',
    // Cotización
    'cotizar impresión 3D',
    'cotización impresión 3D Barranquilla',
    'precio impresión 3D Barranquilla',
    'cuánto cuesta imprimir en 3D',
    // Servicios específicos
    'prototipado rápido Barranquilla',
    'prototipos 3D Barranquilla',
    'maquetas 3D Barranquilla',
    'piezas 3D personalizadas Barranquilla',
    'impresión 3D para tesis Barranquilla',
    'impresión 3D para estudiantes Barranquilla',
    'impresión 3D para empresas Barranquilla',
    'impresión 3D para arquitectura Barranquilla',
    'impresión 3D para ingeniería Barranquilla',
    // Materiales
    'impresión PLA Barranquilla',
    'impresión FDM Barranquilla',
    'filamento 3D Barranquilla',
    // Nacional
    'servicio impresión 3D Colombia',
    'impresión 3D Colombia',
    'impresión 3D bajo demanda Colombia',
    // Marca
    'Bambu Lab Colombia',
    'Tecnoprints',
    // Long-tail
    'regalos personalizados 3D Barranquilla',
    'llaveros personalizados 3D Barranquilla',
    'figuras impresas 3D Barranquilla',
    'impresión 3D económica Barranquilla',
    'impresión 3D rápida Barranquilla',
    'servicio de impresión 3D a domicilio Barranquilla',
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
    title: `${siteConfig.name} - Impresión 3D Profesional en Barranquilla`,
    description: 'Servicio de impresión 3D en Barranquilla. Prototipado rápido, piezas personalizadas, maquetas y más. Cotiza gratis en línea. Entrega en mismo día hasta 48 horas.',
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: 'Tecnoprints - Servicio de Impresión 3D en Barranquilla, Colombia',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} - Impresión 3D en Barranquilla`,
    description: 'Cotiza tu impresión 3D al instante. Prototipado rápido, entrega desde el mismo día. Barranquilla, Colombia.',
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
  alternates: {
    canonical: siteConfig.url,
    languages: {
      'es-CO': siteConfig.url,
    },
  },
  category: 'technology',
}

// Schema: LocalBusiness (used in root layout — appears on every page)
export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'ProfessionalService'],
    '@id': `${siteConfig.url}/#business`,
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    logo: {
      '@type': 'ImageObject',
      url: `${siteConfig.url}/logo.png`,
    },
    image: `${siteConfig.url}/og-image.jpg`,
    telephone: '+573239267656',
    email: 'contact@tecnoprints.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Cra. 53 #Calle 96 - 24',
      addressLocality: 'Barranquilla',
      addressRegion: 'Atlántico',
      postalCode: '080001',
      addressCountry: 'CO',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 10.9685,
      longitude: -74.7813,
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'Barranquilla',
        '@id': 'https://www.wikidata.org/wiki/Q62823',
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Atlántico',
      },
      {
        '@type': 'Country',
        name: 'Colombia',
      },
    ],
    sameAs: [
      siteConfig.links.instagram,
      siteConfig.links.tiktok,
      siteConfig.links.whatsapp,
    ],
    priceRange: '$$',
    currenciesAccepted: 'COP',
    paymentAccepted: 'Efectivo, Nequi, Daviplata, Transferencia bancaria',
    knowsLanguage: ['es', 'en'],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '14:00',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '87',
      bestRating: '5',
      worstRating: '1',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Servicios de Impresión 3D',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Prototipado Rápido',
            description: 'Prototipos funcionales impresos en 3D con entrega en mismo día hasta 48 horas',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Maquetas de Arquitectura',
            description: 'Maquetas a escala impresas en 3D para proyectos de arquitectura',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Piezas Personalizadas',
            description: 'Impresión 3D de piezas a medida en PLA, PETG y más materiales',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Producción en Lotes',
            description: 'Producción de múltiples piezas idénticas con calidad consistente',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Impresión 3D para Tesis',
            description: 'Prototipos y modelos para proyectos de grado universitario',
          },
        },
      ],
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
      '@id': `${siteConfig.url}/#business`,
    },
    areaServed: {
      '@type': 'City',
      name: 'Barranquilla',
    },
    description: 'Servicio de impresión 3D profesional con impresoras Bambu Lab. Prototipado rápido, piezas personalizadas, maquetas, producción en lotes. Entrega en mismo día hasta 48 horas en Barranquilla.',
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'COP',
      lowPrice: '5000',
      highPrice: '500000',
      availability: 'https://schema.org/InStock',
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
      url: siteConfig.url,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteConfig.url}/blog/${article.slug}`,
    },
    inLanguage: 'es',
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

// Schema: WebSite (sitelinks)
export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: 'es',
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      '@id': `${siteConfig.url}/#business`,
    },
  }
}
