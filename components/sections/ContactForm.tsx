'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import { Mail, Phone, MapPin, Send } from 'lucide-react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <section id="contact" className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ponte en{' '}
            <span className="text-primary">
              Contacto
            </span>
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            ¿Tienes preguntas? Estamos aquí para ayudarte. Envíanos un mensaje y te
            responderemos lo antes posible.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <Card className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
                <Mail size={20} className="text-black" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Correo</h3>
                <p className="text-sm text-muted">contact@tecnoprints.com</p>
              </div>
            </Card>

            <Card className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
                <Phone size={20} className="text-black" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Teléfono</h3>
                <p className="text-sm text-muted">+57 (300) 123-4567</p>
              </div>
            </Card>

            <Card className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
                <MapPin size={20} className="text-black" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Ubicación</h3>
                <p className="text-sm text-muted">Colombia</p>
              </div>
            </Card>
          </div>

          {/* Contact Form */}
          <Card hover={false} className="lg:col-span-2 p-8">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
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
                <h3 className="text-xl font-semibold mb-2">Mensaje Enviado!</h3>
                <p className="text-muted">
                  Esto es un demo. En producción, tu mensaje sería entregado.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Nombre</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Tu nombre"
                      className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-white placeholder:text-muted focus:border-primary focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Correo Electrónico</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="tu@correo.com"
                      className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-white placeholder:text-muted focus:border-primary focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Asunto</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    placeholder="¿En qué podemos ayudarte?"
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-white placeholder:text-muted focus:border-primary focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Mensaje</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    rows={5}
                    placeholder="Cuéntanos sobre tu proyecto..."
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-white placeholder:text-muted focus:border-primary focus:outline-none resize-none"
                    required
                  />
                </div>

                <Button type="submit" size="lg" className="w-full group">
                  Enviar Mensaje
                  <Send
                    size={18}
                    className="ml-2 group-hover:translate-x-1 transition-transform"
                  />
                </Button>
              </form>
            )}
          </Card>
        </div>
      </div>
    </section>
  )
}
