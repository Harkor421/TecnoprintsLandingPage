'use client'

import Button from '@/components/ui/Button'
import ScrollFadeIn from '@/components/ui/ScrollFadeIn'
import { Upload, Calculator, Printer, Truck, ArrowRight } from 'lucide-react'

const steps = [
  {
    icon: Upload,
    title: 'Sube tu Archivo',
    description: 'Sube tu modelo 3D en formato STL, OBJ o STEP. Aceptamos los formatos más comunes.',
  },
  {
    icon: Calculator,
    title: 'Obtén tu Cotización',
    description: 'Nuestro sistema analiza tu archivo y proporciona una cotización instantánea con precios y opciones de entrega.',
  },
  {
    icon: Printer,
    title: 'Inicia la Producción',
    description: 'Una vez aprobado, tus piezas entran en producción con nuestras impresoras 3D de última generación.',
  },
  {
    icon: Truck,
    title: 'Envío de Piezas',
    description: 'Las piezas inspeccionadas son empacadas cuidadosamente y enviadas directamente a tu puerta.',
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
              Imprimir tus piezas es simple. Sigue estos cuatro pasos fáciles
              para ir del diseño a la entrega.
            </p>
          </div>
        </ScrollFadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
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
          <div className="text-center mt-12">
            <Button size="lg" className="group">
              Iniciar Proyecto
              <ArrowRight
                size={18}
                className="ml-2 group-hover:translate-x-1 transition-transform"
              />
            </Button>
          </div>
        </ScrollFadeIn>
      </div>
    </section>
  )
}
