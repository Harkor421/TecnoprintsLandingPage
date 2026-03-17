'use client'

import { useState, useCallback, useEffect } from 'react'
import Card from '@/components/ui/Card'
import QuoteModal from './QuoteModal'
import {
  Search, Loader2, Upload,
} from 'lucide-react'

// ─── Constants ───────────────────────────────────────────────

const POPULAR_SEARCHES = [
  'llavero', 'maceta', 'organizador', 'soporte celular',
  'lámpara', 'figura', 'caja', 'engranaje',
]

const API_BASE = 'https://tecnoprints-api-production.up.railway.app'

// ─── Types ───────────────────────────────────────────────────

interface BrowseModel {
  id: number
  title: string
  cover: string
  likeCount: number
  downloadCount: number
  printCount: number
  creator: string
  url: string
}

// ─── Main Component ──────────────────────────────────────────

export default function Catalog() {
  const [searchQuery, setSearchQuery] = useState('')
  const [models, setModels] = useState<BrowseModel[]>([])
  const [browseTotal, setBrowseTotal] = useState(0)
  const [browseLoading, setBrowseLoading] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const [browsePage, setBrowsePage] = useState(1)
  const [searched, setSearched] = useState(false)
  const [selectedModel, setSelectedModel] = useState<BrowseModel | null>(null)

  // Preload trending models
  useEffect(() => {
    let cancelled = false
    async function loadTrending() {
      setBrowseLoading(true)
      try {
        const res = await fetch(`${API_BASE}/api/models?page=1`)
        const data = await res.json()
        if (!cancelled) {
          setModels(data.models || [])
          setBrowseTotal(data.total || 0)
        }
      } catch { /* ignore */ }
      finally { if (!cancelled) setBrowseLoading(false) }
    }
    loadTrending()
    return () => { cancelled = true }
  }, [])

  // ─── Handlers ──────────────────────────────────────────────

  const handleSearch = useCallback(async (overrideQuery?: string) => {
    const q = (overrideQuery || searchQuery).trim()
    if (!q) return

    setBrowseLoading(true)
    setSearched(true)
    setBrowsePage(1)

    try {
      const res = await fetch(`${API_BASE}/api/models?keyword=${encodeURIComponent(q)}&page=1`)
      const data = await res.json()
      setModels(data.models || [])
      setBrowseTotal(data.total || 0)
    } catch {
      setModels([])
      setBrowseTotal(0)
    } finally {
      setBrowseLoading(false)
    }
  }, [searchQuery])

  const handleLoadMore = useCallback(async () => {
    const nextPage = browsePage + 1
    setLoadingMore(true)

    try {
      const params = new URLSearchParams({ page: String(nextPage) })
      if (searched && searchQuery.trim()) params.set('keyword', searchQuery.trim())
      const res = await fetch(`${API_BASE}/api/models?${params}`)
      const data = await res.json()
      setModels((prev) => [...prev, ...(data.models || [])])
      setBrowsePage(nextPage)
    } catch {
      // silently fail
    } finally {
      setLoadingMore(false)
    }
  }, [searchQuery, browsePage, searched])

  const handleQuickSearch = (term: string) => {
    setSearchQuery(term)
    handleSearch(term)
  }

  // ─── Render ────────────────────────────────────────────────

  return (
    <section id="catalog" className="py-20 md:py-32 bg-surface/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Catálogo de{' '}
            <span className="text-primary">Modelos 3D</span>
          </h2>
          <p className="text-muted max-w-xl mx-auto">
            Explora miles de modelos listos para imprimir. Elige el que te guste y nosotros nos encargamos de todo.
          </p>
        </div>

        {/* Search bar */}
        <div className="max-w-2xl mx-auto mb-6">
          <form
            onSubmit={(e) => { e.preventDefault(); handleSearch() }}
            className="flex gap-2"
          >
            <div className="relative flex-1">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="¿Qué quieres imprimir? (ej: llavero, maceta, figura)"
                className="w-full pl-10 pr-4 py-3 bg-surface border border-border text-sm placeholder:text-muted/60 focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={browseLoading || !searchQuery.trim()}
              className="px-5 py-3 bg-primary text-black font-semibold text-sm hover:bg-primary-dark transition-colors disabled:opacity-50"
            >
              {browseLoading && searched ? <Loader2 size={18} className="animate-spin" /> : 'Buscar'}
            </button>
          </form>
        </div>

        {/* Quick search tags */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {POPULAR_SEARCHES.map((term) => (
            <button
              key={term}
              onClick={() => handleQuickSearch(term)}
              className={`px-3 py-1.5 border text-xs transition-colors ${
                searched && searchQuery === term
                  ? 'border-primary text-primary'
                  : 'border-border text-muted hover:border-primary/50 hover:text-white'
              }`}
            >
              {term}
            </button>
          ))}
        </div>

        {/* Tip banner */}
        <div className="bg-primary/10 border border-primary/30 p-3 sm:p-4 mb-6 flex items-start gap-3 max-w-2xl mx-auto">
          <Upload size={18} className="text-primary flex-shrink-0 mt-0.5" />
          <p className="text-xs sm:text-sm text-muted">
            <span className="text-white font-medium">Tip:</span> Si ya tienes tu modelo 3D (archivo STL), ve a{' '}
            <a href="/#quote" className="text-primary underline underline-offset-2 hover:text-primary-light">
              Cotizar
            </a>{' '}
            para ver los gramos exactos y el precio estimado al instante.
          </p>
        </div>

        {/* Loading (only on initial load) */}
        {browseLoading && models.length === 0 && (
          <div className="flex items-center justify-center py-16">
            <Loader2 size={24} className="animate-spin text-primary mr-2" />
            <span className="text-muted text-sm">Cargando modelos...</span>
          </div>
        )}

        {/* No results */}
        {!browseLoading && searched && models.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted">No se encontraron modelos. Intenta con otra búsqueda.</p>
          </div>
        )}

        {/* Results grid */}
        {models.length > 0 && (
          <>
            <p className="text-xs text-muted mb-4 text-center">
              {searched
                ? `${browseTotal.toLocaleString()} modelos encontrados — ordenados por más descargados`
                : 'Modelos populares — busca algo específico o explora lo más descargado'}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {models.map((model) => (
                <div key={model.id} className="group">
                  <Card className="p-0 overflow-hidden h-full flex flex-col">
                    <div className="aspect-square relative bg-background overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={model.cover}
                        alt={model.title}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-3 flex flex-col flex-1">
                      <h3 className="text-sm font-medium line-clamp-2 leading-tight mb-3 flex-1">
                        {model.title}
                      </h3>
                      <button
                        onClick={() => { setSelectedModel(model); setCopied(false) }}
                        className="w-full py-2 bg-primary text-black text-xs font-semibold hover:bg-primary-dark transition-colors"
                      >
                        Cotizar Ahora
                      </button>
                    </div>
                  </Card>
                </div>
              ))}
            </div>

            {/* Load more */}
            {models.length < browseTotal && (
              <div className="flex justify-center mt-6">
                <button
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className="px-6 py-3 border border-border text-sm font-medium hover:border-primary/50 hover:text-primary transition-colors disabled:opacity-50"
                >
                  {loadingMore ? (
                    <span className="flex items-center gap-2">
                      <Loader2 size={16} className="animate-spin" />
                      Cargando...
                    </span>
                  ) : (
                    `Cargar más modelos (${models.length} de ${browseTotal.toLocaleString()})`
                  )}
                </button>
              </div>
            )}

            {/* ─── Quote Modal ─────────────────────────── */}
            <QuoteModal model={selectedModel} onClose={() => setSelectedModel(null)} />
          </>
        )}
      </div>
    </section>
  )
}
