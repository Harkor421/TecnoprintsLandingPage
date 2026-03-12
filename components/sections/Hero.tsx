'use client'

import { useEffect, useRef, memo } from 'react'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import FadeIn from '@/components/ui/FadeIn'
import AnimatedCounter from '@/components/ui/AnimatedCounter'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { HERO_STATS, HERO_FEATURES, ANIMATION } from '@/lib/constants'

function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // Force play on mobile
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay was prevented, video will show first frame
      })
    }
  }, [])

  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden pt-16 md:pt-20">
      {/* Video background */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          controls={false}
          disablePictureInPicture
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          style={{ objectPosition: 'center center' }}
        >
          <source src="/background-video.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/50" />
        {/* Gradient fade at edges */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-background/60" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-20 w-full">
        {/* Centered content */}
        <div className="text-center max-w-4xl mx-auto">
          <FadeIn delay={0.1} duration={0.8}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Impresión{' '}
              <span className="text-primary">3D</span>{' '}
              en Barranquilla
            </h1>
          </FadeIn>

          <FadeIn delay={0.25} duration={0.8}>
            <p className="text-base sm:text-lg text-muted mb-8 max-w-2xl mx-auto leading-relaxed">
              Servicio profesional de impresión 3D en Barranquilla. Prototipado rápido, maquetas,
              piezas personalizadas. Cotiza gratis y recibe tu pedido el mismo día.
            </p>
          </FadeIn>

          <FadeIn delay={0.4} duration={0.8}>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 px-4 sm:px-0">
              <Link href="https://wa.me/573239267656" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button size="lg" className="group w-full sm:w-auto">
                  Solicitar Cotización
                  <ArrowRight
                    size={18}
                    className="ml-2 group-hover:translate-x-1 transition-transform"
                  />
                </Button>
              </Link>
              <Link href="#quote" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Estimar Cotización en Línea
                </Button>
              </Link>
            </div>
          </FadeIn>

          {/* Trust indicators */}
          <FadeIn delay={0.55} duration={0.8}>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted">
              {HERO_FEATURES.map((feature) => (
                <div key={feature} className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-primary" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>

        {/* Stats bar */}
        <FadeIn delay={0.7} duration={0.8}>
          <div className="mt-16 sm:mt-20 pt-8 border-t border-border/50">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto text-center">
              {HERO_STATS.map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1">
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs sm:text-sm text-muted uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
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

export default memo(Hero)
