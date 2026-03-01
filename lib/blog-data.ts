export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  date: string
  readTime: string
  keywords: string[]
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'cuanto-cuesta-impresion-3d-barranquilla',
    title: '¿Cuánto Cuesta la Impresión 3D en Barranquilla? (Guía de Precios 2026)',
    excerpt: 'Descubre los factores que determinan el precio de una impresión 3D y cómo cotizar tu proyecto en Barranquilla.',
    date: '2026-02-28',
    readTime: '5 min',
    keywords: ['precio impresión 3D', 'costo impresión 3D Barranquilla', 'cuánto cuesta impresión 3D'],
  },
  {
    slug: 'como-preparar-archivo-stl',
    title: 'Cómo Preparar tu Archivo STL para Impresión 3D',
    excerpt: 'Guía paso a paso para exportar y preparar correctamente tu archivo STL desde cualquier software de diseño.',
    date: '2026-02-28',
    readTime: '4 min',
    keywords: ['archivo STL', 'preparar STL impresión 3D', 'exportar STL'],
  },
  {
    slug: 'impresion-3d-tesis-universitarias',
    title: 'Impresión 3D para Tesis Universitarias en Barranquilla',
    excerpt: 'Todo lo que necesitas saber para incluir prototipos impresos en 3D en tu tesis de grado.',
    date: '2026-02-28',
    readTime: '6 min',
    keywords: ['impresión 3D tesis', 'prototipo tesis universidad Barranquilla'],
  },
]
