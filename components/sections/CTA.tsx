'use client'

import { useEffect, useRef, memo } from 'react'
import Button from '@/components/ui/Button'
import { ArrowRight } from 'lucide-react'
import { CTA_BENEFITS } from '@/lib/constants'

function CTA() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {})
    }
  }, [])

  return (
    <section className="py-20 md:py-32 bg-surface/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Video */}
          <div className="relative aspect-video bg-surface overflow-hidden border border-border">
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              controls={false}
              disablePictureInPicture
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            >
              <source src="/background-video.mp4" type="video/mp4" />
            </video>
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
              {CTA_BENEFITS.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm">
                  <div className="w-1.5 h-1.5 bg-primary" />
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

export default memo(CTA)
