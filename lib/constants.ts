/**
 * Application-wide constants
 * Centralized configuration for navigation, animation timings, and site metadata
 */

export const NAVIGATION = [
  { href: '#services', label: 'Servicios' },
  { href: '#process', label: 'Cómo Funciona' },
  { href: '#about', label: 'Nosotros' },
  { href: '#contact', label: 'Contacto' },
] as const

export const ANIMATION = {
  FADE_IN_DURATION: 0.8,
  FADE_IN_DELAY_UNIT: 0.15,
  SCROLL_THRESHOLD: 20,
} as const

export const PARTNERS = [
  {
    name: 'Degentech SAS',
    logo: '/degentech-logo.png',
    url: 'https://degentech.co',
  },
  {
    name: 'Centro INCA',
    logo: '/inca-logo.png',
    url: 'https://centroinca.com/centroinca/',
  },
] as const

export const HERO_STATS = [
  { label: 'Proyectos Entregados', value: 500, suffix: '+' },
  { label: 'Tiempo de Entrega', value: 24, suffix: 'h' },
  { label: 'Satisfacción', value: 99, suffix: '%' },
  { label: 'Clientes Activos', value: 50, suffix: '+' },
] as const

export const HERO_FEATURES = [
  'Entrega en 24-48h',
  'Sin Pedido Mínimo',
] as const

export const CTA_BENEFITS = [
  'Sin cantidad mínima de pedido',
  'Cotizaciones en línea instantáneas',
  'Equipo de soporte experto',
  'Opciones de envío rápido',
] as const

export const SITE_CONFIG = {
  title: 'Tecnoprints - Impresión 3D para Todos',
  description:
    'Transformamos ideas en realidad con tecnología de impresión 3D de alta precisión para estudiantes, emprendedores, makers y empresas.',
  url: 'https://tecnoprints.co',
} as const
