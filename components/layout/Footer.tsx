'use client'

import Link from 'next/link'
import Logo from '@/components/ui/Logo'
import { Mail, Phone, MapPin, Twitter, Linkedin, Github } from 'lucide-react'

const footerLinks = {
  services: [
    { label: 'Piezas Personalizadas', href: '#services' },
    { label: 'Prototipado', href: '#services' },
    { label: 'Producción en Lotes', href: '#services' },
    { label: 'Servicios de Diseño', href: '#services' },
  ],
  company: [
    { label: 'Nosotros', href: '#about' },
    { label: 'Cómo Funciona', href: '#process' },
    { label: 'Contacto', href: '#contact' },
    { label: 'Empleos', href: '#' },
  ],
  resources: [
    { label: 'Guía de Diseño', href: '#' },
    { label: 'Guía de Materiales', href: '#' },
    { label: 'Preguntas Frecuentes', href: '#' },
    { label: 'Blog', href: '#' },
  ],
}

const socialLinks = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Github, href: '#', label: 'GitHub' },
]

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-border safe-area-inset-bottom">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 md:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-2">
            <Logo />
            <p className="mt-4 text-muted text-sm max-w-md">
              Servicios profesionales de impresión 3D para prototipado y producción.
              Entrega rápida, impresiones de alta calidad en PLA para tus proyectos creativos e ingenieriles.
            </p>
            <div className="mt-6 space-y-3">
              <a href="mailto:hola@tecnoprints.com" className="flex items-center gap-3 text-sm text-muted hover:text-white transition-colors py-1 touch-manipulation">
                <Mail size={16} className="text-primary flex-shrink-0" />
                <span>hola@tecnoprints.com</span>
              </a>
              <a href="tel:+15551234567" className="flex items-center gap-3 text-sm text-muted hover:text-white transition-colors py-1 touch-manipulation">
                <Phone size={16} className="text-primary flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </a>
              <div className="flex items-center gap-3 text-sm text-muted py-1">
                <MapPin size={16} className="text-primary flex-shrink-0" />
                <span>Ciudad de México, MX</span>
              </div>
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Servicios</h4>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.services.map((link) => (
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
          <div className="col-span-2 sm:col-span-1">
            <h4 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Recursos</h4>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.resources.map((link) => (
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
                className="text-muted hover:text-primary transition-colors p-2 -m-2 touch-manipulation"
                aria-label={social.label}
              >
                <social.icon size={22} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
