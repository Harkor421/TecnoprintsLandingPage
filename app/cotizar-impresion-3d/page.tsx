import { Metadata } from 'next'
import Link from 'next/link'
import { siteConfig, generateBreadcrumbSchema } from '@/lib/seo'
import Breadcrumb from '@/components/ui/Breadcrumb'
import QuoteForm from '@/components/sections/QuoteForm'
import ScrollFadeIn from '@/components/ui/ScrollFadeIn'

export const metadata: Metadata = {
  title: 'Cotizar Impresión 3D - Estimado Instantáneo',
  description: 'Cotiza tu impresión 3D al instante. Sube tu archivo STL y obtén un estimado automático de material. Servicio de impresión 3D en Barranquilla con entrega en 1 a 3 días hábiles, express el mismo día disponible.',
  keywords: [
    'cotizar impresión 3D',
    'precio impresión 3D',
    'cotización 3D Barranquilla',
    'estimado impresión 3D',
    'calculadora impresión 3D',
  ],
  alternates: {
    canonical: `${siteConfig.url}/cotizar-impresion-3d`,
  },
}

export default function CotizarPage() {
  const schema = generateBreadcrumbSchema([
    { name: 'Inicio', url: siteConfig.url },
    { name: 'Cotizar Impresión 3D', url: `${siteConfig.url}/cotizar-impresion-3d` },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Header */}
      <section className="pt-28 sm:pt-32 pb-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[
            { label: 'Inicio', href: '/' },
            { label: 'Cotizar Impresión 3D' },
          ]} />

          <ScrollFadeIn direction="up">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 mt-4">
              Cotiza tu <span className="text-primary">Impresión 3D</span> al Instante
            </h1>
          </ScrollFadeIn>

          <ScrollFadeIn direction="up" delay={0.1}>
            <p className="text-muted leading-relaxed max-w-2xl">
              Nuestro estimador en línea analiza tu archivo STL directamente en el navegador
              para calcular el volumen y los gramos de PLA necesarios — como un slicer.
              Selecciona la calidad de impresión y obtén un estimado al instante sin necesidad
              de registrarte. Para una cotización final, te contactamos por WhatsApp.
            </p>
          </ScrollFadeIn>
        </div>
      </section>

      {/* QuoteForm (reused component) */}
      <QuoteForm />

      {/* How It Works */}
      <section className="py-16 sm:py-20 md:py-32">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollFadeIn direction="up">
            <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center">
              Cómo Funciona el <span className="text-primary">Proceso</span>
            </h2>
          </ScrollFadeIn>
          <ScrollFadeIn direction="up" delay={0.1}>
            <div className="space-y-4 text-muted leading-relaxed">
              <p>
                <strong className="text-white">1. Sube tu archivo STL</strong> — Nuestro sistema
                lee el archivo directamente en tu navegador (no se sube a ningún servidor) y
                calcula el volumen total del modelo en centímetros cúbicos.
              </p>
              <p>
                <strong className="text-white">2. Selecciona la calidad</strong> — Elige entre
                calidad baja (15% relleno, ideal para prototipos rápidos), media (30% relleno,
                buen balance) o alta (50% relleno, para piezas finales). El sistema calcula los
                gramos de PLA estimados considerando las paredes, el techo/piso y el porcentaje de
                relleno interno.
              </p>
              <p>
                <strong className="text-white">3. Recibe tu estimado</strong> — Verás el volumen
                en cm³, los gramos de material y la calidad seleccionada. Desde ahí puedes
                contactarnos por WhatsApp con todos los detalles pre-llenados para recibir el
                precio final.
              </p>
            </div>
          </ScrollFadeIn>

          <ScrollFadeIn direction="up" delay={0.2}>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center text-sm text-muted">
              <Link href="/servicios-impresion-3d-barranquilla" className="hover:text-primary transition-colors">
                Ver todos nuestros servicios →
              </Link>
              <Link href="/blog/como-preparar-archivo-stl" className="hover:text-primary transition-colors">
                Cómo preparar tu archivo STL →
              </Link>
            </div>
          </ScrollFadeIn>
        </div>
      </section>
    </>
  )
}
