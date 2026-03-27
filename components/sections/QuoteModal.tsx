'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { X, Loader2, Copy, Check, ChevronLeft, ChevronRight } from 'lucide-react'

interface BrowseModel {
  id: number
  title: string
  cover: string
  creator: string
  url: string
}

interface ModelDetail {
  id: number
  title: string
  creator?: string
  weight?: number
  description?: string
  images?: string[]
}

const WhatsAppIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

const formatCOP = (value: number) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

export default function QuoteModal({
  model,
  onClose,
}: {
  model: BrowseModel | null
  onClose: () => void
}) {
  const [loading, setLoading] = useState(false)
  const [modelDetail, setModelDetail] = useState<ModelDetail | null>(null)
  const [copied, setCopied] = useState(false)
  const [imageIndex, setImageIndex] = useState(0)

  // Cost parameters (from TecnoPrintsAdminPanel defaults)
  const costPerGram = 60 // COP
  const electricityCostPerMin = 4 // COP
  const profitMargin = 250 // 250%

  useEffect(() => {
    if (!model) return

    const loadModelDetails = async () => {
      setLoading(true)
      try {
        const res = await fetch(
          `https://tecnoprints-api-production.up.railway.app/api/models/${model.id}`
        )
        if (!res.ok) throw new Error('Failed to load model')
        const data = await res.json()
        setModelDetail(data)
      } catch (err) {
        console.error('Failed to load model details:', err)
      } finally {
        setLoading(false)
      }
    }

    loadModelDetails()
  }, [model])

  if (!model) return null

  // Get weight from model details
  const weightGrams = modelDetail?.weight || 0

  // Calculate quote
  const materialCost = weightGrams * costPerGram
  const electricityCost = 0 // Estimate: user will provide print time
  const totalCost = materialCost + electricityCost
  const profitAmount = totalCost * (profitMargin / 100)
  const finalPrice = Math.max(totalCost + profitAmount, 12500)

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
      onClick={onClose}
    >
      <div
        className="bg-surface border border-border w-full max-w-md p-5 sm:p-6 relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-muted hover:text-white"
        >
          <X size={20} />
        </button>

        {/* Model carousel and details */}
        {!loading && modelDetail && (
          <>
            {/* Image carousel */}
            {modelDetail.images && modelDetail.images.length > 0 && (
              <div className="relative mb-4 bg-background rounded overflow-hidden">
                <div className="aspect-video relative">
                  <Image
                    src={modelDetail.images[imageIndex]}
                    alt={`${modelDetail.title} - Image ${imageIndex + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Navigation buttons */}
                {modelDetail.images.length > 1 && (
                  <>
                    <button
                      onClick={() => setImageIndex((i) => (i - 1 + modelDetail.images!.length) % modelDetail.images!.length)}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 p-2 rounded transition-colors"
                    >
                      <ChevronLeft size={18} className="text-white" />
                    </button>
                    <button
                      onClick={() => setImageIndex((i) => (i + 1) % modelDetail.images!.length)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 p-2 rounded transition-colors"
                    >
                      <ChevronRight size={18} className="text-white" />
                    </button>
                    {/* Indicators */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                      {modelDetail.images.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setImageIndex(idx)}
                          className={`w-2 h-2 rounded-full transition-colors ${
                            idx === imageIndex ? 'bg-primary' : 'bg-white/40'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Title and creator */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-1">{modelDetail.title}</h3>
              <p className="text-xs text-muted">por {modelDetail.creator}</p>
            </div>

            {/* Description */}
            {modelDetail.description && (
              <div className="bg-background border border-border p-3 mb-4 rounded text-sm text-muted leading-relaxed max-h-32 overflow-y-auto">
                <p dangerouslySetInnerHTML={{ __html: modelDetail.description }} />
              </div>
            )}
          </>
        )}

        {/* Loading state */}
        {loading && (
          <div className="bg-background border border-border p-4 mb-4 flex items-center justify-center gap-2">
            <Loader2 size={16} className="animate-spin text-primary" />
            <span className="text-xs text-muted">Cargando detalles del modelo...</span>
          </div>
        )}

        {/* Quote Summary */}
        {!loading && modelDetail && (
          <>
            {/* Price estimate card */}
            <div className="bg-primary/10 border border-primary/30 p-4 sm:p-5 mb-4 rounded text-center">
              <p className="text-muted text-xs sm:text-sm mb-2">Peso estimado del modelo</p>
              <p className="text-white font-semibold text-2xl mb-4">{weightGrams}g</p>
              <div className="border-t border-primary/30 pt-4">
                <p className="text-muted text-xs sm:text-sm mb-1">Precio estimado</p>
                <p className="text-primary font-bold text-3xl">{formatCOP(finalPrice)}</p>
              </div>
              <p className="text-muted text-[11px] sm:text-xs mt-3">
                *El precio puede variar según color, acabado y tiempo de impresión
              </p>
            </div>
          </>
        )}

        {/* Model link to copy */}
        <div className="mb-5">
          <label className="block text-xs text-muted mb-1.5">Enlace del modelo</label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={model.url}
              className="flex-1 px-3 py-2 bg-background border border-border text-xs text-muted truncate"
            />
            <button
              onClick={() => {
                navigator.clipboard.writeText(model.url)
                setCopied(true)
                setTimeout(() => setCopied(false), 2000)
              }}
              className="px-3 py-2 border border-border text-xs hover:border-primary/50 transition-colors flex items-center gap-1"
            >
              {copied ? (
                <Check size={14} className="text-primary" />
              ) : (
                <Copy size={14} />
              )}
              {copied ? 'Copiado' : 'Copiar'}
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <a
            href={`https://wa.me/573239267656?text=${encodeURIComponent(
              `Hola! Me gustaría que me impriman este modelo 3D:\n\n` +
              `${model.title}\n` +
              `${model.url}\n\n` +
              `Peso estimado: ${weightGrams}g\n` +
              `Precio estimado: ${formatCOP(finalPrice)}\n\n` +
              `¿Me pueden confirmar el precio final, tiempo de entrega y opciones de color?`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-black font-semibold text-sm hover:bg-primary-dark transition-colors"
          >
            <WhatsAppIcon size={18} />
            Enviar por WhatsApp
          </a>
          <a
            href={model.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-3 border border-border text-sm font-medium hover:border-primary/50 transition-colors"
          >
            Ver detalles del modelo
          </a>
        </div>
      </div>
    </div>
  )
}
