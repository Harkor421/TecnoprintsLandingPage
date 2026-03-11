'use client'

import Link from 'next/link'
import Logo from '@/components/ui/Logo'
import { Mail, MapPin, Instagram } from 'lucide-react'

const footerLinks = {
  company: [
    { label: 'Servicios', href: '/servicios-impresion-3d-barranquilla' },
    { label: 'Cómo Funciona', href: '/#process' },
    { label: 'Cotizar', href: '/cotizar-impresion-3d' },
    { label: 'Contacto', href: '/#contact' },
  ],
  resources: [
    { label: 'Blog', href: '/blog' },
    { label: 'Preguntas Frecuentes', href: '/#faq' },
    { label: 'WhatsApp', href: 'https://wa.me/573239267656' },
    { label: 'Instagram', href: 'https://instagram.com/tecnoprintsco' },
    { label: 'TikTok', href: 'https://www.tiktok.com/@tecnoprints' },
  ],
}

const WhatsAppIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

const TikTokIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.46V13.2a8.16 8.16 0 005.58 2.17V12a4.85 4.85 0 01-5.58-2.17V2.44h3.45a4.83 4.83 0 002.13 4.25z" />
  </svg>
)

const socialLinks = [
  { icon: Instagram, href: 'https://instagram.com/tecnoprintsco', label: 'Instagram' },
  { icon: TikTokIcon, href: 'https://www.tiktok.com/@tecnoprints', label: 'TikTok' },
  { icon: WhatsAppIcon, href: 'https://wa.me/573239267656', label: 'WhatsApp' },
]

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-border safe-area-inset-bottom">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="sm:col-span-2">
            <Logo />
            <p className="mt-4 text-muted text-sm max-w-md">
              Servicios profesionales de impresión 3D para prototipado y producción.
              Entrega rápida, impresiones de alta calidad en PLA para tus proyectos creativos e ingenieriles.
            </p>
            <div className="mt-6 space-y-3">
              <a href="mailto:contact@tecnoprints.com" className="flex items-center gap-3 text-sm text-muted hover:text-white transition-colors py-1 touch-manipulation">
                <Mail size={16} className="text-primary flex-shrink-0" />
                <span>contact@tecnoprints.com</span>
              </a>
              <div className="flex items-center gap-3 text-sm text-muted py-1">
                <MapPin size={16} className="text-primary flex-shrink-0" />
                <span>Cra. 53 #Calle 96 - 24, Barranquilla, Colombia</span>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Empresa</h4>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-muted text-sm hover:text-white transition-colors py-1 inline-block touch-manipulation"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Recursos</h4>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="text-muted text-sm hover:text-white transition-colors py-1 inline-block touch-manipulation"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-muted text-xs sm:text-sm text-center sm:text-left">
            &copy; {new Date().getFullYear()} Tecnoprints. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-6">
            {socialLinks.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-primary transition-colors p-2 -m-2 touch-manipulation"
                aria-label={social.label}
              >
                <social.icon size={22} />
              </Link>
            ))}
          </div>
        </div>

        {/* Parent Company */}
        <div className="mt-6 pt-4 border-t border-border/50 text-center">
          <p className="text-muted/70 text-xs">
            Una empresa de{' '}
            <a
              href="https://degentech.co"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary-light transition-colors font-medium"
            >
              Degentech SAS
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
