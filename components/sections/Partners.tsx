'use client'

import { memo } from 'react'

const PARTNERS = ['DEGENTECH', 'CENTRO INCA']

function Partners() {
  const items = [...PARTNERS, ...PARTNERS, ...PARTNERS, ...PARTNERS]

  return (
    <section className="py-12 md:py-16 bg-background overflow-hidden">
      <div className="text-center mb-8">
        <p className="text-xs text-muted/60 uppercase tracking-[0.2em] font-medium">
          Empresas que confían en nosotros
        </p>
      </div>

      {/* LED Banner */}
      <div className="relative w-full h-14 md:h-16 bg-[#0f1115] overflow-hidden border-y border-white/[0.04]">
        {/* Subtle grain texture */}
        <div
          className="absolute inset-0 opacity-[0.15] pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='256' height='256' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
            backgroundSize: '128px 128px',
          }}
        />

        {/* Marquee track */}
        <div className="relative h-full flex items-center">
          <div className="flex animate-marquee">
            {items.map((name, i) => (
              <div key={i} className="flex items-center shrink-0">
                <span className="text-sm md:text-base font-semibold text-white/50 tracking-[0.15em] uppercase px-8 md:px-12">
                  {name}
                </span>
                <span className="text-white/15 text-xs">◆</span>
              </div>
            ))}
          </div>
          <div className="flex animate-marquee" aria-hidden>
            {items.map((name, i) => (
              <div key={i} className="flex items-center shrink-0">
                <span className="text-sm md:text-base font-semibold text-white/50 tracking-[0.15em] uppercase px-8 md:px-12">
                  {name}
                </span>
                <span className="text-white/15 text-xs">◆</span>
              </div>
            ))}
          </div>
        </div>

        {/* Fade edges */}
        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#0f1115] to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#0f1115] to-transparent pointer-events-none z-10" />
      </div>
    </section>
  )
}

export default memo(Partners)
