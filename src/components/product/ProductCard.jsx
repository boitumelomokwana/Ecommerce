import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { useCart } from '@/hooks/useCart'
import { useToast } from '@/hooks/useToast'
import { useWishlist } from '@/hooks/useWishlist'
import { formatCurrency } from '@/utils/formatCurrency'
import { cn } from '@/utils/classnames'

function stockBadge(stock) {
  if (stock === 0) return { tone: 'out', label: 'Out of stock' }
  if (stock <= 5) return { tone: 'low', label: `Only ${stock} left` }
  return null
}

function isNew(createdAt) {
  if (!createdAt) return false
  const ageDays = (Date.now() - new Date(createdAt).getTime()) / (1000 * 60 * 60 * 24)
  return ageDays <= 30
}

export function ProductCard({ product }) {
  const { addItem } = useCart()
  const { toggle, isWishlisted } = useWishlist()
  const { push } = useToast()
  const wished = isWishlisted(product.id)
  const sale = product.compareAtPrice && product.compareAtPrice > product.price
  const low = stockBadge(product.stock)
  const fresh = isNew(product.createdAt)

  const handleAdd = (e) => {
    e.preventDefault()
    addItem(product, product.variants?.[0], 1)
    push(`Added "${product.name}" to cart`, { type: 'success' })
  }

  const handleWish = (e) => {
    e.preventDefault()
    toggle(product.id)
  }

  return (
    <Link
      to={`/product/${product.id}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-slate-200 bg-white transition hover:shadow-md"
    >
      <div className="relative aspect-square overflow-hidden bg-slate-100">
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition group-hover:scale-105"
        />
        <div className="absolute left-2 top-2 flex gap-1">
          {sale && <Badge tone="sale">Sale</Badge>}
          {fresh && <Badge tone="new">New</Badge>}
          {low && <Badge tone={low.tone}>{low.label}</Badge>}
        </div>
        <button
          type="button"
          onClick={handleWish}
          aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
          className={cn(
            'absolute right-2 top-2 rounded-full bg-white/90 p-1.5 text-lg shadow',
            'hover:bg-white',
            wished ? 'text-red-500' : 'text-slate-400'
          )}
        >
          {wished ? '♥' : '♡'}
        </button>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs uppercase tracking-wide text-slate-500">{product.brand}</p>
        <h3 className="mt-1 line-clamp-2 text-sm font-medium text-slate-900">
          {product.name}
        </h3>
        <div className="mt-2 flex items-center gap-1 text-xs text-slate-600">
          <span aria-hidden>★</span>
          <span>{product.rating?.toFixed(1) ?? '—'}</span>
          <span className="text-slate-400">({product.reviewCount ?? 0})</span>
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-lg font-semibold text-slate-900">
            {formatCurrency(product.price)}
          </span>
          {sale && (
            <span className="text-sm text-slate-400 line-through">
              {formatCurrency(product.compareAtPrice)}
            </span>
          )}
        </div>
        <div className="mt-3">
          <Button
            size="sm"
            className="w-full"
            onClick={handleAdd}
            disabled={product.stock === 0}
          >
            {product.stock === 0 ? 'Out of stock' : 'Add to cart'}
          </Button>
        </div>
      </div>
    </Link>
  )
}
