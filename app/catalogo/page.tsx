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

  const handleSearch = useCallback(async (overrideQuery?: string) => {
    const q = (overrideQuery || searchQuery).trim()
    if (!q) return

    setSearchLoading(true)
    setSearched(true)
    setSearchPage(1)

    try {
      const params = new URLSearchParams({ page: '1', keyword: q })
      const res = await fetch(`${API_BASE}/api/models?${params}`)
      const data = await res.json()
      setSearchResults(data.models || [])
      setSearchTotal(data.total || 0)
      // Smooth scroll to results
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
    const next = searchPage + 1
    setLoadingMore(true)
    try {
      const params = new URLSearchParams({ page: String(next), keyword: searchQuery.trim() })
      const res = await fetch(`${API_BASE}/api/models?${params}`)
      const data = await res.json()
      setSearchResults((prev) => [...prev, ...(data.models || [])])
      setSearchPage(next)
    } catch { /* ignore */ }
    finally { setLoadingMore(false) }
  }, [searchPage, searchQuery])

  const handleQuickSearch = (term: string) => {
    setSearchQuery(term)
    handleSearch(term)
  }

  return (
    <div className="min-h-screen bg-background pt-20 sm:pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Hero / Search */}
        <div className="mb-8 sm:mb-12">
          <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
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
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="¿Qué quieres imprimir hoy?"
                className="w-full pl-10 pr-4 py-3 bg-surface border border-border rounded-lg text-sm placeholder:text-muted/60 focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={searchLoading || !searchQuery.trim()}
              className="px-5 py-3 bg-primary text-black font-semibold text-sm rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50"
            >
              {searchLoading ? <Loader2 size={18} className="animate-spin" /> : 'Buscar'}
            </button>
          </form>

          {/* Quick tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            {POPULAR_SEARCHES.map((term) => (
              <button
                key={term}
                onClick={() => handleQuickSearch(term)}
                className={`px-3 py-1.5 border rounded-full text-xs transition-colors ${
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
          <div ref={searchRef} className="scroll-mt-24">
            <div className="flex items-end justify-between mb-4 flex-wrap gap-3">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold">
                  Resultados para “{searchQuery}”
                </h2>
                <p className="text-xs sm:text-sm text-muted mt-1">
                  {searchTotal.toLocaleString()} modelos encontrados
                </p>
              </div>
              <button
                onClick={() => {
                  setSearched(false)
                  setSearchResults([])
                  setSearchQuery('')
                }}
                className="text-xs text-muted hover:text-primary transition-colors"
              >
                ← Volver al catálogo
              </button>
            </div>

            {searchLoading && searchResults.length === 0 ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 size={24} className="animate-spin text-primary mr-2" />
                <span className="text-muted text-sm">Buscando...</span>
              </div>
            ) : searchResults.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-muted">No se encontraron modelos. Intenta con otra búsqueda.</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
                  {searchResults.map((model) => (
                    <ProductCard key={model.id} model={model} size="lg" />
                  ))}
                </div>

                {searchResults.length < searchTotal && (
                  <div className="flex justify-center mt-8">
                    <button
                      onClick={handleLoadMore}
                      disabled={loadingMore}
                      className="px-6 py-3 border border-border rounded-lg text-sm font-medium hover:border-primary/50 hover:text-primary transition-colors disabled:opacity-50"
                    >
                      {loadingMore ? (
                        <span className="flex items-center gap-2">
                          <Loader2 size={16} className="animate-spin" />
                          Cargando...
                        </span>
                      ) : (
                        `Cargar más (${searchResults.length} de ${searchTotal.toLocaleString()})`
                      )}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
