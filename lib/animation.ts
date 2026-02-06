/**
 * Animation utilities and configurations
 * Reusable animation presets and easing functions
 */

export const EASING = {
  smooth: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  ease: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
} as const

export const createFadeInAnimation = (duration: number, delay: number) => ({
  opacity: 1,
  transform: 'translateY(0)',
  transition: `opacity ${duration}s ${EASING.smooth}, transform ${duration}s ${EASING.smooth}`,
  transitionDelay: `${delay}s`,
})

export const createFadeOutAnimation = (duration: number) => ({
  opacity: 0,
  transform: 'translateY(20px)',
  transition: `opacity ${duration}s ${EASING.smooth}, transform ${duration}s ${EASING.smooth}`,
})

export const createScrollFadeInAnimation = (
  isVisible: boolean,
  duration: number
) => ({
  opacity: isVisible ? 1 : 0,
  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
  transition: `opacity ${duration}s ${EASING.smooth}, transform ${duration}s ${EASING.smooth}`,
})
