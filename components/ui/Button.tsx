'use client'

import { cn } from '@/lib/utils'
import { forwardRef, ButtonHTMLAttributes, memo } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

/**
 * Button Component
 * Reusable button with multiple variants and sizes
 * Memoized to prevent unnecessary re-renders
 */
const Button = memo(
  forwardRef<HTMLButtonElement, ButtonProps>(
    (
      { className, variant = 'primary', size = 'md', children, ...props },
      ref
    ) => {
      return (
        <button
          ref={ref}
          className={cn(
            'inline-flex items-center justify-center font-medium',
            'transition-colors duration-200',
            'focus:outline-none focus:ring-2 focus:ring-primary/50',
            'disabled:opacity-50 disabled:pointer-events-none',
            {
              // Primary variant - clean, professional
              'bg-primary text-black font-semibold hover:bg-primary-dark':
                variant === 'primary',
              // Secondary variant
              'bg-surface text-white border border-border hover:border-primary/70':
                variant === 'secondary',
              // Outline variant
              'border border-border bg-transparent text-white hover:bg-surface/50 hover:border-primary/70':
                variant === 'outline',
              // Ghost variant
              'bg-transparent text-muted hover:text-white':
                variant === 'ghost',
            },
            {
              'px-3 py-1.5 text-sm': size === 'sm',
              'px-5 py-2.5 text-base': size === 'md',
              'px-8 py-3 text-lg': size === 'lg',
            },
            className
          )}
          {...props}
        >
          {children}
        </button>
      )
    }
  )
)

Button.displayName = 'Button'

export default Button
