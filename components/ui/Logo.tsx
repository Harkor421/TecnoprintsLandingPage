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

export default function Logo({ className, size = 'md' }: LogoProps) {
  return (
    <div className={cn('flex items-center', className)}>
      <Image
        src="/logo.png"
        alt="Tecnoprints"
        width={200}
        height={200}
        className={cn('w-auto', sizes[size])}
        priority
      />
    </div>
  )
}
