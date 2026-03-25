import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Process from '@/components/sections/Process'
import Catalog from '@/components/sections/Catalog'
import CTA from '@/components/sections/CTA'
import FAQ from '@/components/sections/FAQ'
import QuoteForm from '@/components/sections/QuoteForm'
import ContactForm from '@/components/sections/ContactForm'
import LivePrinters from '@/components/sections/LivePrinters'
import { Metadata } from 'next'
import { generateServiceSchema, generateFAQSchema, generateWebSiteSchema, siteConfig } from '@/lib/seo'
import { FAQ_DATA } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Impresión 3D FDM y Resina en Barranquilla | Cotiza al Instante | Tecnoprints',
  description: 'Servicio #1 de impresión 3D FDM y resina en Barranquilla. PLA, PETG, ABS, Nylon, Fibra de Carbono, Resina. Prototipado rápido, maquetas, piezas personalizadas. Cotiza gratis. Entrega desde el mismo día hasta 48 horas. Impresoras Bambu Lab.',
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
    title: 'Tecnoprints - Impresión 3D FDM y Resina en Barranquilla',
    description: 'Impresión 3D FDM (PLA, PETG, ABS, Nylon, Fibra Carbono) y Resina. Prototipado rápido, maquetas, piezas. Entrega desde el mismo día.',
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
      <About />
      <Process />
      <Catalog />
      <LivePrinters />
      <CTA />
      <QuoteForm />
      <ContactForm />
      <FAQ />
    </>
  )
}
