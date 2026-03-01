import { Metadata } from 'next'
import Link from 'next/link'
import { Printer, Cog, Layers, PenTool, Zap, Shield, Clock, ArrowRight } from 'lucide-react'
import { siteConfig, generateServiceSchema, generateBreadcrumbSchema } from '@/lib/seo'
import Breadcrumb from '@/components/ui/Breadcrumb'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import ScrollFadeIn from '@/components/ui/ScrollFadeIn'

export const metadata: Metadata = {
  title: 'Servicios de Impresión 3D en Barranquilla',
  description: 'Servicio profesional de impresión 3D en Barranquilla, Colombia. Prototipado rápido, piezas personalizadas en PLA, producción en serie con impresoras Bambu Lab. Cotización inmediata.',
  keywords: [
    'impresión 3D Barranquilla',
    'servicio impresión 3D',
    'prototipado rápido Barranquilla',
    'piezas 3D personalizadas',
    'impresión PLA Barranquilla',
    'impresión 3D Colombia',
    'producción 3D en serie',
  ],
  openGraph: {
    title: 'Servicios de Impresión 3D en Barranquilla | Tecnoprints',
    description: 'Servicio profesional de impresión 3D en Barranquilla. Prototipado rápido, piezas personalizadas, producción en serie.',
    url: `${siteConfig.url}/servicios-impresion-3d-barranquilla`,
  },
  alternates: {
    canonical: `${siteConfig.url}/servicios-impresion-3d-barranquilla`,
  },
}

const services = [
  {
    icon: Printer,
    title: 'Prototipado Rápido',
    description: 'Transforma tu idea en un prototipo funcional en 24 a 48 horas. Ideal para validar diseños antes de producción, presentar proyectos académicos o probar conceptos de productos nuevos.',
  },
  {
    icon: Cog,
    title: 'Piezas Personalizadas',
    description: 'Fabricamos piezas a medida según tus especificaciones exactas. Desde repuestos mecánicos hasta carcasas electrónicas, cada pieza se imprime con la precisión que tu proyecto necesita.',
  },
  {
    icon: Layers,
    title: 'Producción en Serie',
    description: 'Con más de 20 impresoras Bambu Lab operando simultáneamente, producimos lotes de cientos de piezas idénticas con calidad consistente y tiempos de entrega competitivos.',
  },
  {
    icon: PenTool,
    title: 'Diseño 3D',
    description: 'No tienes un modelo 3D? Nuestro equipo de diseño te ayuda a crear o modificar modelos a partir de bocetos, ideas o archivos en cualquier formato.',
  },
]

const advantages = [
  { icon: Zap, text: 'Velocidades de hasta 500mm/s con impresoras Bambu Lab' },
  { icon: Clock, text: 'Entrega en 24-48 horas para la mayoría de proyectos' },
  { icon: Shield, text: 'Precisión de 0.05mm en cada pieza impresa' },
  { icon: Layers, text: 'Producción 24/7 con más de 20 impresoras activas' },
]

export default function ServiciosPage() {
  const schemas = [
    generateServiceSchema(),
    generateBreadcrumbSchema([
      { name: 'Inicio', url: siteConfig.url },
      { name: 'Servicios de Impresión 3D', url: `${siteConfig.url}/servicios-impresion-3d-barranquilla` },
    ]),
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />

      {/* Hero */}
      <section className="pt-28 sm:pt-32 pb-16 sm:pb-20 md:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[
            { label: 'Inicio', href: '/' },
            { label: 'Servicios de Impresión 3D' },
          ]} />

          <ScrollFadeIn direction="up">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 mt-4">
              Servicios de <span className="text-primary">Impresión 3D</span> en Barranquilla
            </h1>
          </ScrollFadeIn>

          <ScrollFadeIn direction="up" delay={0.1}>
            <div className="max-w-3xl space-y-4 text-muted leading-relaxed">
              <p>
                En Tecnoprints ofrecemos un servicio completo de impresión 3D en Barranquilla para
                estudiantes, emprendedores, makers y empresas. Utilizamos tecnología FDM de última
                generación con impresoras Bambu Lab P1S y A1 equipadas con sistema AMS para cambio
                automático de filamento.
              </p>
              <p>
                Ya sea que necesites un prototipo rápido para tu tesis en Uninorte o UniAtlántico,
                piezas personalizadas para tu emprendimiento, o producción en lotes para tu empresa,
                nuestro equipo de más de 20 impresoras opera 24/7 para garantizar los mejores tiempos
                de entrega de impresión 3D en Barranquilla.
              </p>
            </div>
          </ScrollFadeIn>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 sm:py-20 md:py-32 bg-surface/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollFadeIn direction="up">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-12 text-center">
              Nuestros <span className="text-primary">Servicios</span>
            </h2>
          </ScrollFadeIn>

          <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
            {services.map((service, index) => (
              <ScrollFadeIn key={service.title} direction="up" delay={0.1 * (index + 1)}>
                <Card hover={false} className="p-6 md:p-8 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-primary flex items-center justify-center flex-shrink-0">
                      <service.icon size={20} className="text-black" />
                    </div>
                    <h3 className="text-lg md:text-xl font-bold">{service.title}</h3>
                  </div>
                  <p className="text-sm text-muted leading-relaxed">{service.description}</p>
                </Card>
              </ScrollFadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Materials */}
      <section className="py-16 sm:py-20 md:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollFadeIn direction="up">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-center">
              Materiales <span className="text-primary">Disponibles</span>
            </h2>
          </ScrollFadeIn>
          <ScrollFadeIn direction="up" delay={0.1}>
            <div className="space-y-4 text-muted leading-relaxed text-center max-w-3xl mx-auto">
              <p>
                Trabajamos con PLA (Ácido Poliláctico) en múltiples variantes para cubrir las
                necesidades de cada proyecto de impresión 3D en Barranquilla. Ofrecemos PLA Estándar
                para prototipos y piezas funcionales, PLA+ de alta resistencia para aplicaciones
                mecánicas, PLA Silk con acabado brillante para piezas decorativas, y PLA Mate para
                un acabado profesional y suave al tacto.
              </p>
              <p>
                Todos nuestros materiales son de grado industrial y ofrecen excelente adhesión entre
                capas, buena resistencia mecánica y un acabado superficial consistente.
              </p>
            </div>
          </ScrollFadeIn>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-16 sm:py-20 md:py-32 bg-surface/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollFadeIn direction="up">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 text-center">
              Por qué Elegir <span className="text-primary">Tecnoprints</span>
            </h2>
          </ScrollFadeIn>
          <div className="grid sm:grid-cols-2 gap-4">
            {advantages.map((adv, index) => (
              <ScrollFadeIn key={adv.text} direction="up" delay={0.1 * (index + 1)}>
                <div className="flex items-start gap-3 p-4 border border-border bg-background">
                  <adv.icon size={20} className="text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{adv.text}</span>
                </div>
              </ScrollFadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 md:py-32">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollFadeIn direction="up">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              Cotiza tu <span className="text-primary">Proyecto</span> Hoy
            </h2>
            <p className="text-muted mb-8 max-w-2xl mx-auto">
              Envíanos tu archivo 3D por WhatsApp y te cotizamos al instante, o usa nuestro
              estimador en línea para calcular el material de tu pieza.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="https://wa.me/573239267656" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="w-full sm:w-auto group">
                  Cotizar por WhatsApp
                  <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/cotizar-impresion-3d">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Estimador en Línea
                </Button>
              </Link>
            </div>
          </ScrollFadeIn>

          <ScrollFadeIn direction="up" delay={0.2}>
            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center text-sm text-muted">
              <Link href="/blog/cuanto-cuesta-impresion-3d-barranquilla" className="hover:text-primary transition-colors">
                Guía de precios de impresión 3D →
              </Link>
              <Link href="/#faq" className="hover:text-primary transition-colors">
                Preguntas frecuentes →
              </Link>
            </div>
          </ScrollFadeIn>
        </div>
      </section>
    </>
  )
}
