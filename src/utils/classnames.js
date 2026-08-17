/**
 * Tiny clsx-style className combiner.
 * Accepts strings, arrays, and objects of { className: condition }.
 * Falsy values are dropped.
 *
 *   cn('btn', isPrimary && 'btn-primary', { 'opacity-50': disabled })
 */
export function cn(...args) {
  const out = []
  for (const arg of args) {
    if (!arg) continue
    if (typeof arg === 'string' || typeof arg === 'number') {
      out.push(String(arg))
    } else if (Array.isArray(arg)) {
      const inner = cn(...arg)
      if (inner) out.push(inner)
    } else if (typeof arg === 'object') {
      for (const key of Object.keys(arg)) {
        if (arg[key]) out.push(key)
      }
    }
  }
  return out.join(' ')
}
