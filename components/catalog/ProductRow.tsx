'use client'

import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import ProductCard, { ProductCardModel } from './ProductCard'

export default function ProductRow({
  title,
  subtitle,
  models,
  loading,
  emoji,
}: {
  title: string
  subtitle?: string
  models: ProductCardModel[]
  loading?: boolean
  emoji?: string
}) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scrollBy = (delta: number) => {
    scrollRef.current?.scrollBy({ left: delta, behavior: 'smooth' })
  }

  return (
    <section className="mb-10 sm:mb-12">
      <div className="flex items-end justify-between mb-3 sm:mb-4 px-1">
        <div>
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white flex items-center gap-2">
            {emoji && <span>{emoji}</span>}
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs sm:text-sm text-muted mt-0.5">{subtitle}</p>
          )}
        </div>

        <div className="hidden sm:flex items-center gap-1.5">
          <button
            onClick={() => scrollBy(-400)}
            className="p-1.5 rounded-full bg-surface border border-border hover:border-primary/40 hover:text-primary text-muted transition-all"
            aria-label="Anterior"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => scrollBy(400)}
            className="p-1.5 rounded-full bg-surface border border-border hover:border-primary/40 hover:text-primary text-muted transition-all"
            aria-label="Siguiente"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex gap-3 sm:gap-4 overflow-hidden -mx-4 px-4 sm:-mx-1 sm:px-1">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="min-w-[170px] sm:min-w-[200px] bg-surface border border-border rounded-lg overflow-hidden flex-shrink-0"
            >
              {/* Image shimmer */}
              <div className="aspect-square bg-gradient-to-r from-surface via-border/40 to-surface animate-shimmer bg-[length:200%_100%]" />
              {/* Content shimmer */}
              <div className="p-2.5 sm:p-3 space-y-2">
                <div className="h-3 bg-gradient-to-r from-surface via-border/40 to-surface animate-shimmer bg-[length:200%_100%] rounded w-full" />
                <div className="h-3 bg-gradient-to-r from-surface via-border/40 to-surface animate-shimmer bg-[length:200%_100%] rounded w-2/3" />
                <div className="h-7 bg-gradient-to-r from-surface via-border/40 to-surface animate-shimmer bg-[length:200%_100%] rounded mt-3" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div
          ref={scrollRef}
          className="flex gap-3 sm:gap-4 overflow-x-auto pb-2 -mx-4 px-4 sm:-mx-1 sm:px-1 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: 'none' }}
        >
          {models.map((model, idx) => (
            <div key={model.id} className="snap-start">
              <ProductCard model={model} priority={idx < 4} />
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
