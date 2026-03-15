'use client'

import { useEffect, useState, useRef, useCallback, memo } from 'react'
import ScrollFadeIn from '@/components/ui/ScrollFadeIn'

const API_BASE = 'https://bambufarm-api-production.up.railway.app'
const REFRESH_INTERVAL = 2000

function LivePrinters() {
  const [printers, setPrinters] = useState<string[]>([])
  const [bridgeOnline, setBridgeOnline] = useState(false)

  // Poll for available cameras
  useEffect(() => {
    let active = true
    async function poll() {
      try {
        const res = await fetch(`${API_BASE}/api/public/cameras`)
        if (!res.ok) return
        const data = await res.json()
        if (active) {
          setPrinters(data.printers || [])
          setBridgeOnline(data.bridgeOnline || false)
        }
      } catch {}
    }
    poll()
    const id = setInterval(poll, 10000)
    return () => { active = false; clearInterval(id) }
  }, [])

  if (!bridgeOnline || printers.length === 0) return null

  return (
    <section className="py-16 sm:py-20 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollFadeIn direction="up">
          <div className="text-center mb-10 md:mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-500/10 border border-red-500/20 rounded-full mb-4">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
              </span>
              <span className="text-red-400 text-xs font-semibold uppercase tracking-wider">En Vivo</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              Nuestras Impresoras{' '}
              <span className="text-primary">Trabajando Ahora</span>
            </h2>
            <p className="text-sm sm:text-base text-muted max-w-2xl mx-auto">
              Mira en tiempo real cómo nuestras impresoras producen piezas las 24 horas del día.
            </p>
          </div>
        </ScrollFadeIn>

        <ScrollFadeIn direction="up" delay={0.1}>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {printers.map((printerId, i) => (
              <CameraCard key={printerId} printerId={printerId} index={i} />
            ))}
          </div>
        </ScrollFadeIn>
      </div>
    </section>
  )
}

function CameraCard({ printerId, index }: { printerId: string; index: number }) {
  const imgRef = useRef<HTMLImageElement>(null)
  const [loaded, setLoaded] = useState(false)

  const refresh = useCallback(() => {
    if (imgRef.current) {
      imgRef.current.src = `${API_BASE}/api/public/cameras/${printerId}/frame?t=${Date.now()}`
    }
  }, [printerId])

  useEffect(() => {
    refresh()
    const id = setInterval(refresh, REFRESH_INTERVAL)
    return () => clearInterval(id)
  }, [refresh])

  return (
    <div className="relative bg-surface border border-border rounded-lg overflow-hidden aspect-video group">
      {/* Placeholder shimmer */}
      {!loaded && (
        <div className="absolute inset-0 bg-surface animate-pulse" />
      )}
      <img
        ref={imgRef}
        alt={`Printer ${index + 1}`}
        className="w-full h-full object-cover"
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(false)}
      />
      {/* Live badge */}
      <div className="absolute top-2 left-2 flex items-center gap-1.5 px-2 py-0.5 bg-black/60 backdrop-blur-sm rounded-full">
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500" />
        </span>
        <span className="text-[10px] font-semibold text-white/90 uppercase">Live</span>
      </div>
      {/* Printer number */}
      <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/60 backdrop-blur-sm rounded-full">
        <span className="text-[10px] font-medium text-white/70">Impresora {index + 1}</span>
      </div>
    </div>
  )
}

export default memo(LivePrinters)
