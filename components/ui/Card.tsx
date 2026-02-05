'use client'

import { cn } from '@/lib/utils'
import { HTMLAttributes, forwardRef } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean
  glowOnHover?: boolean
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, hover = true, glowOnHover = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'relative bg-surface border border-border p-6 overflow-hidden',
          hover && [
            'transition-colors duration-200',
            'hover:border-primary/50',
            'group',
          ],
          className
        )}
        {...props}
      >
        {/* Subtle gradient overlay on hover */}
        {hover && (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        )}
        <div className="relative z-10">{children}</div>
      </div>
    )
  }
)

Card.displayName = 'Card'

export default Card
