import Hero from '@/components/sections/Hero'
import Partners from '@/components/sections/Partners'
import About from '@/components/sections/About'
import Process from '@/components/sections/Process'
import Catalog from '@/components/sections/Catalog'
import CTA from '@/components/sections/CTA'
import FAQ from '@/components/sections/FAQ'
import QuoteForm from '@/components/sections/QuoteForm'
import ContactForm from '@/components/sections/ContactForm'
import { Metadata } from 'next'
import { generateServiceSchema, generateFAQSchema, generateWebSiteSchema, siteConfig } from '@/lib/seo'
import { FAQ_DATA } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Impresión 3D en Barranquilla | Cotiza al Instante | Tecnoprints',
  description: 'Servicio #1 de impresión 3D en Barranquilla. Prototipado rápido, maquetas, piezas personalizadas en PLA. Cotiza gratis en línea. Entrega desde el mismo día hasta 48 horas. Impresoras Bambu Lab.',
  keywords: [
    'impresión 3D Barranquilla',
    'servicio impresión 3D Barranquilla',
    'imprimir en 3D Barranquilla',
    'cotizar impresión 3D',
    'prototipado rápido Barranquilla',
    'donde imprimir 3D en Barranquilla',
    'impresión 3D Colombia',
    'maquetas 3D Barranquilla',
    'piezas 3D personalizadas',
    'impresión 3D para tesis Barranquilla',
  ],
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    title: 'Tecnoprints - Impresión 3D en Barranquilla | Cotiza Gratis',
    description: 'Servicio de impresión 3D profesional en Barranquilla. Prototipado rápido, maquetas, figuras, piezas funcionales. Entrega desde el mismo día.',
  },
}

export default function Home() {
  const schemas = [
    generateServiceSchema(),
    generateFAQSchema(FAQ_DATA.map(f => ({ question: f.question, answer: f.answer }))),
    generateWebSiteSchema(),
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />
      <Hero />
      <Partners />
      <About />
      <Process />
      <Catalog />
      <CTA />
      <QuoteForm />
      <ContactForm />
      <FAQ />
    </>
  )
}
