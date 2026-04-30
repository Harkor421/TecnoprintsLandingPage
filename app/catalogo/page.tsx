'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Search, Loader2, ShoppingCart, Sparkles, TrendingUp, Award, Flame } from 'lucide-react'
import ProductRow from '@/components/catalog/ProductRow'
import ProductCard, { ProductCardModel } from '@/components/catalog/ProductCard'
import { useCart } from '@/lib/cart'

const API_BASE = 'https://tecnoprints-api-production.up.railway.app'

const POPULAR_SEARCHES = [
  'llavero', 'maceta', 'organizador', 'soporte celular',
  'lámpara', 'figura', 'caja', 'engranaje', 'juguete', 'decoracion',
]

interface ApiModel {
  id: number
  title: string
  cover: string
  url: string
  likeCount: number
  downloadCount: number
  printCount: number
  creator: string
}

type SortMode = 'recommend' | 'hot' | 'newest' | 'mostLiked' | 'mostDownloaded' | 'mostPrinted' | 'mostCollected'

async function fetchModels(opts: {
  page?: number
  keyword?: string
  sort?: SortMode
  limit?: number
} = {}): Promise<ApiModel[]> {
  const params = new URLSearchParams()
  params.set('page', String(opts.page ?? 1))
  if (opts.keyword) params.set('keyword', opts.keyword)
  if (opts.sort) params.set('sort', opts.sort)
  if (opts.limit) params.set('limit', String(opts.limit))
  try {
    const res = await fetch(`${API_BASE}/api/models?${params}`)
    const data = await res.json()
    return data.models || []
  } catch {
    return []
  }
}

export default function CatalogoPage() {
  const { totalItems } = useCart()

  // Sections
  const [recommended, setRecommended] = useState<ApiModel[]>([])
  const [topDownloaded, setTopDownloaded] = useState<ApiModel[]>([])
  const [mostLiked, setMostLiked] = useState<ApiModel[]>([])
  const [trending, setTrending] = useState<ApiModel[]>([])
  const [loadingSections, setLoadingSections] = useState(true)

  // Search/browse
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<ApiModel[]>([])
  const [searchTotal, setSearchTotal] = useState(0)
  const [searchPage, setSearchPage] = useState(1)
  const [searchLoading, setSearchLoading] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const [searched, setSearched] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  // Load recommendation sections — each section uses a real MakerWorld sort
  useEffect(() => {
    let cancelled = false
    async function loadSections() {
      // Fire each section in parallel with distinct sort modes
      const [recommendData, downloadedData, likedData, hotData] = await Promise.all([
        fetchModels({ sort: 'recommend', limit: 12 }),
        fetchModels({ sort: 'mostDownloaded', limit: 12 }),
        fetchModels({ sort: 'mostLiked', limit: 12 }),
        fetchModels({ sort: 'hot', limit: 12 }),
      ])

      if (cancelled) return

      setRecommended(recommendData)
      setTopDownloaded(downloadedData)
      setMostLiked(likedData)
      setTrending(hotData)
      setLoadingSections(false)
    }
    loadSections()
    return () => { cancelled = true }
  }, [])

  const SEARCH_PAGE_SIZE = 36

  const handleSearch = useCallback(async (overrideQuery?: string) => {
    const q = (overrideQuery || searchQuery).trim()
    if (!q) return

    setSearchLoading(true)
    setSearched(true)
    setSearchPage(1)

    try {
      const params = new URLSearchParams({
        page: '1',
        keyword: q,
        limit: String(SEARCH_PAGE_SIZE),
      })
      const res = await fetch(`${API_BASE}/api/models?${params}`)
      const data = await res.json()
      setSearchResults(data.models || [])
      setSearchTotal(data.total || 0)
      setTimeout(() => {
        searchRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    } catch {
      setSearchResults([])
      setSearchTotal(0)
    } finally {
      setSearchLoading(false)
    }
  }, [searchQuery])

  const handleLoadMore = useCallback(async () => {
    if (loadingMore) return
    const next = searchPage + 1
    setLoadingMore(true)
    try {
      const params = new URLSearchParams({
        page: String(next),
        keyword: searchQuery.trim(),
        limit: String(SEARCH_PAGE_SIZE),
      })
      const res = await fetch(`${API_BASE}/api/models?${params}`)
      const data = await res.json()
      setSearchResults((prev) => [...prev, ...(data.models || [])])
      setSearchPage(next)
    } catch { /* ignore */ }
    finally { setLoadingMore(false) }
  }, [searchPage, searchQuery, loadingMore])

  // Infinite scroll: observe sentinel and trigger loadMore when in view
  const sentinelRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!searched) return
    const sentinel = sentinelRef.current
    if (!sentinel) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loadingMore && searchResults.length < searchTotal) {
          handleLoadMore()
        }
      },
      { rootMargin: '600px 0px' } // Pre-load 600px before sentinel enters view
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [searched, loadingMore, searchResults.length, searchTotal, handleLoadMore])

  const handleQuickSearch = (term: string) => {
    setSearchQuery(term)
    handleSearch(term)
  }

  return (
    <div className="min-h-screen bg-background pt-16 sm:pt-24 pb-16">

      {/* Sticky search bar — Amazon-style on mobile */}
      <div className="sticky top-16 z-30 bg-background/95 backdrop-blur-md border-b border-border/40 -mx-0 sm:relative sm:top-0 sm:bg-transparent sm:backdrop-blur-none sm:border-0">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-0">

          {/* Title — only on desktop */}
          <div className="hidden sm:flex items-center justify-between flex-wrap gap-3 mb-6 sm:pt-0">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Catálogo de <span className="text-primary">Modelos 3D</span>
              </h1>
              <p className="text-sm sm:text-base text-muted">
                Más de 1,900+ modelos listos para imprimir. Elige los que quieras y nosotros los hacemos.
              </p>
            </div>

            {totalItems > 0 && (
              <Link
                href="/carrito"
                className="flex items-center gap-2 px-4 py-2.5 bg-primary text-black font-semibold text-sm rounded-lg hover:bg-primary-dark transition-colors"
              >
                <ShoppingCart size={16} />
                Ver carrito ({totalItems})
              </Link>
            )}
          </div>

          {/* Search bar */}
          <form
            onSubmit={(e) => { e.preventDefault(); handleSearch() }}
            className="flex gap-2 max-w-2xl"
          >
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Busca un modelo 3D..."
                className="w-full pl-9 pr-3 py-2.5 sm:py-3 bg-surface border border-border rounded-lg text-sm placeholder:text-muted/60 focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={searchLoading || !searchQuery.trim()}
              className="px-4 sm:px-5 py-2.5 sm:py-3 bg-primary text-black font-semibold text-sm rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50"
            >
              {searchLoading ? <Loader2 size={16} className="animate-spin" /> : 'Buscar'}
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">

        {/* Mobile-only: title strip + cart pill */}
        <div className="sm:hidden flex items-center justify-between gap-2 py-3 mb-2">
          <div className="min-w-0 flex-1">
            <h1 className="text-lg font-bold leading-tight truncate">
              Catálogo <span className="text-primary">3D</span>
            </h1>
            <p className="text-[11px] text-muted truncate">+1,900 modelos listos para imprimir</p>
          </div>
          {totalItems > 0 && (
            <Link
              href="/carrito"
              className="flex-shrink-0 flex items-center gap-1.5 px-3 py-2 bg-primary text-black font-semibold text-xs rounded-full"
            >
              <ShoppingCart size={14} />
              {totalItems}
            </Link>
          )}
        </div>

        {/* Quick category chips — horizontal scroll on mobile */}
        <div className="-mx-3 sm:mx-0 px-3 sm:px-0 mb-4 sm:mb-8 overflow-x-auto scrollbar-hide">
          <div className="flex gap-2 sm:flex-wrap min-w-max sm:min-w-0">
            {POPULAR_SEARCHES.map((term) => (
              <button
                key={term}
                onClick={() => handleQuickSearch(term)}
                className={`flex-shrink-0 px-3 py-1.5 border rounded-full text-xs whitespace-nowrap transition-colors ${
                  searched && searchQuery === term
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border text-muted hover:border-primary/50 hover:text-white'
                }`}
              >
                {term}
              </button>
            ))}
          </div>
        </div>

        {/* Sections (only show if no search) */}
        {!searched && (
          <>
            <ProductRow
              title="Recomendados para ti"
              subtitle="Selección curada por MakerWorld"
              models={recommended}
              loading={loadingSections}
              emoji="✨"
            />

            <ProductRow
              title="Más Descargados"
              subtitle="Los modelos con más descargas entre los más populares"
              models={topDownloaded}
              loading={loadingSections}
              emoji="🔥"
            />

            <ProductRow
              title="Más Populares"
              subtitle="Los modelos con más likes de la comunidad"
              models={mostLiked}
              loading={loadingSections}
              emoji="❤️"
            />

            <ProductRow
              title="En Tendencia"
              subtitle="Lo más caliente del momento"
              models={trending}
              loading={loadingSections}
              emoji="📈"
            />
          </>
        )}

        {/* Search results */}
        {searched && (
          <div ref={searchRef} className="scroll-mt-32 sm:scroll-mt-24">
            <div className="flex items-center justify-between mb-3 sm:mb-4 gap-3">
              <div className="min-w-0 flex-1">
                <h2 className="text-base sm:text-xl md:text-2xl font-bold truncate">
                  Resultados: <span className="text-primary">“{searchQuery}”</span>
                </h2>
                <p className="text-[11px] sm:text-sm text-muted mt-0.5">
                  {searchTotal.toLocaleString()} modelos encontrados
                </p>
              </div>
              <button
                onClick={() => {
                  setSearched(false)
                  setSearchResults([])
                  setSearchQuery('')
                }}
                className="flex-shrink-0 text-[11px] sm:text-xs text-muted hover:text-primary active:text-primary transition-colors px-2 py-1"
              >
                ← Volver
              </button>
            </div>

            {searchLoading && searchResults.length === 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="bg-surface border border-border rounded-lg overflow-hidden">
                    <div className="aspect-square bg-gradient-to-r from-surface via-border/40 to-surface animate-shimmer bg-[length:200%_100%]" />
                    <div className="p-2.5 sm:p-3 space-y-2">
                      <div className="h-3 bg-gradient-to-r from-surface via-border/40 to-surface animate-shimmer bg-[length:200%_100%] rounded w-full" />
                      <div className="h-3 bg-gradient-to-r from-surface via-border/40 to-surface animate-shimmer bg-[length:200%_100%] rounded w-2/3" />
                      <div className="h-7 bg-gradient-to-r from-surface via-border/40 to-surface animate-shimmer bg-[length:200%_100%] rounded mt-3" />
                    </div>
                  </div>
                ))}
              </div>
            ) : searchResults.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-muted">No se encontraron modelos. Intenta con otra búsqueda.</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
                  {searchResults.map((model, idx) => (
                    <ProductCard key={model.id} model={model} size="lg" priority={idx < 5} />
                  ))}
                  {loadingMore && Array.from({ length: 10 }).map((_, i) => (
                    <div key={`sk-${i}`} className="bg-surface border border-border rounded-lg overflow-hidden">
                      <div className="aspect-square bg-gradient-to-r from-surface via-border/40 to-surface animate-shimmer bg-[length:200%_100%]" />
                      <div className="p-2.5 sm:p-3 space-y-2">
                        <div className="h-3 bg-gradient-to-r from-surface via-border/40 to-surface animate-shimmer bg-[length:200%_100%] rounded w-full" />
                        <div className="h-3 bg-gradient-to-r from-surface via-border/40 to-surface animate-shimmer bg-[length:200%_100%] rounded w-2/3" />
                        <div className="h-7 bg-gradient-to-r from-surface via-border/40 to-surface animate-shimmer bg-[length:200%_100%] rounded mt-3" />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Infinite scroll sentinel */}
                {searchResults.length < searchTotal && (
                  <div ref={sentinelRef} className="h-1" />
                )}

                {/* End reached message */}
                {searchResults.length >= searchTotal && searchResults.length > 0 && (
                  <p className="text-center text-xs text-muted mt-8 py-4">
                    Has visto los {searchResults.length.toLocaleString()} modelos disponibles
                  </p>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
