import { Link } from 'react-router-dom'
import { ProductGrid } from '@/components/product/ProductGrid'
import { Button } from '@/components/ui/Button'
import { PRODUCTS } from '@/data/mockProducts'

export function Home() {
  const featured = PRODUCTS.slice(0, 4)
  return (
    <div className="flex flex-col gap-10">
      <section className="overflow-hidden rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 px-8 py-16 text-white">
        <div className="mx-auto max-w-2xl">
          <p className="text-sm uppercase tracking-wide text-brand-100">New season</p>
          <h1 className="mt-2 text-4xl font-bold sm:text-5xl">
            Stuff you'll actually use.
          </h1>
          <p className="mt-4 text-brand-100">
            A small, opinionated catalog of electronics, apparel, home goods, and books.
            No fluff, no upsells, no fake urgency.
          </p>
          <div className="mt-6 flex gap-3">
            <Link to="/catalog">
              <Button variant="secondary" size="lg">
                Browse catalog
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-end justify-between">
          <h2 className="text-xl font-semibold text-slate-900">Featured</h2>
          <Link to="/catalog" className="text-sm text-brand-600 hover:underline">
            View all →
          </Link>
        </div>
        <ProductGrid products={featured} />
      </section>
    </div>
  )
}
