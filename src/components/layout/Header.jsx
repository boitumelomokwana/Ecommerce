import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Navbar } from './Navbar'
import { CartDrawer } from '@/components/cart/CartDrawer'
import { useCart } from '@/hooks/useCart'
import { useWishlist } from '@/hooks/useWishlist'

export function Header() {
  const [cartOpen, setCartOpen] = useState(false)
  const { totalItems } = useCart()
  const { count: wishCount } = useWishlist()

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4">
        <Link to="/" className="flex items-center gap-2 text-lg font-semibold text-slate-900">
          <span className="grid h-8 w-8 place-items-center rounded-md bg-brand-500 text-white">
            A
          </span>
          Acme Store
        </Link>

        <Navbar />

        <div className="flex items-center gap-1">
          <Link
            to="/catalog"
            className="hidden rounded-md p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 sm:block"
            aria-label="Search"
          >
            <span aria-hidden>⌕</span>
          </Link>
          <Link
            to="/catalog?wishlist=1"
            className="relative rounded-md p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            aria-label={`Wishlist (${wishCount})`}
          >
            <span aria-hidden>♡</span>
            {wishCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white">
                {wishCount}
              </span>
            )}
          </Link>
          <button
            type="button"
            onClick={() => setCartOpen(true)}
            className="relative rounded-md p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            aria-label={`Cart (${totalItems})`}
          >
            <span aria-hidden>🛒</span>
            {totalItems > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-brand-500 px-1 text-[10px] font-semibold text-white">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </header>
  )
}
