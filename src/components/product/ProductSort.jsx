const OPTIONS = [
  { id: 'featured', label: 'Featured' },
  { id: 'price-asc', label: 'Price: low to high' },
  { id: 'price-desc', label: 'Price: high to low' },
  { id: 'rating', label: 'Highest rated' },
  { id: 'newest', label: 'Newest' },
]

/**
 * Standalone sort dropdown. Pages with their own filter sidebar can still use
 * this to expose a sort control.
 */
export function ProductSort({ value, onChange }) {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor="sort" className="text-sm text-slate-600">
        Sort:
      </label>
      <select
        id="sort"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-9 rounded-md border border-slate-300 bg-white px-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
      >
        {OPTIONS.map((o) => (
          <option key={o.id} value={o.id}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  )
}
