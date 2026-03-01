import { Metadata } from 'next'
import Link from 'next/link'
import { siteConfig, generateBreadcrumbSchema } from '@/lib/seo'
import { BLOG_POSTS } from '@/lib/blog-data'
import Breadcrumb from '@/components/ui/Breadcrumb'
import Card from '@/components/ui/Card'
import ScrollFadeIn from '@/components/ui/ScrollFadeIn'
import { Clock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Blog - Guías sobre Impresión 3D',
  description: 'Aprende sobre impresión 3D: guías de precios, preparación de archivos STL y consejos para proyectos universitarios en Barranquilla.',
  alternates: {
    canonical: `${siteConfig.url}/blog`,
  },
}

export default function BlogPage() {
  const schema = generateBreadcrumbSchema([
    { name: 'Inicio', url: siteConfig.url },
    { name: 'Blog', url: `${siteConfig.url}/blog` },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section className="pt-28 sm:pt-32 pb-16 sm:pb-20 md:pb-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[
            { label: 'Inicio', href: '/' },
            { label: 'Blog' },
          ]} />

          <ScrollFadeIn direction="up">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 mt-4">
              Blog de <span className="text-primary">Impresión 3D</span>
            </h1>
            <p className="text-muted max-w-2xl mb-12">
              Guías, tutoriales y consejos sobre impresión 3D en Barranquilla para estudiantes, makers y empresas.
            </p>
          </ScrollFadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {BLOG_POSTS.map((post, index) => (
              <ScrollFadeIn key={post.slug} direction="up" delay={0.1 * (index + 1)}>
                <Link href={`/blog/${post.slug}`} className="block h-full">
                  <Card hover className="p-6 h-full flex flex-col">
                    <h2 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-sm text-muted mb-4 flex-1">{post.excerpt}</p>
                    <div className="flex items-center gap-3 text-xs text-muted">
                      <Clock size={14} />
                      <span>{post.readTime} de lectura</span>
                    </div>
                  </Card>
                </Link>
              </ScrollFadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
