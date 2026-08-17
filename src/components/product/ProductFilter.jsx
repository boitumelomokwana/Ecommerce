import { CATEGORIES } from '@/data/mockProducts'
import { Input } from '@/components/ui/Input'
import { cn } from '@/utils/classnames'

const SORT_OPTIONS = [
  { id: 'featured', label: 'Featured' },
  { id: 'price-asc', label: 'Price: low to high' },
  { id: 'price-desc', label: 'Price: high to low' },
  { id: 'rating', label: 'Highest rated' },
  { id: 'newest', label: 'Newest' },
]

export function ProductFilter({ filters, onChange, onReset }) {
  const update = (patch) => onChange({ ...filters, ...patch })

  return (
    <aside className="flex flex-col gap-6 rounded-lg border border-slate-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-900">Filters</h2>
        <button
          type="button"
          onClick={onReset}
          className="text-xs text-brand-600 hover:underline"
        >
          Reset
        </button>
      </div>

      <Input
        label="Search"
        name="search"
        placeholder="Search products…"
        value={filters.search ?? ''}
        onChange={(e) => update({ search: e.target.value })}
      />

      <div>
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
          Category
        </h3>
        <div className="flex flex-col gap-1">
          <CategoryRadio
            id="all"
            label="All"
            checked={filters.category === 'all'}
            onChange={() => update({ category: 'all' })}
          />
          {CATEGORIES.map((c) => (
            <CategoryRadio
              key={c.id}
              id={c.id}
              label={c.label}
              checked={filters.category === c.id}
              onChange={() => update({ category: c.id })}
            />
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
          Max price
        </h3>
        <input
          type="range"
          min="0"
          max="1000"
          step="10"
          value={
            filters.maxPrice === Infinity ? 1000 : filters.maxPrice
          }
          onChange={(e) =>
            update({ maxPrice: Number(e.target.value) >= 1000 ? Infinity : Number(e.target.value) })
          }
          className="w-full accent-brand-500"
        />
        <div className="mt-1 flex justify-between text-xs text-slate-500">
          <span>R0</span>
          <span>
            {filters.maxPrice === Infinity ? 'Any' : `$${filters.maxPrice}`}
          </span>
        </div>
      </div>

      <div>
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
          Min rating
        </h3>
        <div className="flex gap-1">
          {[0, 3, 4, 4.5].map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => update({ minRating: r })}
              className={cn(
                'rounded-md border px-2 py-1 text-xs',
                filters.minRating === r
                  ? 'border-brand-500 bg-brand-50 text-brand-700'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              )}
            >
              {r === 0 ? 'Any' : `${r}+`}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
          Sort by
        </h3>
        <select
          value={filters.sort}
          onChange={(e) => update({ sort: e.target.value })}
          className="h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
        >
          {SORT_OPTIONS.map((s) => (
            <option key={s.id} value={s.id}>
              {s.label}
            </option>
          ))}
        </select>
      </div>
    </aside>
  )
}

function CategoryRadio({ id, label, checked, onChange }) {
  return (
    <label
      htmlFor={`cat-${id}`}
      className="flex cursor-pointer items-center gap-2 rounded px-1 py-1 text-sm text-slate-700 hover:bg-slate-50"
    >
      <input
        id={`cat-${id}`}
        type="radio"
        name="category"
        checked={checked}
        onChange={onChange}
        className="accent-brand-500"
      />
      {label}
    </label>
  )
}
