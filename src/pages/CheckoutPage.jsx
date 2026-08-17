import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useCart } from '@/hooks/useCart'
import { useToast } from '@/hooks/useToast'
import { formatCurrency } from '@/utils/formatCurrency'
import { subtotal, tax, shipping, total } from '@/utils/priceCalc'

const TAX_RATE = 0.08
const SHIPPING_FEE = 8
const SHIPPING_THRESHOLD = 75

export function CheckoutPage() {
  const { items, clearCart } = useCart()
  const { push } = useToast()
  const [form, setForm] = useState({
    email: '',
    name: '',
    address: '',
    city: '',
    zip: '',
    country: 'US',
  })

  const sub = subtotal(items)
  const taxValue = tax(sub, TAX_RATE)
  const shipValue = shipping(sub, SHIPPING_FEE, SHIPPING_THRESHOLD)
  const grand = total({
    items,
    taxRate: TAX_RATE,
    shippingFee: SHIPPING_FEE,
    shippingThreshold: SHIPPING_THRESHOLD,
  })

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    push('Order placed! (demo)', { type: 'success' })
    clearCart()
  }

  if (items.length === 0) {
    return (
      <div className="py-16 text-center">
        <h1 className="text-2xl font-semibold text-slate-900">Nothing to check out</h1>
        <p className="mt-2 text-slate-600">Add some items to your cart first.</p>
        <Link to="/catalog" className="mt-4 inline-block">
          <Button>Browse catalog</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold text-slate-900">Checkout</h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]"
      >
        <div className="rounded-lg border border-slate-200 bg-white p-6">
          <h2 className="text-sm font-semibold text-slate-900">Shipping details</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input
              label="Email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={update('email')}
            />
            <Input
              label="Full name"
              name="name"
              required
              value={form.name}
              onChange={update('name')}
            />
            <Input
              label="Address"
              name="address"
              required
              value={form.address}
              onChange={update('address')}
              className="sm:col-span-2"
            />
            <Input
              label="City"
              name="city"
              required
              value={form.city}
              onChange={update('city')}
            />
            <Input
              label="ZIP / Postal"
              name="zip"
              required
              value={form.zip}
              onChange={update('zip')}
            />
          </div>
        </div>

        <aside className="h-fit rounded-lg border border-slate-200 bg-white p-5">
          <h2 className="text-sm font-semibold text-slate-900">Order summary</h2>
          <dl className="mt-3 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-slate-600">Subtotal</dt>
              <dd>{formatCurrency(sub)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-600">Tax ({(TAX_RATE * 100).toFixed(0)}%)</dt>
              <dd>{formatCurrency(taxValue)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-600">Shipping</dt>
              <dd>{shipValue === 0 ? 'Free' : formatCurrency(shipValue)}</dd>
            </div>
            <div className="flex justify-between border-t border-slate-200 pt-2 text-base font-semibold">
              <dt>Total</dt>
              <dd>{formatCurrency(grand)}</dd>
            </div>
          </dl>
          <Button type="submit" className="mt-5 w-full">
            Place order
          </Button>
        </aside>
      </form>
    </div>
  )
}
