import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { defaultMetadata, viewport as seoViewport, generateLocalBusinessSchema } from '@/lib/seo'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import WhatsAppFloat from '@/components/ui/WhatsAppFloat'
import { CartProvider } from '@/lib/cart'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = defaultMetadata
export const viewport: Viewport = seoViewport

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateLocalBusinessSchema()),
          }}
        />
      </head>
      <body className={`${inter.className} bg-background text-white antialiased`}>
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <WhatsAppFloat />
        </CartProvider>
      </body>
    </html>
  )
}
