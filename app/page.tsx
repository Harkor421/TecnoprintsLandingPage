import Hero from '@/components/sections/Hero'
import Partners from '@/components/sections/Partners'
import Services from '@/components/sections/Services'
import Process from '@/components/sections/Process'
import CTA from '@/components/sections/CTA'
import Support from '@/components/sections/Support'
import FAQ from '@/components/sections/FAQ'
import QuoteForm from '@/components/sections/QuoteForm'
import ContactForm from '@/components/sections/ContactForm'
import Certifications from '@/components/sections/Certifications'

export default function Home() {
  return (
    <>
      <Hero />
      <Partners />
      <Services />
      <Process />
      <CTA />
      <Support />
      <FAQ />
      <QuoteForm />
      <ContactForm />
      <Certifications />
    </>
  )
}
