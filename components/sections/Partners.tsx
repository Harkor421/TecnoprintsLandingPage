'use client'

import Image from 'next/image'
import Link from 'next/link'
import { memo } from 'react'
import { PARTNERS } from '@/lib/constants'

function Partners() {
  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm text-muted tracking-wide">
            Empresas que confían en nosotros
          </p>
        </div>

        <div className="flex items-center justify-center gap-16 md:gap-24">
          {PARTNERS.map((partner) => (
            <Link
              key={partner.name}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-4 transition-all duration-300"
            >
              <div className="relative h-16 md:h-20 w-40 md:w-48 flex items-center justify-center">
                <Image
                  src={partner.logo}
                  alt={`${partner.name} - Cliente de impresión 3D Tecnoprints`}
                  width={200}
                  height={80}
                  className="h-full w-auto object-contain brightness-0 invert opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                />
              </div>
              <span className="text-sm font-medium text-muted group-hover:text-white transition-colors duration-300">
                {partner.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default memo(Partners)
