'use client'

import Button from '@/components/ui/Button'
import { ArrowRight, Play } from 'lucide-react'

export default function CTA() {
  return (
    <section className="py-20 md:py-32 bg-surface/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Video placeholder */}
          <div className="relative aspect-video bg-surface rounded-2xl overflow-hidden border border-border">
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="w-16 h-16 rounded-full bg-primary flex items-center justify-center hover:scale-110 transition-transform">
                <Play size={24} className="text-black ml-1" />
              </button>
            </div>
            <div className="absolute bottom-4 left-4 flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-background/80 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
              </div>
              <span className="text-sm text-white/80">Ver cómo funciona</span>
            </div>
          </div>

          {/* Content */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Comienza a{' '}
              <span className="text-primary">
                Fabricar
              </span>{' '}
              Hoy
            </h2>
            <p className="text-muted mb-6">
              Únete a cientos de makers, ingenieros y empresas que confían en Tecnoprints
              para sus necesidades de impresión 3D. Desde prototipos individuales hasta producción en serie,
              te tenemos cubierto.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                'Sin cantidad mínima de pedido',
                'Cotizaciones en línea instantáneas',
                'Equipo de soporte experto',
                'Opciones de envío rápido',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
            <Button size="lg" className="group">
              Comenzar Ahora
              <ArrowRight
                size={18}
                className="ml-2 group-hover:translate-x-1 transition-transform"
              />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
