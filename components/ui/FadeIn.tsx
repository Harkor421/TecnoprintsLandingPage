'use client'

import { useEffect, useState, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface FadeInProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
}

export default function FadeIn({
  children,
  className,
  delay = 0,
  duration = 0.8,
}: FadeInProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, delay * 1000)

    return () => clearTimeout(timer)
  }, [delay])

  return (
    <div
      className={cn(className)}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity ${duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s, transform ${duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s`,
      }}
    >
      {children}
    </div>
  )
}
