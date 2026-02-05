'use client'

import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import { MessageSquare, FileText, HelpCircle, ArrowRight } from 'lucide-react'

const supportOptions = [
  {
    icon: MessageSquare,
    title: 'Chat en Vivo',
    description: 'Obtén respuestas instantáneas de nuestro equipo de soporte en horario laboral.',
  },
  {
    icon: FileText,
    title: 'Revisión de Diseño',
    description: 'Envía tu diseño para una revisión gratuita de manufacturabilidad.',
  },
  {
    icon: HelpCircle,
    title: 'Base de Conocimiento',
    description: 'Explora nuestra extensa biblioteca de guías y tutoriales.',
  },
]

export default function Support() {
  return (
    <section id="about" className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Soporte de{' '}
              <span className="text-primary">
                Diseño
              </span>{' '}
              e Ingeniería
            </h2>
            <p className="text-muted mb-6">
              ¿No estás seguro si tu diseño es imprimible? Nuestro equipo de expertos está aquí para ayudarte.
              Ofrecemos consultas de diseño gratuitas y podemos ayudar a optimizar tus modelos
              para impresión 3D.
            </p>
            <p className="text-muted mb-8">
              Ya sea que necesites ayuda con la preparación de archivos, selección de materiales o
              diseño para manufactura, tenemos la experiencia para guiarte
              a través del proceso.
            </p>
            <Button variant="outline" className="group">
              Contactar a Nuestro Equipo
              <ArrowRight
                size={18}
                className="ml-2 group-hover:translate-x-1 transition-transform"
              />
            </Button>
          </div>

          {/* Support Options */}
          <div className="space-y-4">
            {supportOptions.map((option) => (
              <Card key={option.title} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
                  <option.icon size={20} className="text-black" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{option.title}</h3>
                  <p className="text-sm text-muted">{option.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
