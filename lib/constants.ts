/**
 * Application-wide constants
 * Centralized configuration for navigation, animation timings, and site metadata
 */

export const NAVIGATION = [
  { href: '/servicios-impresion-3d-barranquilla', label: 'Servicios' },
  { href: '/#catalog', label: 'Catálogo' },
  { href: '/#process', label: 'Cómo Funciona' },
  { href: '/#about', label: 'Nosotros' },
  { href: '/blog', label: 'Blog' },
  { href: '/#contact', label: 'Contacto' },
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
  { label: 'Entrega Express', value: 48, suffix: 'h' },
  { label: 'Satisfacción', value: 99, suffix: '%' },
  { label: 'Clientes Activos', value: 50, suffix: '+' },
] as const

export const HERO_FEATURES = [
  'Entrega el mismo día',
  'Sin Pedido Mínimo',
] as const

export const CTA_BENEFITS = [
  'Sin cantidad mínima de pedido',
  'Cotizaciones en línea instantáneas',
  'Equipo de soporte experto',
  'Entrega disponible el mismo día',
] as const

export const FAQ_DATA = [
  {
    question: '¿Qué materiales utilizan para la impresión 3D?',
    answer:
      'Trabajamos principalmente con PLA (Ácido Poliláctico) en diversas variantes: PLA Estándar, PLA+ de alta resistencia, PLA Silk con acabado brillante, y PLA Mate. Cada material tiene propiedades específicas para diferentes aplicaciones.',
  },
  {
    question: '¿Cuánto tiempo tarda en llegar mi pedido?',
    answer:
      'Los tiempos de entrega varían según la complejidad del proyecto. Para prototipos simples, ofrecemos entrega el mismo día o en menos de 48 horas. Proyectos más complejos o lotes grandes pueden tomar de 3 a 7 días hábiles. Siempre te proporcionamos una estimación precisa al momento de cotizar.',
  },
  {
    question: '¿Qué formatos de archivo aceptan?',
    answer:
      'Aceptamos los formatos más comunes de modelos 3D: STL, OBJ, STEP y STP. Si tienes tu diseño en otro formato, contáctanos y te ayudaremos a convertirlo sin costo adicional.',
  },
  {
    question: '¿Cuál es el tamaño máximo de impresión?',
    answer:
      'Nuestras impresoras pueden fabricar piezas de hasta 256 x 256 x 256 mm en una sola pieza. Para proyectos más grandes, podemos dividir el diseño en secciones que se ensamblan posteriormente.',
  },
  {
    question: '¿Ofrecen servicios de diseño 3D?',
    answer:
      'Sí, contamos con un equipo de diseñadores especializados que pueden ayudarte a crear o modificar modelos 3D. Ya sea que tengas un boceto, una idea, o necesites optimizar un diseño existente, estamos aquí para apoyarte.',
  },
  {
    question: '¿Hacen envíos a toda Colombia?',
    answer:
      'Estamos ubicados en Barranquilla, Colombia. Realizamos envíos a todo el país a través de paqueterías confiables. Los costos de envío se calculan según tu ubicación al momento de cotizar. Para pedidos grandes, ofrecemos tarifas especiales de envío.',
  },
] as const

export const SITE_CONFIG = {
  title: 'Tecnoprints - Impresión 3D para Todos',
  description:
    'Transformamos ideas en realidad con tecnología de impresión 3D de alta precisión para estudiantes, emprendedores, makers y empresas.',
  url: 'https://tecnoprints.com',
} as const
