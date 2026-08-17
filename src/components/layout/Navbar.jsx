import { NavLink } from 'react-router-dom'
import { CATEGORIES } from '@/data/mockProducts'
import { cn } from '@/utils/classnames'

export function Navbar() {
  return (
    <nav className="hidden gap-1 md:flex" aria-label="Primary">
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          cn(
            'rounded-md px-3 py-2 text-sm font-medium',
            isActive ? 'text-slate-900' : 'text-slate-600 hover:text-slate-900'
          )
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/catalog"
        className={({ isActive }) =>
          cn(
            'rounded-md px-3 py-2 text-sm font-medium',
            isActive ? 'text-slate-900' : 'text-slate-600 hover:text-slate-900'
          )
        }
      >
        Catalog
      </NavLink>
      {CATEGORIES.slice(0, 3).map((c) => (
        <NavLink
          key={c.id}
          to={`/catalog?category=${c.id}`}
          className={({ isActive }) =>
            cn(
              'rounded-md px-3 py-2 text-sm font-medium',
              isActive ? 'text-slate-900' : 'text-slate-600 hover:text-slate-900'
            )
          }
        >
          {c.label}
        </NavLink>
      ))}
    </nav>
  )
}
