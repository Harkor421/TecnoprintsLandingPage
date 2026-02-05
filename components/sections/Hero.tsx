'use client'

import Button from '@/components/ui/Button'
import FadeIn from '@/components/ui/FadeIn'
import AnimatedCounter from '@/components/ui/AnimatedCounter'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden pt-16 md:pt-20">
      {/* Clean gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-surface/30" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-20 w-full">
        {/* Centered content */}
        <div className="text-center max-w-4xl mx-auto">
          <FadeIn delay={0.1} duration={0.8}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Soluciones de Impresión{' '}
              <span className="text-primary">3D</span>{' '}
              para Empresas
            </h1>
          </FadeIn>

          <FadeIn delay={0.25} duration={0.8}>
            <p className="text-base sm:text-lg text-muted mb-8 max-w-2xl mx-auto leading-relaxed">
              Desde prototipado rápido hasta producción en serie. Tecnología de precisión,
              tiempos de entrega garantizados y calidad certificada para sus proyectos industriales.
            </p>
          </FadeIn>

          <FadeIn delay={0.4} duration={0.8}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button size="lg" className="group">
                Solicitar Cotización
                <ArrowRight
                  size={18}
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                />
              </Button>
              <Button variant="outline" size="lg">
                Ver Capacidades
              </Button>
            </div>
          </FadeIn>

          {/* Trust indicators */}
          <FadeIn delay={0.55} duration={0.8}>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-primary" />
                <span>ISO 9001 Certificado</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-primary" />
                <span>Entrega en 24-48h</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-primary" />
                <span>Sin Pedido Mínimo</span>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Stats bar */}
        <FadeIn delay={0.7} duration={0.8}>
          <div className="mt-16 sm:mt-20 pt-8 border-t border-border">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto text-center">
              <div>
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1">
                  <AnimatedCounter end={500} suffix="+" />
                </div>
                <div className="text-xs sm:text-sm text-muted uppercase tracking-wider">Proyectos Entregados</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1">
                  <AnimatedCounter end={24} suffix="h" />
                </div>
                <div className="text-xs sm:text-sm text-muted uppercase tracking-wider">Tiempo de Entrega</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1">
                  <AnimatedCounter end={99} suffix="%" />
                </div>
                <div className="text-xs sm:text-sm text-muted uppercase tracking-wider">Satisfacción</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1">
                  <AnimatedCounter end={50} suffix="+" />
                </div>
                <div className="text-xs sm:text-sm text-muted uppercase tracking-wider">Clientes Activos</div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Scroll indicator */}
      <div className="hidden sm:block absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-10">
        <FadeIn delay={0.9} duration={0.8}>
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-muted uppercase tracking-wider">Explorar</span>
            <div className="w-px h-8 bg-gradient-to-b from-primary/50 to-transparent" />
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
