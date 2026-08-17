import { ProductCard } from './ProductCard'

export function ProductGrid({ products, emptyMessage = 'No products match your filters.' }) {
  if (!products?.length) {
    return (
      <div className="rounded-lg border border-dashed border-slate-300 bg-white p-12 text-center text-sm text-slate-500">
        {emptyMessage}
      </div>
    )
  }
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  )
}
