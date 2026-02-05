'use client'

import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
  showText?: boolean
}

export default function Logo({ className, showText = true }: LogoProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      {/* Logo placeholder - geometric 3D printer icon */}
      <div className="relative w-10 h-10">
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Printer frame */}
          <rect
            x="4"
            y="8"
            width="32"
            height="28"
            rx="2"
            stroke="#00D67F"
            strokeWidth="2"
            fill="none"
          />
          {/* Top bar */}
          <rect
            x="8"
            y="4"
            width="24"
            height="4"
            rx="1"
            fill="#00D67F"
          />
          {/* Print head */}
          <rect
            x="16"
            y="12"
            width="8"
            height="6"
            rx="1"
            fill="#00D67F"
          />
          {/* Printed object */}
          <path
            d="M14 32L20 22L26 32H14Z"
            fill="#00D67F"
            opacity="0.8"
          />
          {/* Build plate */}
          <rect
            x="10"
            y="32"
            width="20"
            height="2"
            rx="1"
            fill="#00D67F"
          />
        </svg>
      </div>
      {showText && (
        <span className="text-xl font-bold text-primary">
          Tecnoprints
        </span>
      )}
    </div>
  )
}
