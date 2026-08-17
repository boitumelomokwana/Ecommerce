import { Link } from 'react-router-dom'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { CartItem } from './CartItem'
import { useCart } from '@/hooks/useCart'
import { formatCurrency } from '@/utils/formatCurrency'

export function CartDrawer({ open, onClose }) {
  const { items, subtotal } = useCart()

  return (
    <Modal
      open={open}
      onClose={onClose}
      ariaLabel="Shopping cart"
      panelClassName="ml-auto h-full w-full max-w-md rounded-l-lg rounded-r-none bg-white p-0"
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <h2 className="text-base font-semibold text-slate-900">Your cart</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close cart"
            className="text-slate-500 hover:text-slate-900"
          >
            ×
          </button>
        </div>

        <div className="flex-1 overflow-auto px-5">
          {items.length === 0 ? (
            <div className="py-12 text-center text-sm text-slate-500">
              Your cart is empty.
              <div className="mt-4">
                <Link to="/catalog" onClick={onClose}>
                  <Button variant="outline">Browse products</Button>
                </Link>
              </div>
            </div>
          ) : (
            items.map((item) => <CartItem key={item.lineId} item={item} dense />)
          )}
        </div>

        <div className="border-t border-slate-200 px-5 py-4">
          <div className="mb-3 flex items-center justify-between text-sm">
            <span className="text-slate-600">Subtotal</span>
            <span className="font-semibold text-slate-900">
              {formatCurrency(subtotal)}
            </span>
          </div>
          <Link to="/checkout" onClick={onClose}>
            <Button className="w-full" disabled={items.length === 0}>
              Checkout
            </Button>
          </Link>
          <Link
            to="/cart"
            onClick={onClose}
            className="mt-2 block text-center text-xs text-slate-500 hover:underline"
          >
            View full cart
          </Link>
        </div>
      </div>
    </Modal>
  )
}
