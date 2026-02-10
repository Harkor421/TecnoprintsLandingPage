'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import { Upload, X, FileText, Loader2 } from 'lucide-react'
import { parseSTLFile } from '@/lib/stl-parser'

const qualities = [
  { value: 'baja', label: 'Calidad Baja', description: '~15% relleno — prototipos rápidos', infill: '15%' },
  { value: 'media', label: 'Calidad Media', description: '~30% relleno — buen balance', infill: '30%' },
  { value: 'alta', label: 'Calidad Alta', description: '~50% relleno — piezas finales', infill: '50%' },
]

const WhatsAppIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

interface EstimateResult {
  volumeCm3: number
  grams: number
  triangleCount: number
  quality: string
  fileName: string
}

export default function QuoteForm() {
  const [file, setFile] = useState<File | null>(null)
  const [quality, setQuality] = useState('media')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<EstimateResult | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
      setResult(null)
      setError(null)
    }
  }

  const handleEstimate = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!file) {
      setError('Por favor sube un archivo STL.')
      return
    }

    if (!file.name.toLowerCase().endsWith('.stl')) {
      setError('Solo archivos STL son soportados para el estimado automático. Para otros formatos, contáctanos por WhatsApp.')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const parsed = await parseSTLFile(file, quality)

      if (parsed.triangleCount === 0) {
        setError('No se pudieron leer triángulos del archivo. Verifica que sea un STL válido.')
        setLoading(false)
        return
      }

      setResult({
        ...parsed,
        quality,
        fileName: file.name,
      })
    } catch {
      setError('Error al procesar el archivo. Verifica que sea un STL válido.')
    } finally {
      setLoading(false)
    }
  }

  const getQualityLabel = (q: string) =>
    qualities.find((item) => item.value === q)?.label ?? q

  const handleWhatsApp = () => {
    if (!result) return
    const qualityLabel = getQualityLabel(result.quality)
    const message = encodeURIComponent(
      `Hola! Quiero cotizar una impresión 3D:\n\n` +
      `Archivo: ${result.fileName}\n` +
      `Volumen: ${result.volumeCm3} cm³\n` +
      `Material estimado: ${result.grams}g de PLA\n` +
      `Calidad: ${qualityLabel}\n\n` +
      `¿Me pueden dar el precio final?`
    )
    window.open(`https://wa.me/573239267656?text=${message}`, '_blank')
  }

  const handleReset = () => {
    setFile(null)
    setResult(null)
    setError(null)
  }

  return (
    <section id="quote" className="py-20 md:py-32 bg-surface/50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Estima tu{' '}
            <span className="text-primary">
              Cotización
            </span>
          </h2>
          <p className="text-muted">
            Sube tu archivo STL y calcula el material estimado al instante — como en un slicer.
          </p>
        </div>

        <Card hover={false} className="p-4 sm:p-6 md:p-8">
          {result ? (
            <div className="space-y-5 sm:space-y-6">
              {/* Result summary */}
              <div className="text-center">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-primary/20 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <FileText size={24} className="text-primary sm:hidden" />
                  <FileText size={28} className="text-primary hidden sm:block" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-1">Estimado Listo</h3>
                <p className="text-xs sm:text-sm text-muted truncate max-w-[250px] sm:max-w-none mx-auto">{result.fileName}</p>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4">
                <div className="bg-background border border-border p-3 sm:p-4 text-center">
                  <p className="text-lg sm:text-2xl font-bold text-primary">{result.volumeCm3}</p>
                  <p className="text-[10px] sm:text-xs text-muted mt-1">cm³ volumen</p>
                </div>
                <div className="bg-background border border-border p-3 sm:p-4 text-center">
                  <p className="text-lg sm:text-2xl font-bold text-primary">{result.grams}g</p>
                  <p className="text-[10px] sm:text-xs text-muted mt-1">PLA estimado</p>
                </div>
                <div className="bg-background border border-border p-3 sm:p-4 text-center">
                  <p className="text-lg sm:text-2xl font-bold text-primary">{getQualityLabel(result.quality).replace('Calidad ', '')}</p>
                  <p className="text-[10px] sm:text-xs text-muted mt-1">calidad</p>
                </div>
              </div>

              <p className="text-xs text-muted text-center">
                * Estimado basado en el volumen del modelo. El precio final puede variar según complejidad y soportes necesarios.
              </p>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  type="button"
                  size="lg"
                  className="flex-1 flex items-center justify-center gap-2"
                  onClick={handleWhatsApp}
                >
                  <WhatsAppIcon size={20} />
                  Solicitar Precio por WhatsApp
                </Button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-3 border border-border text-sm font-medium hover:border-primary/50 transition-colors"
                >
                  Nuevo Estimado
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleEstimate} className="space-y-5 sm:space-y-6">
              {/* File Upload */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Subir Modelo 3D (STL)
                </label>
                <div className="relative">
                  {file ? (
                    <div className="flex items-center justify-between p-4 bg-background border border-border">
                      <div className="flex items-center gap-3">
                        <FileText size={20} className="text-primary" />
                        <span className="text-sm">{file.name}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => { setFile(null); setError(null) }}
                        className="text-muted hover:text-white"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border cursor-pointer hover:border-primary transition-colors">
                      <Upload size={24} className="text-muted mb-2" />
                      <span className="text-sm text-muted">
                        Haz clic para subir o arrastra tu archivo STL
                      </span>
                      <input
                        type="file"
                        className="hidden"
                        accept=".stl"
                        onChange={handleFileChange}
                      />
                    </label>
                  )}
                </div>
              </div>

              {/* Quality */}
              <div>
                <label className="block text-sm font-medium mb-3">
                  Calidad de Impresión
                </label>
                <div className="grid sm:grid-cols-3 gap-3">
                  {qualities.map((q) => (
                    <button
                      key={q.value}
                      type="button"
                      onClick={() => setQuality(q.value)}
                      className={`p-4 border text-left transition-colors ${
                        quality === q.value
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <span className="block font-medium text-sm">{q.label}</span>
                      <span className="block text-xs text-muted mt-1">{q.description}</span>
                    </button>
                  ))}
                </div>
              </div>

              {error && (
                <p className="text-sm text-red-400">{error}</p>
              )}

              <Button type="submit" size="lg" className="w-full" disabled={loading}>
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 size={18} className="animate-spin" />
                    Calculando...
                  </span>
                ) : (
                  'Calcular Estimado'
                )}
              </Button>
            </form>
          )}
        </Card>
      </div>
    </section>
  )
}
