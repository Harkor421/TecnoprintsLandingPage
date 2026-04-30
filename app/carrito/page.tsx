'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Trash2, Plus, Minus, ShoppingCart, ChevronLeft, AlertCircle, Ruler } from 'lucide-react'
import { useCart, MIN_ORDER_PRICE, MIN_ITEM_PRICE, formatCOP } from '@/lib/cart'

const WhatsAppIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, totalPrice, totalItems } = useCart()

  const meetsMinimum = totalPrice >= MIN_ORDER_PRICE
  const missingAmount = MIN_ORDER_PRICE - totalPrice

  const buildWhatsappMessage = () => {
    const lines: string[] = [
      'Hola! Me gustaría cotizar los siguientes modelos 3D:',
      '',
    ]

    items.forEach((item, idx) => {
      lines.push(`${idx + 1}. ${item.title}`)
      lines.push(`   Cantidad: ${item.quantity}`)
      lines.push(`   Link: ${item.url}`)
      if (item.weight) {
        lines.push(`   Peso aprox: ${item.weight}g`)
      }
      const itemPrice = item.estimatedPrice || MIN_ITEM_PRICE
      lines.push(`   Precio estimado por unidad: ${formatCOP(itemPrice)}`)
      lines.push('')
    })

    lines.push('---')
    lines.push(`Total estimado: ${formatCOP(totalPrice)}`)
    lines.push(`Total de piezas: ${totalItems}`)
    lines.push('')
    lines.push('Quisiera confirmar las dimensiones, el precio final, opciones de color y tiempo de entrega. Gracias!')

    return lines.join('\n')
  }

  const whatsappUrl = `https://wa.me/573239267656?text=${encodeURIComponent(buildWhatsappMessage())}`

  if (items.length === 0) {
    return (
      <div className="min-h-[80dvh] bg-gradient-to-b from-background via-background to-surface/50 flex items-center justify-center px-4 pt-20">
        <div className="text-center max-w-md">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-surface border border-border mb-6">
            <ShoppingCart size={32} className="text-muted" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-3">Tu carrito está vacío</h1>
          <p className="text-muted mb-8">
            Explora nuestro catálogo de modelos 3D y agrega los que quieras imprimir.
          </p>
          <Link
            href="/#catalog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-black font-semibold rounded-lg hover:bg-primary-dark transition-colors"
          >
            <ChevronLeft size={18} />
            Ir al catálogo
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[80dvh] bg-gradient-to-b from-background via-background to-surface/50 pt-16 sm:pt-24 pb-12">
      <div className="max-w-5xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-4 sm:mb-8 pt-4 sm:pt-0">
          <Link
            href="/catalogo"
            className="inline-flex items-center gap-1.5 text-muted hover:text-primary transition-colors text-xs sm:text-sm mb-3"
          >
            <ChevronLeft size={14} />
            Seguir explorando
          </Link>
          <div className="flex items-center justify-between gap-3">
            <h1 className="text-xl sm:text-3xl font-bold">Tu carrito</h1>
            <button
              onClick={() => {
                if (confirm('¿Vaciar el carrito?')) clearCart()
              }}
              className="text-[11px] sm:text-xs text-muted hover:text-red-400 active:text-red-400 transition-colors flex items-center gap-1 px-2 py-1"
            >
              <Trash2 size={13} />
              Vaciar
            </button>
          </div>
        </div>

        {/* Dimensions disclaimer */}
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6 flex items-start gap-2.5 sm:gap-3">
          <Ruler size={16} className="text-primary flex-shrink-0 mt-0.5" />
          <p className="text-[11px] sm:text-sm text-muted leading-snug sm:leading-relaxed">
            <span className="text-white font-medium">Las dimensiones</span> dependen del diseño original.
            Confirmamos las medidas exactas y el tamaño deseado por WhatsApp.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Items list */}
          <div className="lg:col-span-2 space-y-3">
            {items.map((item) => {
              const itemPrice = item.estimatedPrice || MIN_ITEM_PRICE
              const subtotal = itemPrice * item.quantity
              return (
                <div
                  key={item.id}
                  className="bg-surface border border-border rounded-lg p-3 sm:p-4 flex gap-3 sm:gap-4"
                >
                  {/* Image */}
                  <Link
                    href={`/model/${item.id}`}
                    className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 bg-background rounded overflow-hidden relative"
                  >
                    <Image
                      src={item.cover}
                      alt={item.title}
                      fill
                      unoptimized
                      className="object-cover"
                      sizes="96px"
                    />
                  </Link>

                  {/* Details */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <Link
                        href={`/model/${item.id}`}
                        className="text-sm font-medium text-white hover:text-primary transition-colors line-clamp-2 leading-tight"
                      >
                        {item.title}
                      </Link>
                      <p className="text-xs text-muted mt-1">
                        {formatCOP(itemPrice)} c/u
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-border rounded">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-1 text-muted hover:text-white transition-colors"
                          aria-label="Disminuir"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="px-3 text-sm font-medium min-w-[28px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 text-muted hover:text-white transition-colors"
                          aria-label="Aumentar"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-white">
                          {formatCOP(subtotal)}
                        </span>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-muted hover:text-red-400 transition-colors"
                          aria-label="Eliminar"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Summary sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-surface border border-border rounded-lg p-5 sm:p-6 lg:sticky lg:top-24">
              <h2 className="text-lg font-semibold mb-4">Resumen</h2>

              <div className="space-y-2 mb-4 pb-4 border-b border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Piezas</span>
                  <span className="text-white font-medium">{totalItems}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Subtotal estimado</span>
                  <span className="text-white font-medium">{formatCOP(totalPrice)}</span>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-xs text-muted mb-1">Total estimado</p>
                <p className="text-3xl font-bold text-primary">{formatCOP(totalPrice)}</p>
                <p className="text-[11px] text-muted mt-2">
                  *Precio final se confirma por WhatsApp según material, color y dimensiones.
                </p>
              </div>

              {!meetsMinimum && (
                <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 mb-4 flex items-start gap-2">
                  <AlertCircle size={16} className="text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-medium text-amber-300">
                      Pedido mínimo: {formatCOP(MIN_ORDER_PRICE)}
                    </p>
                    <p className="text-[11px] text-muted mt-0.5">
                      Te faltan {formatCOP(missingAmount)} para completar el pedido mínimo.
                    </p>
                  </div>
                </div>
              )}

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  if (!meetsMinimum) {
                    e.preventDefault()
                    alert(`El pedido mínimo es de ${formatCOP(MIN_ORDER_PRICE)}. Te faltan ${formatCOP(missingAmount)}.`)
                  }
                }}
                className={`w-full flex items-center justify-center gap-2 py-3 font-semibold text-sm rounded-lg transition-colors ${
                  meetsMinimum
                    ? 'bg-primary text-black hover:bg-primary-dark'
                    : 'bg-surface border border-border text-muted cursor-not-allowed'
                }`}
              >
                <WhatsAppIcon size={18} />
                {meetsMinimum ? 'Cotizar por WhatsApp' : 'Pedido mínimo no alcanzado'}
              </a>

              <Link
                href="/#catalog"
                className="w-full block text-center mt-3 py-2 text-sm text-muted hover:text-white transition-colors"
              >
                Seguir agregando modelos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
