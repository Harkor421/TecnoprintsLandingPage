'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import { Upload, X, FileText } from 'lucide-react'

const materials = [
  { value: 'pla-standard', label: 'PLA Estándar' },
  { value: 'pla-plus', label: 'PLA+ (Alta Resistencia)' },
  { value: 'pla-silk', label: 'PLA Silk (Brillante)' },
  { value: 'pla-matte', label: 'PLA Mate' },
]

const colors = [
  { value: 'black', label: 'Negro', color: '#1a1a1a' },
  { value: 'white', label: 'Blanco', color: '#ffffff' },
  { value: 'gray', label: 'Gris', color: '#6b7280' },
  { value: 'red', label: 'Rojo', color: '#ef4444' },
  { value: 'teal', label: 'Verde Azulado', color: '#1ed760' },
  { value: 'green', label: 'Verde', color: '#22c55e' },
  { value: 'yellow', label: 'Amarillo', color: '#eab308' },
  { value: 'orange', label: 'Naranja', color: '#f97316' },
]

export default function QuoteForm() {
  const [formData, setFormData] = useState({
    file: null as File | null,
    material: 'pla-standard',
    color: 'black',
    quantity: 1,
    email: '',
    notes: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, file: e.target.files[0] })
    }
  }

  return (
    <section id="quote" className="py-20 md:py-32 bg-surface/50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Obtén tu{' '}
            <span className="text-primary">
              Cotización
            </span>{' '}
            al Instante
          </h2>
          <p className="text-muted">
            Sube tu modelo 3D y recibe una cotización en segundos.
          </p>
        </div>

        <Card hover={false} className="p-8">
          {submitted ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Cotización Enviada!</h3>
              <p className="text-muted">
                Esto es un demo. En producción, recibirías tu cotización por correo.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* File Upload */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Subir Modelo 3D (STL, OBJ, STEP)
                </label>
                <div className="relative">
                  {formData.file ? (
                    <div className="flex items-center justify-between p-4 bg-background border border-border">
                      <div className="flex items-center gap-3">
                        <FileText size={20} className="text-primary" />
                        <span className="text-sm">{formData.file.name}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, file: null })}
                        className="text-muted hover:text-white"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border cursor-pointer hover:border-primary transition-colors">
                      <Upload size={24} className="text-muted mb-2" />
                      <span className="text-sm text-muted">
                        Haz clic para subir o arrastra tu archivo
                      </span>
                      <input
                        type="file"
                        className="hidden"
                        accept=".stl,.obj,.step,.stp"
                        onChange={handleFileChange}
                      />
                    </label>
                  )}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                {/* Material */}
                <div>
                  <label className="block text-sm font-medium mb-2">Material</label>
                  <select
                    value={formData.material}
                    onChange={(e) =>
                      setFormData({ ...formData, material: e.target.value })
                    }
                    className="w-full px-4 py-2.5 bg-background border border-border text-white focus:border-primary focus:outline-none"
                  >
                    {materials.map((m) => (
                      <option key={m.value} value={m.value}>
                        {m.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Quantity */}
                <div>
                  <label className="block text-sm font-medium mb-2">Cantidad</label>
                  <input
                    type="number"
                    min="1"
                    value={formData.quantity}
                    onChange={(e) =>
                      setFormData({ ...formData, quantity: parseInt(e.target.value) })
                    }
                    className="w-full px-4 py-2.5 bg-background border border-border text-white focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              {/* Color */}
              <div>
                <label className="block text-sm font-medium mb-2">Color</label>
                <div className="flex flex-wrap gap-2">
                  {colors.map((c) => (
                    <button
                      key={c.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, color: c.value })}
                      className={`w-8 h-8 border-2 transition-colors ${
                        formData.color === c.value
                          ? 'border-primary'
                          : 'border-transparent hover:border-border'
                      }`}
                      style={{ backgroundColor: c.color }}
                      title={c.label}
                    />
                  ))}
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-2">Correo Electrónico</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="tu@correo.com"
                  className="w-full px-4 py-2.5 bg-background border border-border text-white placeholder:text-muted focus:border-primary focus:outline-none"
                  required
                />
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Notas Adicionales (Opcional)
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  rows={3}
                  placeholder="Requisitos específicos..."
                  className="w-full px-4 py-2.5 bg-background border border-border text-white placeholder:text-muted focus:border-primary focus:outline-none resize-none"
                />
              </div>

              <Button type="submit" size="lg" className="w-full">
                Obtener Cotización
              </Button>
            </form>
          )}
        </Card>
      </div>
    </section>
  )
}
