import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { CartItem } from '@/components/cart/CartItem'
import { useCart } from '@/hooks/useCart'
import { formatCurrency } from '@/utils/formatCurrency'

export function CartPage() {
  const { items, subtotal, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <div className="py-16 text-center">
        <h1 className="text-2xl font-semibold text-slate-900">Your cart is empty</h1>
        <p className="mt-2 text-slate-600">Find something nice in our catalog.</p>
        <Link to="/catalog" className="mt-4 inline-block">
          <Button>Browse catalog</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-900">Your cart</h1>
        <button
          type="button"
          onClick={clearCart}
          className="text-sm text-slate-500 hover:text-red-600"
        >
          Clear cart
        </button>
      </header>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          {items.map((item) => (
            <CartItem key={item.lineId} item={item} />
          ))}
        </div>

        <aside className="h-fit rounded-lg border border-slate-200 bg-white p-5">
          <h2 className="text-sm font-semibold text-slate-900">Order summary</h2>
          <dl className="mt-3 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-slate-600">Subtotal</dt>
              <dd className="text-slate-900">{formatCurrency(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-600">Shipping</dt>
              <dd className="text-slate-500">Calculated at checkout</dd>
            </div>
          </dl>
          <Link to="/checkout" className="mt-5 block">
            <Button className="w-full">Proceed to checkout</Button>
          </Link>
        </aside>
      </div>
    </div>
  )
}
