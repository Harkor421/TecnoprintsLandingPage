'use client'

import { useEffect, useState, memo } from 'react'
import ScrollFadeIn from '@/components/ui/ScrollFadeIn'

const API_BASE = 'https://bambufarm-api-production.up.railway.app'
const REFRESH_INTERVAL = 3000

const PRINTER_NAMES: Record<string, string> = {
  '01P00C511300712': 'P1S-AMS-1',
  '01P09C4B1601273': 'P1S-AMS-3',
  '01P09C4B1601189': 'P1S-AMS-2',
  '01P00C582701111': 'P1S-2',
  '01P00C582701216': 'P1S-1',
}

function LivePrinters() {
  const [printers, setPrinters] = useState<string[]>([])
  const [bridgeOnline, setBridgeOnline] = useState(false)

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

  // Top row: first 3, bottom row: remaining (centered)
  const topRow = printers.slice(0, 3)
  const bottomRow = printers.slice(3)

  return (
    <section className="py-16 sm:py-20 md:py-32 bg-background relative overflow-hidden">
      {/* Subtle radial glow behind the grid */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-primary/[0.03] rounded-full blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <ScrollFadeIn direction="up">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-full mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
              </span>
              <span className="text-red-400 text-xs font-semibold uppercase tracking-widest">En Vivo</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              Mira Algunas de Nuestras Impresoras{' '}
              <span className="text-primary">Trabajando Ahora</span>
            </h2>
            <p className="text-sm sm:text-base text-muted max-w-xl mx-auto">
              {printers.length} impresoras produciendo piezas en este momento para nuestros clientes.
            </p>
          </div>
        </ScrollFadeIn>

        {/* Top row */}
        <ScrollFadeIn direction="up" delay={0.1}>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5 mb-4 md:mb-5">
            {topRow.map((printerId, i) => (
              <CameraCard key={printerId} printerId={printerId} index={i} />
            ))}
          </div>
        </ScrollFadeIn>

        {/* Bottom row — centered */}
        {bottomRow.length > 0 && (
          <ScrollFadeIn direction="up" delay={0.2}>
            <div className="flex justify-center gap-4 md:gap-5">
              {bottomRow.map((printerId, i) => (
                <div key={printerId} className="w-[calc(50%-8px)] md:w-[calc(33.333%-14px)]">
                  <CameraCard printerId={printerId} index={topRow.length + i} />
                </div>
              ))}
            </div>
          </ScrollFadeIn>
        )}

        {/* Active printers count */}
        <ScrollFadeIn direction="up" delay={0.3}>
          <div className="mt-8 md:mt-10 flex items-center justify-center gap-3">
            <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-transparent to-border" />
            <p className="text-xs text-muted/60 uppercase tracking-widest font-medium">
              Transmisión en directo desde Barranquilla
            </p>
            <div className="h-px flex-1 max-w-[80px] bg-gradient-to-l from-transparent to-border" />
          </div>
        </ScrollFadeIn>
      </div>
    </section>
  )
}

function CameraCard({ printerId, index }: { printerId: string; index: number }) {
  const [tick, setTick] = useState(Date.now())
  const [loaded, setLoaded] = useState(false)
  const name = PRINTER_NAMES[printerId] || `Impresora ${index + 1}`

  useEffect(() => {
    const id = setInterval(() => setTick(Date.now()), REFRESH_INTERVAL)
    return () => clearInterval(id)
  }, [])

  const src = `${API_BASE}/api/public/cameras/${printerId}/frame?t=${tick}`

  return (
    <div className="relative group rounded-xl overflow-hidden bg-surface border border-border/60 hover:border-primary/30 transition-all duration-300">
      {/* Image container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        {!loaded && (
          <div className="absolute inset-0 bg-surface animate-pulse" />
        )}
        <img
          src={src}
          alt={name}
          style={{ filter: 'brightness(1.15)' }}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          onLoad={() => setLoaded(true)}
          onError={() => setLoaded(false)}
        />

        {/* Gradient overlay — subtle, bottom only */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

        {/* Live badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 bg-black/50 backdrop-blur-md rounded-full border border-white/10">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500" />
          </span>
          <span className="text-[10px] font-bold text-white/90 uppercase tracking-wider">Live</span>
        </div>

        {/* Printer name */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
          <div>
            <p className="text-white font-semibold text-sm leading-tight">{name}</p>
            <p className="text-white/50 text-[10px] mt-0.5">Bambu Lab</p>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-0.5 bg-primary/20 rounded-full border border-primary/30">
            <span className="w-1 h-1 rounded-full bg-primary" />
            <span className="text-[9px] font-semibold text-primary uppercase">Activa</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(LivePrinters)
