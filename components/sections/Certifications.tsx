'use client'

import { Shield, CheckCircle2 } from 'lucide-react'
import ScrollFadeIn from '@/components/ui/ScrollFadeIn'

const certifications = [
  {
    name: 'ISO 9001:2015',
    description: 'Gestión de Calidad',
  },
  {
    name: 'NOM-251',
    description: 'Estándares Mexicanos',
  },
  {
    name: 'CE Marking',
    description: 'Conformidad Europea',
  },
  {
    name: 'RoHS',
    description: 'Libre de Sustancias Peligrosas',
  },
  {
    name: 'FDA',
    description: 'Material Seguro para Alimentos',
  },
]

export default function Certifications() {
  return (
    <section className="py-8 border-t border-border bg-surface/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollFadeIn direction="up">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 flex-wrap">
            <div className="flex items-center gap-2 text-muted text-sm">
              <Shield size={18} className="text-primary" />
              <span>Certificaciones:</span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              {certifications.map((cert) => (
                <div
                  key={cert.name}
                  className="flex items-center gap-2 text-sm"
                >
                  <CheckCircle2 size={16} className="text-primary flex-shrink-0" />
                  <div>
                    <span className="font-medium text-white">{cert.name}</span>
                    <span className="hidden sm:inline text-muted ml-1">- {cert.description}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollFadeIn>

        <ScrollFadeIn direction="up" delay={0.1}>
          <div className="mt-6 text-center">
            <p className="text-xs text-muted">
              <Shield size={12} className="inline mr-1" />
              Tecnoprints garantiza materiales PLA de alta calidad y procesos de manufactura certificados.
            </p>
          </div>
        </ScrollFadeIn>
      </div>
    </section>
  )
}
