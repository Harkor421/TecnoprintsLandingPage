'use client'

import Link from 'next/link'
import { Instagram, MessageCircle, Mail } from 'lucide-react'

const WhatsAppIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

const contactChannels = [
  {
    icon: WhatsAppIcon,
    title: 'WhatsApp',
    description: 'Escríbenos directo y te cotizamos al instante',
    href: 'https://wa.me/573007576187',
    cta: 'Abrir WhatsApp',
  },
  {
    icon: Instagram,
    title: 'Instagram',
    description: 'Síguenos y envíanos un DM con tu proyecto',
    href: 'https://instagram.com/tecnoprintsco',
    cta: 'Ir a Instagram',
  },
  {
    icon: Mail,
    title: 'Correo',
    description: 'Para consultas más detalladas o archivos grandes',
    href: 'mailto:contact@tecnoprints.com',
    cta: 'Enviar Correo',
  },
]

export default function ContactForm() {
  return (
    <section id="contact" className="py-16 sm:py-20 md:py-32">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            Ponte en{' '}
            <span className="text-primary">
              Contacto
            </span>
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            ¿Tienes preguntas o quieres cotizar? Contáctanos por el canal que prefieras.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {contactChannels.map((channel) => (
            <Link
              key={channel.title}
              href={channel.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-row sm:flex-col items-center sm:text-center gap-4 sm:gap-0 p-4 sm:p-6 md:p-8 border border-border bg-surface/50 hover:border-primary/50 active:border-primary/70 transition-colors duration-300 touch-manipulation"
            >
              <div className="w-12 h-12 flex-shrink-0 bg-primary/10 flex items-center justify-center sm:mb-4 group-hover:bg-primary/20 transition-colors">
                <channel.icon size={24} className="text-primary" />
              </div>
              <div className="flex-1 sm:flex-initial">
                <h3 className="font-semibold text-white mb-0.5 sm:mb-2">{channel.title}</h3>
                <p className="text-xs sm:text-sm text-muted sm:mb-4">{channel.description}</p>
                <span className="hidden sm:inline text-sm font-medium text-primary group-hover:underline">
                  {channel.cta}
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 sm:mt-12">
          <h3 className="text-lg font-semibold text-white text-center mb-4">
            Nuestra Ubicación en <span className="text-primary">Barranquilla</span>
          </h3>
          <div className="border border-border overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.5!2d-74.8095!3d10.9932!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8ef42d44d12ae525%3A0x2633536b5028d30!2sCra.%2053%20%23Calle%2096%20-%2024%2C%20Barranquilla%2C%20Atl%C3%A1ntico%2C%20Colombia!5e0!3m2!1ses!2sco!4v1709836800000!5m2!1ses!2sco"
              width="100%"
              height="300"
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación de Tecnoprints - Impresión 3D en Barranquilla, Colombia"
            />
          </div>
          <p className="text-sm text-muted text-center mt-3">
            Cra. 53 #Calle 96 - 24, Barranquilla, Atlántico, Colombia
          </p>
        </div>
      </div>
    </section>
  )
}
