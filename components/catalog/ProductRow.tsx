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
        <div className="flex gap-3 sm:gap-4 overflow-hidden">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="min-w-[170px] sm:min-w-[200px] aspect-[3/4] bg-surface/50 rounded-lg animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div
          ref={scrollRef}
          className="flex gap-3 sm:gap-4 overflow-x-auto pb-2 -mx-4 px-4 sm:-mx-1 sm:px-1 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: 'none' }}
        >
          {models.map((model) => (
            <div key={model.id} className="snap-start">
              <ProductCard model={model} />
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
