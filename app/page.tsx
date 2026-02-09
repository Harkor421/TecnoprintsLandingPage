import Hero from '@/components/sections/Hero'
import Partners from '@/components/sections/Partners'
import Process from '@/components/sections/Process'
import Equipment from '@/components/sections/Equipment'
import CTA from '@/components/sections/CTA'
import FAQ from '@/components/sections/FAQ'
import QuoteForm from '@/components/sections/QuoteForm'
import ContactForm from '@/components/sections/ContactForm'

export default function Home() {
  return (
    <>
      <Hero />
      <Partners />
      <Process />
      <Equipment />
      <CTA />
      <QuoteForm />
      <ContactForm />
      <FAQ />
    </>
  )
}
