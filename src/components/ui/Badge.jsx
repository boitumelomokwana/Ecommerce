import { cn } from '@/utils/classnames'

const TONES = {
  default: 'bg-slate-100 text-slate-700',
  sale: 'bg-red-100 text-red-700',
  new: 'bg-emerald-100 text-emerald-700',
  low: 'bg-amber-100 text-amber-800',
  out: 'bg-slate-200 text-slate-500',
}

export function Badge({ tone = 'default', className, children }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium',
        TONES[tone] ?? TONES.default,
        className
      )}
    >
      {children}
    </span>
  )
}
