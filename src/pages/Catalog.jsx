import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ProductGrid } from '@/components/product/ProductGrid'
import { ProductFilter } from '@/components/product/ProductFilter'
import { useFilter, FILTER_DEFAULTS } from '@/hooks/useFilter'
import { PRODUCTS } from '@/data/mockProducts'

export function Catalog() {
  const [params] = useSearchParams()
  const initial = useMemo(() => {
    const next = { ...FILTER_DEFAULTS }
    const cat = params.get('category')
    if (cat) next.category = cat
    return next
  }, [params])

  const { filters, setFilters, filtered, resetFilters } = useFilter(PRODUCTS, initial)

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="text-2xl font-semibold text-slate-900">Catalog</h1>
        <p className="text-sm text-slate-600">
          {filtered.length} of {PRODUCTS.length} products
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[260px_1fr]">
        <ProductFilter
          filters={filters}
          onChange={setFilters}
          onReset={resetFilters}
        />
        <ProductGrid products={filtered} />
      </div>
    </div>
  )
}
