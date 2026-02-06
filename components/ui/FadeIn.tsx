'use client'

import { useEffect, useState, ReactNode, memo } from 'react'
import { cn } from '@/lib/utils'
import { EASING } from '@/lib/animation'

interface FadeInProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
}

/**
 * FadeIn Component
 * Animates children on page load with a staggered fade and slide-up effect
 * Uses GPU-accelerated transforms for smooth performance
 */
function FadeIn({
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
        transition: `opacity ${duration}s ${EASING.smooth} 0s, transform ${duration}s ${EASING.smooth} 0s`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  )
}

export default memo(FadeIn)
