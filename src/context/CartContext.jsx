import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react'
import { subtotal as calcSubtotal } from '@/utils/priceCalc'

const STORAGE_KEY = 'acme.cart.v1'

const CartContext = createContext(null)

const initialState = { items: [] }

function reducer(state, action) {
  switch (action.type) {
    case 'HYDRATE':
      return { items: Array.isArray(action.payload) ? action.payload : [] }

    case 'ADD': {
      const { product, variant, quantity = 1 } = action.payload
      const lineId = `${product.id}::${variant?.id ?? 'default'}`
      const existing = state.items.find((i) => i.lineId === lineId)
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.lineId === lineId
              ? { ...i, quantity: Math.min(i.quantity + quantity, product.stock || 99) }
              : i
          ),
        }
      }
      return {
        items: [
          ...state.items,
          {
            lineId,
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.images?.[0],
            brand: product.brand,
            variantId: variant?.id ?? null,
            variantLabel: variant?.label ?? null,
            variantPriceDelta: variant?.priceDelta ?? 0,
            quantity,
            stock: product.stock ?? 99,
          },
        ],
      }
    }

    case 'UPDATE_QTY': {
      const { lineId, quantity } = action.payload
      if (quantity <= 0) {
        return { items: state.items.filter((i) => i.lineId !== lineId) }
      }
      return {
        items: state.items.map((i) =>
          i.lineId === lineId
            ? { ...i, quantity: Math.min(quantity, i.stock || 99) }
            : i
        ),
      }
    }

    case 'REMOVE':
      return { items: state.items.filter((i) => i.lineId !== action.payload.lineId) }

    case 'CLEAR':
      return initialState

    default:
      return state
  }
}

function readStored() {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState, () => ({
    items: readStored(),
  }))

  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items))
    } catch {
      /* swallow quota errors */
    }
  }, [state.items])

  const addItem = useCallback((product, variant, quantity = 1) => {
    dispatch({ type: 'ADD', payload: { product, variant, quantity } })
  }, [])

  const updateQuantity = useCallback((lineId, quantity) => {
    dispatch({ type: 'UPDATE_QTY', payload: { lineId, quantity } })
  }, [])

  const removeItem = useCallback((lineId) => {
    dispatch({ type: 'REMOVE', payload: { lineId } })
  }, [])

  const clearCart = useCallback(() => dispatch({ type: 'CLEAR' }), [])

  const value = useMemo(() => {
    const items = state.items
    const totalItems = items.reduce((n, i) => n + i.quantity, 0)
    const subtotalValue = calcSubtotal(items)
    return {
      items,
      totalItems,
      subtotal: subtotalValue,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
    }
  }, [state.items, addItem, updateQuantity, removeItem, clearCart])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCartContext() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCartContext must be used within a CartProvider')
  return ctx
}
