'use client'

import { useState, memo } from 'react'
import Link from 'next/link'
import { Menu, X, ShoppingCart } from 'lucide-react'
import Logo from '@/components/ui/Logo'
import Button from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import { NAVIGATION } from '@/lib/constants'
import { useCart } from '@/lib/cart'

function CartIcon() {
  const { totalItems } = useCart()
  return (
    <Link
      href="/carrito"
      className="relative p-2 text-muted hover:text-white transition-colors touch-manipulation"
      aria-label={`Carrito (${totalItems} items)`}
    >
      <ShoppingCart size={22} />
      {totalItems > 0 && (
        <span className="absolute -top-0.5 -right-0.5 bg-primary text-black text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
          {totalItems > 99 ? '99+' : totalItems}
        </span>
      )}
    </Link>
  )
}

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-transparent"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {NAVIGATION.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-muted hover:text-white transition-colors duration-200 text-sm font-medium"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA Button + Cart */}
          <div className="hidden md:flex items-center gap-3">
            <CartIcon />
            <Link href="https://wa.me/573239267656" target="_blank" rel="noopener noreferrer">
              <Button variant="primary" size="sm">
                Cotizar Ahora
              </Button>
            </Link>
          </div>

          {/* Mobile right side: cart + menu button */}
          <div className="md:hidden flex items-center gap-1 -mr-2">
            <CartIcon />
            <button
              className="p-2 text-muted hover:text-white transition-colors touch-manipulation"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Full screen overlay */}
      <div
        className={cn(
          'md:hidden fixed inset-0 top-16 bg-background/98 backdrop-blur-xl z-40 transition-all duration-300',
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        )}
      >
        <nav className="flex flex-col p-6 gap-2">
          {NAVIGATION.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'text-lg font-medium text-muted hover:text-white transition-all duration-300 py-4 px-4 rounded-lg hover:bg-surface active:bg-surface/80 touch-manipulation',
                isMobileMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
              )}
              style={{ transitionDelay: isMobileMenuOpen ? `${index * 50}ms` : '0ms' }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4 mt-4 border-t border-border">
            <Link
              href="https://wa.me/573239267656"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Button variant="primary" className="w-full py-4 text-lg touch-manipulation">
                Cotizar Ahora
              </Button>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default memo(Header)
