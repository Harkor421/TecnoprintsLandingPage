import { MetadataRoute } from 'next'
import { BLOG_POSTS } from '@/lib/blog-data'

const API_BASE = 'https://tecnoprints-api-production.up.railway.app'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages (no anchor links — Google doesn't index fragments)
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: 'https://tecnoprints.com',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://tecnoprints.com/servicios-impresion-3d-barranquilla',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: 'https://tecnoprints.com/catalogo',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: 'https://tecnoprints.com/cotizar-impresion-3d',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://tecnoprints.com/blog',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]

  // Blog posts
  const blogPages: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `https://tecnoprints.com/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Dynamic model pages
  let modelPages: MetadataRoute.Sitemap = []

  try {
    // Fetch popular models to include in sitemap
    const res = await fetch(`${API_BASE}/api/models?page=1&limit=50`, {
      next: { revalidate: 86400 }, // Revalidate once per day
    })

    if (res.ok) {
      const data = await res.json()
      const models = data.models || []

      modelPages = models.map((model: { id: number }) => ({
        url: `https://tecnoprints.com/model/${model.id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      }))
    }
  } catch (error) {
    console.error('Failed to fetch models for sitemap:', error)
  }

  return [...staticPages, ...blogPages, ...modelPages]
}
