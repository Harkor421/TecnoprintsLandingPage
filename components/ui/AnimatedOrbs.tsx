'use client'

import { useEffect, useState } from 'react'

interface Orb {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
  opacity: number
}

export default function AnimatedOrbs() {
  const [orbs, setOrbs] = useState<Orb[]>([])

  useEffect(() => {
    const generatedOrbs: Orb[] = [
      { id: 1, x: 20, y: 20, size: 400, duration: 20, delay: 0, opacity: 0.15 },
      { id: 2, x: 70, y: 60, size: 350, duration: 25, delay: 2, opacity: 0.12 },
      { id: 3, x: 40, y: 80, size: 300, duration: 18, delay: 4, opacity: 0.1 },
      { id: 4, x: 80, y: 30, size: 250, duration: 22, delay: 1, opacity: 0.08 },
      { id: 5, x: 10, y: 50, size: 200, duration: 15, delay: 3, opacity: 0.12 },
    ]
    setOrbs(generatedOrbs)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {orbs.map((orb) => (
        <div
          key={orb.id}
          className="absolute rounded-full blur-[100px] animate-orb"
          style={{
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            width: `${orb.size}px`,
            height: `${orb.size}px`,
            background: `radial-gradient(circle, rgba(0, 214, 127, ${orb.opacity}) 0%, transparent 70%)`,
            animation: `orb-float ${orb.duration}s ease-in-out infinite, orb-pulse ${orb.duration / 2}s ease-in-out infinite`,
            animationDelay: `${orb.delay}s`,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}

      <style jsx>{`
        @keyframes orb-float {
          0%, 100% {
            transform: translate(-50%, -50%) translate(0, 0);
          }
          25% {
            transform: translate(-50%, -50%) translate(30px, -40px);
          }
          50% {
            transform: translate(-50%, -50%) translate(-20px, 20px);
          }
          75% {
            transform: translate(-50%, -50%) translate(40px, 30px);
          }
        }

        @keyframes orb-pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.6;
          }
        }
      `}</style>
    </div>
  )
}
