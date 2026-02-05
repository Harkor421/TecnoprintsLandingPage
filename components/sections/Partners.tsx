'use client'

import Image from 'next/image'
import Link from 'next/link'

const partners = [
  {
    name: 'Degentech SAS',
    logo: '/degentech-logo.png',
    url: 'https://degentech.co',
  },
  {
    name: 'Centro INCA',
    logo: '/inca-logo.png',
    url: 'https://centroinca.com/centroinca/',
  },
]

export default function Partners() {
  return (
    <section className="py-14 border-y border-border bg-surface/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs text-muted uppercase tracking-wider mb-10">
          Empresas que confían en nosotros
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-12 md:gap-20">
          {partners.map((partner) => (
            <Link
              key={partner.name}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 opacity-50 hover:opacity-80 transition-opacity duration-300"
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                width={180}
                height={60}
                className="h-12 md:h-14 w-auto brightness-0 invert"
              />
              <span className="text-lg md:text-xl font-medium text-white/80">
                {partner.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
