import { forwardRef } from 'react'
import { cn } from '@/utils/classnames'

export const Input = forwardRef(function Input(
  { label, error, id, className, ...rest },
  ref
) {
  const inputId = id || rest.name
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-slate-700">
          {label}
        </label>
      )}
      <input
        id={inputId}
        ref={ref}
        className={cn(
          'h-10 rounded-md border border-slate-300 bg-white px-3 text-sm',
          'placeholder:text-slate-400',
          'focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20',
          error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
          className
        )}
        aria-invalid={Boolean(error) || undefined}
        aria-describedby={error ? `${inputId}-error` : undefined}
        {...rest}
      />
      {error && (
        <p id={`${inputId}-error`} className="text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  )
})
