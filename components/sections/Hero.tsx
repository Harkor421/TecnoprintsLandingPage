'use client'

import dynamic from 'next/dynamic'
import Button from '@/components/ui/Button'
import AnimatedOrbs from '@/components/ui/AnimatedOrbs'
import { ArrowRight, Zap } from 'lucide-react'

const PrinterScene = dynamic(() => import('@/components/3d/PrinterScene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[400px] md:min-h-[500px] flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  ),
})

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Animated background orbs */}
      <AnimatedOrbs />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface border border-border mb-6">
              <Zap size={16} className="text-primary" />
              <span className="text-sm text-muted">Entrega Rápida</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Impresión{' '}
              <span className="text-primary">
                3D
              </span>{' '}
              de Precisión para tus Ideas
            </h1>

            <p className="text-lg text-muted mb-8 max-w-xl mx-auto lg:mx-0">
              Transforma tus conceptos en realidad con servicios profesionales de impresión 3D en PLA.
              Desde prototipos rápidos hasta piezas personalizadas, entregamos calidad con rapidez.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="group">
                Cotizar Ahora
                <ArrowRight
                  size={18}
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                />
              </Button>
              <Button variant="outline" size="lg">
                Ver Servicios
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-border">
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-white">500+</div>
                <div className="text-sm text-muted">Proyectos Completados</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-white">24h</div>
                <div className="text-sm text-muted">Entrega Rápida</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-white">99%</div>
                <div className="text-sm text-muted">Satisfacción</div>
              </div>
            </div>
          </div>

          {/* 3D Scene */}
          <div className="relative h-[400px] md:h-[500px] lg:h-[600px]">
            <PrinterScene />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs text-muted">Desliza para explorar</span>
        <div className="w-6 h-10 rounded-full border-2 border-border flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-primary rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  )
}
