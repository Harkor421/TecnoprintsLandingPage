'use client'

import Card from '@/components/ui/Card'
import { ArrowRight, Sparkles, Zap, Shield } from 'lucide-react'

const news = [
  {
    icon: Sparkles,
    title: 'Nuevos Materiales',
    description:
      'Hemos ampliado nuestra paleta de colores PLA con 15 nuevos colores vibrantes incluyendo metálicos y opciones que brillan en la oscuridad.',
    link: '#',
  },
  {
    icon: Zap,
    title: 'Entrega Más Rápida',
    description:
      'Nuestras nuevas impresoras de alta velocidad permiten entregas en 24 horas para la mayoría de pedidos estándar. Pedidos urgentes disponibles.',
    link: '#',
  },
  {
    icon: Shield,
    title: 'Garantía de Calidad',
    description:
      'Cada impresión ahora viene con nuestra garantía de satisfacción. Si no estás satisfecho, lo reimprimimos gratis.',
    link: '#',
  },
]

export default function WhatsNew() {
  return (
    <section className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Qué hay de{' '}
            <span className="text-primary">
              Nuevo
            </span>
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            Mantente actualizado con las últimas mejoras y características en Tecnoprints.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item) => (
            <Card key={item.title} className="group">
              {/* Icon placeholder */}
              <div className="aspect-video bg-surface rounded-lg mb-4 flex items-center justify-center">
                <item.icon size={48} className="text-primary/50" />
              </div>

              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-muted text-sm mb-4">{item.description}</p>

              <a
                href={item.link}
                className="inline-flex items-center text-primary text-sm font-medium group-hover:underline"
              >
                Saber Más
                <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </a>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
