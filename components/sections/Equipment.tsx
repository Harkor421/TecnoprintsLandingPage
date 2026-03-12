'use client'

import { memo } from 'react'
import ScrollFadeIn from '@/components/ui/ScrollFadeIn'
import { Printer, Zap, Layers, Clock } from 'lucide-react'

const printers = [
  {
    name: 'Bambu Lab P1S AMS',
    description:
      'Impresora de alta velocidad con sistema AMS para cambio automático de filamento. Precisión industrial en cada pieza.',
    specs: ['Hasta 500mm/s', 'Cámara cerrada', 'Multi-color con AMS', 'Precisión de 0.05mm'],
  },
  {
    name: 'Bambu Lab A1 AMS',
    description:
      'Velocidad y versatilidad para producción continua. Ideal para lotes grandes con calidad consistente.',
    specs: ['Impresión rápida', 'Multi-material', 'Calibración automática', 'Monitoreo remoto'],
  },
]

const stats = [
  { icon: Printer, value: '20+', label: 'Impresoras Activas' },
  { icon: Zap, value: '500mm/s', label: 'Velocidad Máxima' },
  { icon: Layers, value: '24/7', label: 'Producción Continua' },
  { icon: Clock, value: 'Mismo Día', label: 'Entrega Disponible' },
]

function Equipment() {
  return (
    <section id="equipment" className="py-16 sm:py-20 md:py-32 bg-surface/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollFadeIn direction="up">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              Equipos de{' '}
              <span className="text-primary">Última Generación</span>
            </h2>
            <p className="text-sm sm:text-base text-muted max-w-2xl mx-auto">
              Contamos con más de 20 impresoras Bambu Lab de última generación trabajando
              en simultáneo para garantizar la mayor capacidad y los mejores tiempos de entrega.
            </p>
          </div>
        </ScrollFadeIn>

        {/* Stats */}
        <ScrollFadeIn direction="up" delay={0.1}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-12 md:mb-16">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center p-4 md:p-6 border border-border bg-background">
                <stat.icon size={24} className="mx-auto mb-3 text-primary" />
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-muted">{stat.label}</div>
              </div>
            ))}
          </div>
        </ScrollFadeIn>

        {/* Printers */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {printers.map((printer, index) => (
            <ScrollFadeIn key={printer.name} direction="up" delay={0.15 * (index + 1)}>
              <div className="p-6 md:p-8 border border-border bg-background h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary flex items-center justify-center">
                    <Printer size={20} className="text-black" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold">{printer.name}</h3>
                </div>
                <p className="text-sm text-muted mb-5">{printer.description}</p>
                <ul className="space-y-2">
                  {printer.specs.map((spec) => (
                    <li key={spec} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-primary" />
                      {spec}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollFadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

export default memo(Equipment)
