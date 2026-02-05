'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import Card from '@/components/ui/Card'
import { Box, Layers, Cog, Palette, Check } from 'lucide-react'

const services = [
  {
    id: 'custom-parts',
    icon: Box,
    title: 'Piezas Personalizadas',
    description:
      'Obtén piezas personalizadas fabricadas según tus especificaciones exactas. Perfectas para repuestos, componentes únicos y aplicaciones especializadas.',
    features: [
      'Precisión dimensional hasta 0.1mm',
      'Amplia gama de colores disponibles',
      'Opciones de post-procesado',
      'Inspección de calidad incluida',
    ],
    image: '/placeholder-custom.jpg',
  },
  {
    id: 'prototyping',
    icon: Layers,
    title: 'Prototipado Rápido',
    description:
      'Itera rápidamente en tus diseños con prototipos de entrega rápida. Prueba forma, ajuste y función antes de comprometerte con la producción.',
    features: [
      'Entrega en 24-48 horas',
      'Soporte para múltiples iteraciones',
      'Retroalimentación de diseño incluida',
      'Pruebas económicas',
    ],
    image: '/placeholder-prototype.jpg',
  },
  {
    id: 'small-batch',
    icon: Cog,
    title: 'Producción en Lotes',
    description:
      'Escala del prototipado a producción en lotes pequeños. Ideal para ediciones limitadas, programas piloto y pruebas de mercado.',
    features: [
      'Calidad consistente en todos los lotes',
      'Descuentos por volumen disponibles',
      'Cantidades flexibles (10-500 unidades)',
      'Opciones de empaque',
    ],
    image: '/placeholder-batch.jpg',
  },
  {
    id: 'design',
    icon: Palette,
    title: 'Servicios de Diseño',
    description:
      '¿Necesitas ayuda con modelado 3D? Nuestro equipo de diseño puede ayudar a dar vida a tus ideas, desde bocetos hasta archivos listos para imprimir.',
    features: [
      'Modelado CAD y optimización',
      'Diseño para manufactura',
      'Conversión y reparación de archivos',
      'Consultoría incluida',
    ],
    image: '/placeholder-design.jpg',
  },
]

export default function Services() {
  const [activeService, setActiveService] = useState(services[0].id)

  const currentService = services.find((s) => s.id === activeService)!

  return (
    <section id="services" className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Nuestros{' '}
            <span className="text-primary">
              Servicios
            </span>
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            Desde prototipos individuales hasta producción en lotes, ofrecemos soluciones
            integrales de impresión 3D adaptadas a tus necesidades.
          </p>
        </div>

        {/* Service Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {services.map((service) => (
            <button
              key={service.id}
              onClick={() => setActiveService(service.id)}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all',
                activeService === service.id
                  ? 'bg-primary text-black'
                  : 'bg-surface border border-border text-muted hover:text-white hover:border-primary'
              )}
            >
              <service.icon size={18} />
              {service.title}
            </button>
          ))}
        </div>

        {/* Service Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary mb-6">
              <currentService.icon size={24} className="text-black" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">{currentService.title}</h3>
            <p className="text-muted mb-6">{currentService.description}</p>

            <ul className="space-y-3">
              {currentService.features.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                    <Check size={12} className="text-primary" />
                  </div>
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Placeholder Image */}
          <Card className="aspect-video flex items-center justify-center bg-surface">
            <div className="text-center">
              <currentService.icon size={64} className="mx-auto mb-4 text-primary/50" />
              <p className="text-muted">Ilustración del servicio</p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
