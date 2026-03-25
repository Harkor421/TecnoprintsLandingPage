'use client'

import { memo } from 'react'

function Partners() {
  return (
    <section className="py-16 md:py-20 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm text-muted tracking-wide">
            Empresas que confían en nosotros
          </p>
        </div>

        {/* LED Banner with graphite texture */}
        <div className="relative w-full h-20 md:h-24 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-xl overflow-hidden border border-slate-700/50 shadow-lg">
          {/* Graphite texture overlay */}
          <div
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' result='noise' /%3E%3C/filter%3E%3Crect width='100' height='100' fill='%23ffffff' filter='url(%23noise)' opacity='0.1'/%3E%3C/svg%3E")`,
              backgroundSize: '200px 200px',
            }}
          />

          {/* Scrolling text container */}
          <div className="relative h-full flex items-center">
            <style>{`
              @keyframes ledScroll {
                0% { transform: translateX(100%); }
                100% { transform: translateX(-100%); }
              }
              .led-banner { animation: ledScroll 15s linear infinite; }
            `}</style>

            <div className="led-banner whitespace-nowrap flex items-center gap-12 px-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center gap-12 shrink-0">
                  <span className="text-lg md:text-2xl font-bold text-white/80 tracking-wider">
                    DEGENTECH
                  </span>
                  <span className="text-white/30 text-xl">•</span>
                  <span className="text-lg md:text-2xl font-bold text-white/80 tracking-wider">
                    CENTRO INCA
                  </span>
                  <span className="text-white/30 text-xl">•</span>
                </div>
              ))}
            </div>
          </div>

          {/* Fade edges for smooth effect */}
          <div className="absolute top-0 left-0 w-16 h-full bg-gradient-to-r from-slate-900 to-transparent pointer-events-none" />
          <div className="absolute top-0 right-0 w-16 h-full bg-gradient-to-l from-slate-900 to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  )
}

export default memo(Partners)
