import { Metadata } from 'next'

const API_BASE = 'https://aware-forgiveness-production.up.railway.app'

interface ModelDetail {
  id: number
  title: string
  description: string
  cover: string
  creator: string
  weight: number
  printTimeMinutes: number
}

export async function generateMetadata({
  params,
}: {
  params: { id: string }
}): Promise<Metadata> {
  try {
    const res = await fetch(`${API_BASE}/api/models/${params.id}`, {
      cache: 'revalidate',
    })

    if (!res.ok) {
      return {
        title: 'Modelo 3D | Tecnoprints',
        description: 'Impresión 3D en Barranquilla - Tecnoprints',
      }
    }

    const model: ModelDetail = await res.json()

    // Clean HTML tags from description
    const plainDescription = model.description
      .replace(/<[^>]*>/g, '')
      .substring(0, 160)

    return {
      title: `${model.title} | Tecnoprints 3D`,
      description: `${plainDescription}... Mira este modelo 3D en Tecnoprints, impresión profesional en Barranquilla.`,
      openGraph: {
        title: model.title,
        description: `Imprime ${model.title} en Tecnoprints 3D Barranquilla`,
        images: [
          {
            url: model.cover,
            width: 1200,
            height: 630,
            alt: model.title,
          },
        ],
        url: `https://tecnoprints.com/model/${model.id}`,
        type: 'website',
        siteName: 'Tecnoprints 3D',
      },
      twitter: {
        card: 'summary_large_image',
        title: model.title,
        description: `Mira este modelo 3D en Tecnoprints - ${model.creator}`,
        images: [model.cover],
      },
    }
  } catch (error) {
    return {
      title: 'Modelo 3D | Tecnoprints',
      description: 'Impresión 3D profesional en Barranquilla',
    }
  }
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
