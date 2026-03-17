'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, Heart, Download, Printer, Loader2 } from 'lucide-react'

const API_BASE = 'https://aware-forgiveness-production.up.railway.app'

const formatCOP = (value: number) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

interface ModelDetail {
  id: number
  title: string
  description: string
  cover: string
  weight: number
  images: string[]
  creator: string
  tags: string[]
  likeCount: number
  downloadCount: number
  printCount: number
  url: string
}

const WhatsAppIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

export default function ModelPage({ params }: { params: { id: string } }) {
  const [model, setModel] = useState<ModelDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [imageIndex, setImageIndex] = useState(0)

  // Cost parameters
  const costPerGram = 60
  const profitMargin = 250

  useEffect(() => {
    const loadModel = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/models/${params.id}`)
        if (!res.ok) throw new Error('Failed to load')
        const data = await res.json()
        setModel(data)
      } catch (err) {
        console.error('Error loading model:', err)
      } finally {
        setLoading(false)
      }
    }

    loadModel()
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background via-background to-surface/50 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <Loader2 size={24} className="animate-spin text-primary" />
          <span className="text-muted">Cargando modelo...</span>
        </div>
      </div>
    )
  }

  if (!model) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background via-background to-surface/50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted mb-4">No se encontró el modelo</p>
          <Link href="/#catalog" className="text-primary underline hover:text-primary-light">
            Volver al catálogo
          </Link>
        </div>
      </div>
    )
  }

  // Calculate quote
  const materialCost = model.weight * costPerGram
  const totalCost = materialCost
  const profitAmount = totalCost * (profitMargin / 100)
  const finalPrice = totalCost + profitAmount

  const whatsappMessage = `Hola! Me gustaría que me impriman este modelo 3D:\n\n${model.title}\n${model.url}\n\nPeso estimado: ${model.weight}g\nPrecio estimado: ${formatCOP(finalPrice)}\n\n¿Me pueden confirmar el precio final, tiempo de entrega y opciones de color?`

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-surface/50">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link
            href="/#catalog"
            className="flex items-center gap-2 text-muted hover:text-white transition-colors"
          >
            <ChevronLeft size={20} />
            <span className="text-sm">Volver</span>
          </Link>
          <div className="text-center flex-1">
            <h1 className="text-lg sm:text-xl font-bold text-primary">TecnoPrints</h1>
          </div>
          <div className="w-12" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Gallery */}
          <div className="lg:col-span-2">
            {/* Main image */}
            <div className="relative aspect-square bg-background border border-border rounded-lg overflow-hidden mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={model.images[imageIndex] || model.cover}
                alt={`${model.title} - ${imageIndex + 1}`}
                className="w-full h-full object-cover"
              />

              {/* Navigation */}
              {model.images.length > 1 && (
                <>
                  <button
                    onClick={() => setImageIndex((i) => (i - 1 + model.images.length) % model.images.length)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 p-3 rounded-full transition-colors"
                  >
                    <ChevronLeft size={24} className="text-white" />
                  </button>
                  <button
                    onClick={() => setImageIndex((i) => (i + 1) % model.images.length)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 p-3 rounded-full transition-colors"
                  >
                    <ChevronRight size={24} className="text-white" />
                  </button>
                  {/* Counter */}
                  <div className="absolute top-4 right-4 bg-black/60 px-3 py-1 rounded text-sm text-white">
                    {imageIndex + 1} / {model.images.length}
                  </div>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {model.images.length > 1 && (
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                {model.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setImageIndex(idx)}
                    className={`aspect-square rounded overflow-hidden border-2 transition-colors ${
                      idx === imageIndex ? 'border-primary' : 'border-border hover:border-primary/50'
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Description */}
            <div className="mt-8 bg-surface border border-border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Descripción</h2>
              <div className="prose prose-invert max-w-none text-sm text-muted leading-relaxed">
                <p dangerouslySetInnerHTML={{ __html: model.description }} />
              </div>
            </div>

            {/* Tags */}
            {model.tags.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-semibold text-muted mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {model.tags.slice(0, 10).map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-primary/10 border border-primary/30 rounded-full text-xs text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Quote Card */}
            <div className="bg-surface border border-border rounded-lg p-6 mb-6 sticky top-20">
              <div className="mb-6 pb-6 border-b border-border">
                <p className="text-xs text-muted mb-1">Peso estimado</p>
                <p className="text-3xl font-bold text-white">{model.weight}g</p>
              </div>

              <div className="mb-6">
                <p className="text-xs text-muted mb-1">Precio estimado</p>
                <p className="text-4xl font-bold text-primary">{formatCOP(finalPrice)}</p>
                <p className="text-[11px] text-muted mt-2">*Varía por color y acabado</p>
              </div>

              <a
                href={`https://wa.me/573239267656?text=${encodeURIComponent(whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-black font-semibold rounded-lg hover:bg-primary-dark transition-colors mb-3"
              >
                <WhatsAppIcon size={18} />
                Cotizar por WhatsApp
              </a>

              <a
                href={model.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center py-2 border border-border text-sm text-white rounded-lg hover:border-primary/50 hover:text-primary transition-colors"
              >
                Ver en MakerWorld
              </a>
            </div>

            {/* Creator Info */}
            <div className="bg-surface border border-border rounded-lg p-6 mb-6">
              <h3 className="text-sm font-semibold mb-2 text-white">Diseñador</h3>
              <p className="text-muted text-sm">{model.creator}</p>
            </div>

            {/* Stats */}
            <div className="bg-surface border border-border rounded-lg p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-muted">
                  <Heart size={16} />
                  <span className="text-sm">Me gusta</span>
                </div>
                <span className="font-semibold text-white">{model.likeCount.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-muted">
                  <Download size={16} />
                  <span className="text-sm">Descargas</span>
                </div>
                <span className="font-semibold text-white">{model.downloadCount.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-muted">
                  <Printer size={16} />
                  <span className="text-sm">Impresiones</span>
                </div>
                <span className="font-semibold text-white">{model.printCount.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
