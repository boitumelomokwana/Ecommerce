import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { ProductGrid } from '@/components/product/ProductGrid'
import { findProductById, getRelatedProducts } from '@/data/mockProducts'
import { useCart } from '@/hooks/useCart'
import { useWishlist } from '@/hooks/useWishlist'
import { useToast } from '@/hooks/useToast'
import { formatCurrency } from '@/utils/formatCurrency'
import { cn } from '@/utils/classnames'

export function ProductDetails() {
  const { id } = useParams()
  const product = findProductById(id)
  const [variantId, setVariantId] = useState(product?.variants?.[0]?.id ?? null)
  const [qty, setQty] = useState(1)

  const { addItem } = useCart()
  const { isWishlisted, toggle } = useWishlist()
  const { push } = useToast()

  const related = useMemo(() => getRelatedProducts(product, 4), [product])

  if (!product) {
    return (
      <div className="py-16 text-center">
        <p className="text-slate-600">Product not found.</p>
        <Link to="/catalog" className="mt-4 inline-block text-brand-600 hover:underline">
          Back to catalog
        </Link>
      </div>
    )
  }

  const wished = isWishlisted(product.id)
  const variant = product.variants?.find((v) => v.id === variantId) ?? null
  const displayPrice = product.price + (variant?.priceDelta ?? 0)
  const onSale = product.compareAtPrice && product.compareAtPrice > product.price

  const handleAdd = () => {
    addItem(product, variant, qty)
    push(`Added ${qty} × "${product.name}" to cart`, { type: 'success' })
  }

  return (
    <div className="flex flex-col gap-10">
      <Link to="/catalog" className="text-sm text-slate-500 hover:text-slate-900">
        ← Back to catalog
      </Link>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="overflow-hidden rounded-lg bg-slate-100">
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-col gap-4">
          <p className="text-sm uppercase tracking-wide text-slate-500">{product.brand}</p>
          <h1 className="text-3xl font-semibold text-slate-900">{product.name}</h1>

          <div className="flex items-center gap-2 text-sm">
            <span aria-hidden className="text-amber-500">★</span>
            <span className="font-medium">{product.rating?.toFixed(1)}</span>
            <span className="text-slate-500">({product.reviewCount} reviews)</span>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-semibold text-slate-900">
              {formatCurrency(displayPrice)}
            </span>
            {onSale && (
              <span className="text-lg text-slate-400 line-through">
                {formatCurrency(product.compareAtPrice)}
              </span>
            )}
            {onSale && <Badge tone="sale">Sale</Badge>}
          </div>

          <p className="text-slate-700">{product.description}</p>

          {product.variants?.length > 1 && (
            <div>
              <h3 className="mb-2 text-sm font-medium text-slate-900">Variant</h3>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setVariantId(v.id)}
                    className={cn(
                      'rounded-md border px-3 py-1.5 text-sm',
                      variantId === v.id
                        ? 'border-brand-500 bg-brand-50 text-brand-700'
                        : 'border-slate-300 text-slate-700 hover:bg-slate-50'
                    )}
                  >
                    {v.label}
                    {v.priceDelta > 0 && ` (+${formatCurrency(v.priceDelta)})`}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center gap-3">
            <div className="inline-flex items-center rounded-md border border-slate-300">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="h-10 w-10 text-slate-700 hover:bg-slate-50"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="w-10 text-center">{qty}</span>
              <button
                type="button"
                onClick={() => setQty((q) => Math.min(product.stock || 99, q + 1))}
                className="h-10 w-10 text-slate-700 hover:bg-slate-50"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <Button onClick={handleAdd} disabled={product.stock === 0} className="flex-1">
              {product.stock === 0 ? 'Out of stock' : 'Add to cart'}
            </Button>
            <Button
              variant={wished ? 'danger' : 'outline'}
              onClick={() => toggle(product.id)}
              aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              {wished ? '♥' : '♡'}
            </Button>
          </div>

          <div className="flex gap-2 pt-2">
            {product.tags?.map((t) => (
              <Badge key={t} tone="default">
                {t}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section>
          <h2 className="mb-4 text-xl font-semibold text-slate-900">Related products</h2>
          <ProductGrid products={related} />
        </section>
      )}
    </div>
  )
}
