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
    <section id="services" className="py-16 sm:py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
            Nuestros{' '}
            <span className="text-primary">
              Servicios
            </span>
          </h2>
          <p className="text-sm sm:text-base text-muted max-w-2xl mx-auto px-4">
            Desde prototipos individuales hasta producción en lotes, ofrecemos soluciones
            integrales de impresión 3D adaptadas a tus necesidades.
          </p>
        </div>

        {/* Service Tabs - Horizontal scroll on mobile */}
        <div className="relative mb-8 sm:mb-12">
          <div className="flex sm:flex-wrap sm:justify-center gap-2 overflow-x-auto pb-2 px-1 -mx-4 sm:mx-0 sm:px-0 scrollbar-hide">
            <div className="flex sm:flex-wrap sm:justify-center gap-2 px-4 sm:px-0">
              {services.map((service) => (
                <button
                  key={service.id}
                  onClick={() => setActiveService(service.id)}
                  className={cn(
                    'flex items-center gap-2 px-3 sm:px-4 py-2.5 sm:py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap touch-manipulation flex-shrink-0',
                    activeService === service.id
                      ? 'bg-primary text-black'
                      : 'bg-surface border border-border text-muted hover:text-white hover:border-primary active:bg-surface/80'
                  )}
                >
                  <service.icon size={18} className="flex-shrink-0" />
                  <span className="hidden xs:inline sm:inline">{service.title}</span>
                  <span className="xs:hidden sm:hidden">{service.title.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Service Content */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary mb-4 sm:mb-6">
              <currentService.icon size={20} className="text-black sm:w-6 sm:h-6" />
            </div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">{currentService.title}</h3>
            <p className="text-sm sm:text-base text-muted mb-4 sm:mb-6">{currentService.description}</p>

            <ul className="space-y-2 sm:space-y-3">
              {currentService.features.map((feature) => (
                <li key={feature} className="flex items-start sm:items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5 sm:mt-0">
                    <Check size={12} className="text-primary" />
                  </div>
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Placeholder Image */}
          <Card className="aspect-video flex items-center justify-center bg-surface order-1 lg:order-2">
            <div className="text-center">
              <currentService.icon size={48} className="mx-auto mb-3 sm:mb-4 text-primary/50 sm:w-16 sm:h-16" />
              <p className="text-sm text-muted">Ilustración del servicio</p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
