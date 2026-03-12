import Hero from '@/components/sections/Hero'
import Partners from '@/components/sections/Partners'
import About from '@/components/sections/About'
import Process from '@/components/sections/Process'
import Catalog from '@/components/sections/Catalog'
import CTA from '@/components/sections/CTA'
import FAQ from '@/components/sections/FAQ'
import QuoteForm from '@/components/sections/QuoteForm'
import ContactForm from '@/components/sections/ContactForm'
import { generateServiceSchema, generateFAQSchema } from '@/lib/seo'
import { FAQ_DATA } from '@/lib/constants'

export default function Home() {
  const schemas = [
    generateServiceSchema(),
    generateFAQSchema(FAQ_DATA.map(f => ({ question: f.question, answer: f.answer }))),
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
