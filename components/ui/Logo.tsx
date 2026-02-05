'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

const sizes = {
  sm: 'h-8',
  md: 'h-10',
  lg: 'h-14',
}

const textSizes = {
  sm: 'text-lg',
  md: 'text-xl',
  lg: 'text-2xl',
}

export default function Logo({ className, size = 'md' }: LogoProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <Image
        src="/logo.png"
        alt="Tecnoprints"
        width={200}
        height={200}
        className={cn('w-auto', sizes[size])}
        priority
      />
      <span
        className={cn('font-bold italic', textSizes[size])}
        style={{ fontFamily: 'Arial, sans-serif' }}
      >
        <span className="text-white">Tecno</span>
        <span className="text-primary">prints</span>
      </span>
    </div>
  )
}
