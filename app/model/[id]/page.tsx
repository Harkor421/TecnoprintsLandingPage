'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
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
  weight: number
  printTimeMinutes: number
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
  const thumbnailsRef = useRef<HTMLDivElement>(null)

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
  const electricityCost = model.printTimeMinutes * 4 // 4 COP per minute
  const totalCost = materialCost + electricityCost
  const profitAmount = totalCost * (profitMargin / 100)
  const finalPrice = Math.max(totalCost + profitAmount, 12500)

  // Format print time
  const hours = Math.floor(model.printTimeMinutes / 60)
  const minutes = model.printTimeMinutes % 60
  const printTimeStr = hours > 0
    ? `${hours}h ${minutes}m`
    : `${minutes}m`

  const isHighPrice = finalPrice > 100000

  const whatsappMessage = isHighPrice
    ? `Hola! Me gustaría cotizar este modelo 3D:\n\n${model.title}\n${model.url}\n\nPeso estimado: ${model.weight}g\nTiempo estimado: ${printTimeStr}\n\n¿Me pueden dar el precio, tiempo de entrega y opciones de color?`
    : `Hola! Me gustaría que me impriman este modelo 3D:\n\n${model.title}\n${model.url}\n\nPeso estimado: ${model.weight}g\nTiempo estimado: ${printTimeStr}\nPrecio estimado: ${formatCOP(finalPrice)}\n\n¿Me pueden confirmar el precio final, tiempo de entrega y opciones de color?`

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-surface/50 flex flex-col">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-12 sm:py-24 flex-1">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 xl:gap-8">
          {/* Gallery */}
          <div className="xl:col-span-2 w-full">
            {/* Main image container */}
            <div className="relative bg-background rounded-lg overflow-hidden mb-4 group">
              <div className="aspect-square relative bg-black">
                {model.images && model.images.length > 0 ? (
                  <Image
                    src={model.images[imageIndex]}
                    alt={`${model.title} - ${imageIndex + 1}`}
                    fill
                    priority
                    unoptimized
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 70vw, 50vw"
                  />
                ) : null}
              </div>


              {/* Navigation arrows */}
              {model.images.length > 1 && (
                <>
                  <button
                    onClick={() => setImageIndex((i) => (i - 1 + model.images.length) % model.images.length)}
                    className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black/90 p-2.5 sm:p-3 rounded-full transition-all z-10"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={24} className="text-white" />
                  </button>
                  <button
                    onClick={() => setImageIndex((i) => (i + 1) % model.images.length)}
                    className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black/90 p-2.5 sm:p-3 rounded-full transition-all z-10"
                    aria-label="Next image"
                  >
                    <ChevronRight size={24} className="text-white" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails strip with navigation - like MakerWorld */}
            {model.images.length > 1 && (
              <div className="mt-6 pt-4 border-t border-border/30">
                <div className="flex items-center gap-3">
                  {/* Left arrow */}
                  <button
                    onClick={() => {
                      if (thumbnailsRef.current) {
                        thumbnailsRef.current.scrollBy({ left: -120, behavior: 'smooth' })
                      }
                    }}
                    className="flex-shrink-0 p-2.5 text-muted hover:text-primary hover:bg-primary/10 rounded-lg transition-all"
                    aria-label="Fotos anteriores"
                  >
                    <ChevronLeft size={22} />
                  </button>

                  {/* Thumbnails container */}
                  <div
                    ref={thumbnailsRef}
                    className="flex gap-3 overflow-x-auto flex-1 pb-2 scroll-smooth"
                    style={{ scrollBehavior: 'smooth' }}
                  >
                    {model.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setImageIndex(idx)}
                        className={`flex-shrink-0 h-20 sm:h-24 w-20 sm:w-24 rounded-lg overflow-hidden border-2 transition-all cursor-pointer hover:scale-105 relative ${
                          idx === imageIndex
                            ? 'border-primary ring-2 ring-primary/50 scale-105'
                            : 'border-border/50 opacity-60 hover:opacity-100'
                        }`}
                      >
                        <Image src={img} alt={`Foto ${idx + 1}`} fill unoptimized className="object-cover" />
                      </button>
                    ))}
                  </div>

                  {/* Right arrow */}
                  <button
                    onClick={() => {
                      if (thumbnailsRef.current) {
                        thumbnailsRef.current.scrollBy({ left: 120, behavior: 'smooth' })
                      }
                    }}
                    className="flex-shrink-0 p-2.5 text-muted hover:text-primary hover:bg-primary/10 rounded-lg transition-all"
                    aria-label="Más fotos"
                  >
                    <ChevronRight size={22} />
                  </button>
                </div>
              </div>
            )}

            {/* Quote Card - Mobile Only */}
            <div className="xl:hidden bg-surface border border-border rounded-lg p-5 sm:p-6 mb-6">
              <div className="mb-4 pb-4 border-b border-border">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted mb-1">Peso</p>
                    <p className="text-xl sm:text-2xl font-bold text-white">{model.weight}g</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted mb-1">Tiempo</p>
                    <p className="text-xl sm:text-2xl font-bold text-white">{printTimeStr}</p>
                  </div>
                </div>
              </div>

              <div className="mb-6 sm:mb-6">
                {isHighPrice ? (
                  <>
                    <p className="text-xs text-muted mb-1">Precio</p>
                    <p className="text-lg sm:text-xl font-bold text-white">Cotiza este producto por WhatsApp</p>
                    <p className="text-[11px] text-muted mt-2">Contáctanos para obtener el precio de este modelo</p>
                  </>
                ) : (
                  <>
                    <p className="text-xs text-muted mb-1">Precio estimado</p>
                    <p className="text-3xl sm:text-4xl font-bold text-primary">{formatCOP(finalPrice)}</p>
                    <p className="text-[11px] text-muted mt-2">*Varía por color y acabado</p>
                  </>
                )}
              </div>

              <a
                href={`https://wa.me/573239267656?text=${encodeURIComponent(whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 sm:py-3 bg-primary text-black font-semibold text-sm sm:text-base rounded-lg hover:bg-primary-dark transition-colors mb-3 active:scale-95"
              >
                <WhatsAppIcon size={18} />
                Cotizar por WhatsApp
              </a>

              <a
                href={model.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center py-2.5 sm:py-2 border border-border text-xs sm:text-sm text-white rounded-lg hover:border-primary/50 hover:text-primary transition-colors active:scale-95"
              >
                Ver en MakerWorld
              </a>
            </div>

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
          <div className="xl:col-span-1">
            {/* Quote Card - Desktop Only */}
            <div className="hidden xl:block bg-surface border border-border rounded-lg p-5 sm:p-6 mb-6 xl:sticky xl:top-6">
              <div className="mb-4 pb-4 border-b border-border">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted mb-1">Peso</p>
                    <p className="text-xl sm:text-2xl font-bold text-white">{model.weight}g</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted mb-1">Tiempo</p>
                    <p className="text-xl sm:text-2xl font-bold text-white">{printTimeStr}</p>
                  </div>
                </div>
              </div>

              <div className="mb-6 sm:mb-6">
                {isHighPrice ? (
                  <>
                    <p className="text-xs text-muted mb-1">Precio</p>
                    <p className="text-lg sm:text-xl font-bold text-white">Cotiza este producto por WhatsApp</p>
                    <p className="text-[11px] text-muted mt-2">Contáctanos para obtener el precio de este modelo</p>
                  </>
                ) : (
                  <>
                    <p className="text-xs text-muted mb-1">Precio estimado</p>
                    <p className="text-3xl sm:text-4xl font-bold text-primary">{formatCOP(finalPrice)}</p>
                    <p className="text-[11px] text-muted mt-2">*Varía por color y acabado</p>
                  </>
                )}
              </div>

              <a
                href={`https://wa.me/573239267656?text=${encodeURIComponent(whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 sm:py-3 bg-primary text-black font-semibold text-sm sm:text-base rounded-lg hover:bg-primary-dark transition-colors mb-3 active:scale-95"
              >
                <WhatsAppIcon size={18} />
                Cotizar por WhatsApp
              </a>

              <a
                href={model.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center py-2.5 sm:py-2 border border-border text-xs sm:text-sm text-white rounded-lg hover:border-primary/50 hover:text-primary transition-colors active:scale-95"
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

      {/* Footer */}
      <div className="bg-background/50 border-t border-border mt-12 sm:mt-16">
        <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-6">
          <Link
            href="/#catalog"
            className="inline-flex items-center gap-2 text-muted hover:text-primary transition-colors text-sm sm:text-base"
          >
            <ChevronLeft size={18} />
            Volver al catálogo
          </Link>
        </div>
      </div>
    </div>
  )
}
