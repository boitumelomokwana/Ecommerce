import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { useCart } from '@/hooks/useCart'
import { formatCurrency } from '@/utils/formatCurrency'

export function CartItem({ item, dense = false }) {
  const { updateQuantity, removeItem } = useCart()
  const unit = item.price + (item.variantPriceDelta ?? 0)
  const lineTotal = unit * item.quantity

  return (
    <div
      className={`flex gap-3 ${
        dense ? 'py-3' : 'border-b border-slate-200 py-4 last:border-0'
      }`}
    >
      <Link
        to={`/product/${item.id}`}
        className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-slate-100"
      >
        <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
      </Link>

      <div className="flex flex-1 flex-col">
        <div className="flex justify-between gap-2">
          <div>
            <Link
              to={`/product/${item.id}`}
              className="text-sm font-medium text-slate-900 hover:underline"
            >
              {item.name}
            </Link>
            {item.variantLabel && (
              <p className="text-xs text-slate-500">{item.variantLabel}</p>
            )}
          </div>
          <span className="text-sm font-medium text-slate-900">
            {formatCurrency(lineTotal)}
          </span>
        </div>

        <div className="mt-2 flex items-center justify-between">
          <div className="inline-flex items-center rounded-md border border-slate-300">
            <button
              type="button"
              aria-label="Decrease quantity"
              onClick={() => updateQuantity(item.lineId, item.quantity - 1)}
              className="h-8 w-8 text-slate-700 hover:bg-slate-50"
            >
              −
            </button>
            <span className="w-8 text-center text-sm">{item.quantity}</span>
            <button
              type="button"
              aria-label="Increase quantity"
              onClick={() => updateQuantity(item.lineId, item.quantity + 1)}
              className="h-8 w-8 text-slate-700 hover:bg-slate-50"
            >
              +
            </button>
          </div>
          <button
            type="button"
            onClick={() => removeItem(item.lineId)}
            className="text-xs text-slate-500 hover:text-red-600"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  )
}
