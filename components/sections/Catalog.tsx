'use client'

import { useState, useCallback, useEffect } from 'react'
import Card from '@/components/ui/Card'
import {
  Search, Loader2, X, Copy, Check, Upload,
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

// ─── Sub-components ──────────────────────────────────────────

const WhatsAppIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

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
  const [copied, setCopied] = useState(false)

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
            {selectedModel && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
                onClick={() => setSelectedModel(null)}
              >
                <div
                  className="bg-surface border border-border w-full max-w-md p-5 sm:p-6 relative"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Close */}
                  <button
                    onClick={() => setSelectedModel(null)}
                    className="absolute top-3 right-3 text-muted hover:text-white"
                  >
                    <X size={20} />
                  </button>

                  {/* Model preview */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-20 h-20 flex-shrink-0 bg-background border border-border overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={selectedModel.cover}
                        alt={selectedModel.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold line-clamp-2 mb-1">{selectedModel.title}</h3>
                      <p className="text-[11px] text-muted">por {selectedModel.creator}</p>
                    </div>
                  </div>

                  {/* Explanation for non-technical users */}
                  <div className="bg-background border border-border p-3 sm:p-4 mb-4 text-sm text-muted leading-relaxed">
                    <p className="mb-2">
                      <span className="text-white font-medium">¿Te gusta este modelo?</span> Nosotros nos encargamos de todo.
                    </p>
                    <p>
                      Solo envíanos este enlace por WhatsApp y te daremos el <span className="text-white">precio exacto</span>, el{' '}
                      <span className="text-white">tiempo de entrega</span> y las opciones de{' '}
                      <span className="text-white">material y color</span>. No necesitas descargar nada.
                    </p>
                  </div>

                  {/* Model link to copy */}
                  <div className="mb-5">
                    <label className="block text-xs text-muted mb-1.5">Enlace del modelo</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        readOnly
                        value={selectedModel.url}
                        className="flex-1 px-3 py-2 bg-background border border-border text-xs text-muted truncate"
                      />
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(selectedModel.url)
                          setCopied(true)
                          setTimeout(() => setCopied(false), 2000)
                        }}
                        className="px-3 py-2 border border-border text-xs hover:border-primary/50 transition-colors flex items-center gap-1"
                      >
                        {copied ? <Check size={14} className="text-primary" /> : <Copy size={14} />}
                        {copied ? 'Copiado' : 'Copiar'}
                      </button>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-3">
                    <a
                      href={`https://wa.me/573239267656?text=${encodeURIComponent(
                        `Hola! Me gustaría que me impriman este modelo 3D:\n\n` +
                        `${selectedModel.title}\n` +
                        `${selectedModel.url}\n\n` +
                        `¿Me pueden dar el precio, tiempo de entrega y opciones de color?`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-black font-semibold text-sm hover:bg-primary-dark transition-colors"
                    >
                      <WhatsAppIcon size={18} />
                      Enviar por WhatsApp y Cotizar
                    </a>
                    <a
                      href={selectedModel.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-3 border border-border text-sm font-medium hover:border-primary/50 transition-colors"
                    >
                      Ver detalles del modelo
                    </a>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}
