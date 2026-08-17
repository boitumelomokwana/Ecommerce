import { useCartContext } from '@/context/CartContext'

/**
 * Convenience re-export so components can `import { useCart } from '@/hooks/useCart'`
 * without knowing about the context module directly.
 */
export function useCart() {
  return useCartContext()
}
