import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { BLOG_POSTS } from '@/lib/blog-data'
import { siteConfig, generateArticleSchema, generateBreadcrumbSchema } from '@/lib/seo'
import { CuantoCuestaContent, ComoPreparartSTLContent, TesisUniversitariasContent } from '@/lib/blog-content'
import Breadcrumb from '@/components/ui/Breadcrumb'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import ScrollFadeIn from '@/components/ui/ScrollFadeIn'
import { Clock } from 'lucide-react'

const contentMap: Record<string, () => JSX.Element> = {
  'cuanto-cuesta-impresion-3d-barranquilla': CuantoCuestaContent,
  'como-preparar-archivo-stl': ComoPreparartSTLContent,
  'impresion-3d-tesis-universitarias': TesisUniversitariasContent,
}

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug)
  if (!post) return {}

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.keywords,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      url: `${siteConfig.url}/blog/${post.slug}`,
    },
    alternates: {
      canonical: `${siteConfig.url}/blog/${post.slug}`,
    },
  }
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug)
  if (!post) notFound()

  const ContentComponent = contentMap[params.slug]
  if (!ContentComponent) notFound()

  const relatedPosts = BLOG_POSTS.filter((p) => p.slug !== params.slug)

  const schemas = [
    generateArticleSchema({
      title: post.title,
      description: post.excerpt,
      slug: post.slug,
      datePublished: post.date,
    }),
    generateBreadcrumbSchema([
      { name: 'Inicio', url: siteConfig.url },
      { name: 'Blog', url: `${siteConfig.url}/blog` },
      { name: post.title, url: `${siteConfig.url}/blog/${post.slug}` },
    ]),
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />

      <article className="pt-28 sm:pt-32 pb-16 sm:pb-20 md:pb-32">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[
            { label: 'Inicio', href: '/' },
            { label: 'Blog', href: '/blog' },
            { label: post.title },
          ]} />

          <ScrollFadeIn direction="up">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 mt-6">
              {post.title}
            </h1>
          </ScrollFadeIn>

          <ScrollFadeIn direction="up" delay={0.1}>
            <div className="flex items-center gap-4 text-sm text-muted mb-10">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span className="flex items-center gap-1">
                <Clock size={14} />
                {post.readTime} de lectura
              </span>
            </div>
          </ScrollFadeIn>

          {/* Article Body */}
          <ScrollFadeIn direction="up" delay={0.15}>
            <div className="space-y-4 text-muted leading-relaxed">
              <ContentComponent />
            </div>
          </ScrollFadeIn>

          {/* CTA */}
          <ScrollFadeIn direction="up" delay={0.2}>
            <div className="mt-12 p-6 border border-border bg-surface/50">
              <h3 className="text-xl font-bold mb-2">¿Listo para tu Proyecto?</h3>
              <p className="text-muted text-sm mb-4">
                Cotiza tu impresión 3D en Barranquilla ahora mismo.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="https://wa.me/573239267656" target="_blank" rel="noopener noreferrer">
                  <Button className="w-full sm:w-auto">Cotizar por WhatsApp</Button>
                </Link>
                <Link href="/cotizar-impresion-3d">
                  <Button variant="outline" className="w-full sm:w-auto">Estimador en Línea</Button>
                </Link>
              </div>
            </div>
          </ScrollFadeIn>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <ScrollFadeIn direction="up" delay={0.25}>
              <div className="mt-12">
                <h3 className="text-xl font-bold mb-6">Artículos Relacionados</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {relatedPosts.map((related) => (
                    <Link key={related.slug} href={`/blog/${related.slug}`}>
                      <Card hover className="p-5 h-full">
                        <h4 className="font-semibold text-sm mb-2">{related.title}</h4>
                        <p className="text-xs text-muted">{related.readTime} de lectura</p>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            </ScrollFadeIn>
          )}
        </div>
      </article>
    </>
  )
}
