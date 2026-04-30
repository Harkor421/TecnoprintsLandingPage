'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { ShoppingCart, Check, Heart, Download } from 'lucide-react'
import { useCart } from '@/lib/cart'

export interface ProductCardModel {
  id: number
  title: string
  cover: string
  url: string
  likeCount?: number
  downloadCount?: number
  printCount?: number
  creator?: string
}

export default function ProductCard({
  model,
  size = 'md',
  priority = false,
  onAfterAdd,
}: {
  model: ProductCardModel
  size?: 'sm' | 'md' | 'lg'
  priority?: boolean
  onAfterAdd?: () => void
}) {
  const { addItem, items } = useCart()
  const [justAdded, setJustAdded] = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)
  const inCart = items.some((i) => i.id === model.id)

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem({
      id: model.id,
      title: model.title,
      cover: model.cover,
      url: model.url,
    })
    setJustAdded(true)
    setTimeout(() => {
      setJustAdded(false)
      onAfterAdd?.()
    }, 700)
  }

  const formatNum = (n: number) => {
    if (n >= 1000) return `${(n / 1000).toFixed(1)}k`
    return n.toString()
  }

  const sizeClasses = {
    sm: 'min-w-[130px] sm:min-w-[160px]',
    md: 'min-w-[150px] sm:min-w-[200px]',
    lg: 'w-full',
  }

  return (
    <Link
      href={`/model/${model.id}`}
      className={`group block ${sizeClasses[size]} bg-surface border border-border hover:border-primary/40 active:border-primary/40 rounded-lg overflow-hidden transition-all duration-200 hover:shadow-lg hover:shadow-primary/5 touch-manipulation`}
    >
      {/* Image */}
      <div className="aspect-square relative bg-surface overflow-hidden">
        {/* Skeleton shimmer */}
        {!imgLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-surface via-border/40 to-surface animate-shimmer bg-[length:200%_100%]" />
        )}
        <Image
          src={model.cover}
          alt={model.title}
          fill
          unoptimized
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          onLoad={() => setImgLoaded(true)}
          onError={() => setImgLoaded(true)}
          className={`object-cover group-hover:scale-105 transition-all duration-300 ${
            imgLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 200px"
        />

        {/* Stats badge */}
        {(model.downloadCount || model.likeCount) && (
          <div className="absolute top-2 left-2 flex gap-1.5">
            {model.downloadCount !== undefined && model.downloadCount > 0 && (
              <span className="flex items-center gap-1 px-1.5 py-0.5 bg-black/70 backdrop-blur-sm rounded text-[10px] text-white font-medium">
                <Download size={10} />
                {formatNum(model.downloadCount)}
              </span>
            )}
            {model.likeCount !== undefined && model.likeCount > 100 && (
              <span className="flex items-center gap-1 px-1.5 py-0.5 bg-black/70 backdrop-blur-sm rounded text-[10px] text-white font-medium">
                <Heart size={10} />
                {formatNum(model.likeCount)}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-2 sm:p-3 flex flex-col gap-1.5 sm:gap-2">
        <h3 className="text-[12px] sm:text-sm font-medium text-white line-clamp-2 leading-snug min-h-[2.4em]">
          {model.title}
        </h3>

        {model.creator && (
          <p className="text-[10px] sm:text-[11px] text-muted truncate">
            por {model.creator}
          </p>
        )}

        <button
          onClick={handleAdd}
          className={`w-full py-2 sm:py-2 text-[11px] sm:text-xs font-semibold rounded transition-colors flex items-center justify-center gap-1 active:scale-95 touch-manipulation ${
            justAdded
              ? 'bg-primary/80 text-black'
              : inCart
                ? 'bg-surface border border-primary text-primary hover:bg-primary/10'
                : 'bg-primary text-black hover:bg-primary-dark'
          }`}
        >
          {justAdded ? (
            <><Check size={12} /> Agregado</>
          ) : inCart ? (
            <><ShoppingCart size={12} /> En carrito</>
          ) : (
            <><ShoppingCart size={12} /> Agregar</>
          )}
        </button>
      </div>
    </Link>
  )
}
