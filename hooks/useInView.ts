/**
 * Custom hook for Intersection Observer
 * Detects when an element enters the viewport
 */

import { useEffect, useRef, useState } from 'react'

interface UseInViewOptions {
  threshold?: number | number[]
  margin?: string
}

export const useInView = (options?: UseInViewOptions) => {
  const ref = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)
  const hasBeenInView = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true)
        hasBeenInView.current = true
        observer.unobserve(entry.target)
      }
    }, {
      threshold: options?.threshold ?? 0.1,
      rootMargin: options?.margin ?? '0px',
    })

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [options?.threshold, options?.margin])

  return { ref, isInView, hasBeenInView: hasBeenInView.current }
}
