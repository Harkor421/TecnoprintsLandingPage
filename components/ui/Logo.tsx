'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

const sizes = {
  sm: { width: 100, height: 32 },
  md: { width: 140, height: 44 },
  lg: { width: 180, height: 56 },
}

export default function Logo({ className, size = 'md' }: LogoProps) {
  const { width, height } = sizes[size]

  return (
    <div className={cn('flex items-center', className)}>
      <Image
        src="/logo.png"
        alt="Tecnoprints"
        width={width}
        height={height}
        className="h-auto w-auto"
        priority
      />
    </div>
  )
}
