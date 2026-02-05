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
    <footer className="bg-surface border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Logo />
            <p className="mt-4 text-muted text-sm max-w-md">
              Servicios profesionales de impresión 3D para prototipado y producción.
              Entrega rápida, impresiones de alta calidad en PLA para tus proyectos creativos e ingenieriles.
            </p>
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 text-sm text-muted">
                <Mail size={16} className="text-primary" />
                <span>hola@tecnoprints.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted">
                <Phone size={16} className="text-primary" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted">
                <MapPin size={16} className="text-primary" />
                <span>Ciudad de México, MX</span>
              </div>
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Servicios</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-muted text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Empresa</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-muted text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Recursos</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-muted text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-muted text-sm">
            &copy; {new Date().getFullYear()} Tecnoprints. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                className="text-muted hover:text-primary transition-colors"
                aria-label={social.label}
              >
                <social.icon size={20} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
