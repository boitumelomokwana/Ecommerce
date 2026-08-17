import { useMemo, useState } from 'react'

const DEFAULT_FILTERS = {
  search: '',
  category: 'all',
  minPrice: 0,
  maxPrice: Infinity,
  minRating: 0,
  sort: 'featured', // 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest'
}

/**
 * Filter + sort a product array based on a filter object.
 *
 * @param {Array} products
 * @param {object} [initialFilters]
 */
export function useFilter(products = [], initialFilters = {}) {
  const [filters, setFilters] = useState({ ...DEFAULT_FILTERS, ...initialFilters })

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      if (filters.category !== 'all' && p.category !== filters.category) return false
      if (filters.search) {
        const q = filters.search.toLowerCase()
        const hay = `${p.name} ${p.brand} ${(p.tags || []).join(' ')}`.toLowerCase()
        if (!hay.includes(q)) return false
      }
      if (p.price < filters.minPrice) return false
      if (filters.maxPrice !== Infinity && p.price > filters.maxPrice) return false
      if ((p.rating ?? 0) < filters.minRating) return false
      return true
    })

    switch (filters.sort) {
      case 'price-asc':
        list = [...list].sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        list = [...list].sort((a, b) => b.price - a.price)
        break
      case 'rating':
        list = [...list].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
        break
      case 'newest':
        list = [...list].sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        break
      default:
        break
    }

    return list
  }, [products, filters])

  return {
    filters,
    setFilters,
    filtered,
    updateFilter: (patch) => setFilters((f) => ({ ...f, ...patch })),
    resetFilters: () => setFilters({ ...DEFAULT_FILTERS, ...initialFilters }),
  }
}

export const FILTER_DEFAULTS = DEFAULT_FILTERS
