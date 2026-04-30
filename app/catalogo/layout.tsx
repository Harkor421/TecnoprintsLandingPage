import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Catálogo de Modelos 3D | Tecnoprints',
  description: 'Explora más de 1,900 modelos 3D listos para imprimir. Llaveros, figuras, decoración, organizadores y más. Agrégalos al carrito y nosotros los imprimimos.',
  alternates: {
    canonical: 'https://tecnoprints.com/catalogo',
  },
  openGraph: {
    title: 'Catálogo de Modelos 3D | Tecnoprints',
    description: 'Explora más de 1,900 modelos 3D listos para imprimir en Barranquilla.',
    url: 'https://tecnoprints.com/catalogo',
  },
}

export default function CatalogoLayout({ children }: { children: React.ReactNode }) {
  return children
}
