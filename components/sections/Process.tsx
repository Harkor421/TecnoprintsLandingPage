'use client'

import Link from 'next/link'
import Button from '@/components/ui/Button'
import ScrollFadeIn from '@/components/ui/ScrollFadeIn'
import { MessageCircle, Upload, Library, Printer, Truck, ArrowRight } from 'lucide-react'

const steps = [
  {
    icon: Library,
    title: 'Explora nuestro catálogo',
    description: '¿No tienes archivo? Tenemos un catálogo con miles de modelos listos para imprimir. Agrega lo que te guste al carrito.',
  },
  {
    icon: Upload,
    title: 'O sube tu propio archivo',
    description: '¿Ya tienes tu diseño? Sube tu archivo (STL, OBJ, STEP) y obtén un estimado al instante o cotízalo con nosotros.',
  },
  {
    icon: MessageCircle,
    title: 'Confirmamos por WhatsApp',
    description: 'Te confirmamos dimensiones, materiales, color y precio final por WhatsApp. Sin compromiso, sin sorpresas.',
  },
  {
    icon: Printer,
    title: 'Inicia la Producción',
    description: 'Una vez aprobada la cotización, tus piezas entran en producción con nuestras impresoras Bambu Lab de última generación.',
  },
  {
    icon: Truck,
    title: 'Recibe tus Piezas',
    description: 'Tus piezas son inspeccionadas, empacadas con cuidado y enviadas a tu puerta en 1 a 3 días hábiles.',
  },
]

export default function Process() {
  return (
    <section id="process" className="py-20 md:py-32 bg-surface/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollFadeIn direction="up">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Cómo{' '}
              <span className="text-primary">
                Funciona
              </span>
            </h2>
            <p className="text-muted max-w-2xl mx-auto">
              Tienes dos formas de empezar: explorar nuestro catálogo de miles de modelos
              o subir tu propio archivo 3D. Tú eliges.
            </p>
          </div>
        </ScrollFadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8">
          {steps.map((step, index) => (
            <ScrollFadeIn key={step.title} direction="up" delay={index * 0.1}>
              <div className="relative">
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-[2px] bg-gradient-to-r from-border to-transparent" />
                )}

                <div className="relative text-center">
                  {/* Step number */}
                  <div className="absolute -top-2 -left-2 w-6 h-6 bg-primary text-black text-xs font-bold flex items-center justify-center">
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div className="w-16 h-16 bg-surface border border-border flex items-center justify-center mx-auto mb-4 group-hover:border-primary transition-colors">
                    <step.icon size={28} className="text-primary" />
                  </div>

                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted">{step.description}</p>
                </div>
              </div>
            </ScrollFadeIn>
          ))}
        </div>

        <ScrollFadeIn direction="up" delay={0.4}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-12">
            <Link href="/catalogo">
              <Button size="lg" className="group">
                Explorar Catálogo
                <ArrowRight
                  size={18}
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                />
              </Button>
            </Link>
            <Link href="https://wa.me/573239267656" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="group">
                Cotizar por WhatsApp
              </Button>
            </Link>
          </div>
        </ScrollFadeIn>
      </div>
    </section>
  )
}
