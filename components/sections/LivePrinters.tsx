'use client'

import { useEffect, useState, memo, useCallback } from 'react'
import Image from 'next/image'
import ScrollFadeIn from '@/components/ui/ScrollFadeIn'

const API_BASE = 'https://bambufarm-api-production.up.railway.app'
const REFRESH_INTERVAL = 1500

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
  const [selectedPrinter, setSelectedPrinter] = useState<string | null>(null)

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

  // Close modal on Escape
  useEffect(() => {
    if (!selectedPrinter) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setSelectedPrinter(null) }
    document.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [selectedPrinter])

  if (!bridgeOnline || printers.length === 0) return null

  const topRow = printers.slice(0, 3)
  const bottomRow = printers.slice(3)

  return (
    <>
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
                <CameraCard key={printerId} printerId={printerId} index={i} onClick={() => setSelectedPrinter(printerId)} />
              ))}
            </div>
          </ScrollFadeIn>

          {/* Bottom row — centered */}
          {bottomRow.length > 0 && (
            <ScrollFadeIn direction="up" delay={0.2}>
              <div className="flex justify-center gap-4 md:gap-5">
                {bottomRow.map((printerId, i) => (
                  <div key={printerId} className="w-[calc(50%-8px)] md:w-[calc(33.333%-14px)]">
                    <CameraCard printerId={printerId} index={topRow.length + i} onClick={() => setSelectedPrinter(printerId)} />
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

      {/* Fullscreen modal */}
      {selectedPrinter && (
        <CameraModal
          printerId={selectedPrinter}
          onClose={() => setSelectedPrinter(null)}
          onPrev={() => {
            const idx = printers.indexOf(selectedPrinter)
            setSelectedPrinter(printers[(idx - 1 + printers.length) % printers.length])
          }}
          onNext={() => {
            const idx = printers.indexOf(selectedPrinter)
            setSelectedPrinter(printers[(idx + 1) % printers.length])
          }}
          current={printers.indexOf(selectedPrinter) + 1}
          total={printers.length}
        />
      )}
    </>
  )
}

function CameraModal({ printerId, onClose, onPrev, onNext, current, total }: {
  printerId: string
  onClose: () => void
  onPrev: () => void
  onNext: () => void
  current: number
  total: number
}) {
  const [tick, setTick] = useState(Date.now())
  const name = PRINTER_NAMES[printerId] || `Impresora ${current}`

  useEffect(() => {
    const id = setInterval(() => setTick(Date.now()), REFRESH_INTERVAL)
    return () => clearInterval(id)
  }, [])

  const src = `${API_BASE}/api/public/cameras/${printerId}/frame?t=${tick}`

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />

      {/* Content */}
      <div className="relative w-full max-w-5xl mx-4" onClick={(e) => e.stopPropagation()}>
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white/60 hover:text-white transition-colors text-sm font-medium flex items-center gap-2"
        >
          <span>Cerrar</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Image */}
        <div className="relative rounded-2xl overflow-hidden bg-surface border border-border/40">
          <Image
            src={src}
            alt={name}
            fill
            style={{ filter: 'brightness(1.15)' }}
            className="aspect-video object-cover"
          />

          {/* Bottom bar */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-5 pt-12">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-white font-bold text-xl">{name}</p>
                <p className="text-white/50 text-sm mt-0.5">Bambu Lab</p>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-red-500/20 rounded-full border border-red-500/30">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                </span>
                <span className="text-xs font-bold text-red-400 uppercase tracking-wider">En Vivo</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-4">
          <button
            onClick={onPrev}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white transition-all text-sm"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Anterior
          </button>

          <span className="text-white/40 text-sm">{current} / {total}</span>

          <button
            onClick={onNext}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white transition-all text-sm"
          >
            Siguiente
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

function CameraCard({ printerId, index, onClick }: { printerId: string; index: number; onClick: () => void }) {
  const [tick, setTick] = useState(Date.now())
  const [loaded, setLoaded] = useState(false)
  const name = PRINTER_NAMES[printerId] || `Impresora ${index + 1}`

  useEffect(() => {
    const id = setInterval(() => setTick(Date.now()), REFRESH_INTERVAL)
    return () => clearInterval(id)
  }, [])

  const src = `${API_BASE}/api/public/cameras/${printerId}/frame?t=${tick}`

  return (
    <div
      className="relative group rounded-xl overflow-hidden bg-surface border border-border/60 hover:border-primary/30 transition-all duration-300 cursor-pointer"
      onClick={onClick}
    >
      {/* Image container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        {!loaded && (
          <div className="absolute inset-0 bg-surface animate-pulse" />
        )}
        <Image
          src={src}
          alt={name}
          fill
          style={{ filter: 'brightness(1.15)' }}
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          onLoad={() => setLoaded(true)}
          onError={() => setLoaded(false)}
        />

        {/* Gradient overlay — subtle, bottom only */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

        {/* Expand hint on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center border border-white/20">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 3 21 3 21 9" /><polyline points="9 21 3 21 3 15" />
              <line x1="21" y1="3" x2="14" y2="10" /><line x1="3" y1="21" x2="10" y2="14" />
            </svg>
          </div>
        </div>

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
