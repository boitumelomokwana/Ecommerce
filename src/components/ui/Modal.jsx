import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/utils/classnames'

/**
 * Lightweight modal: portal, backdrop click + ESC to close, locks body scroll.
 * Children render in a centered panel; pass a `panelClassName` to customize width.
 */
export function Modal({
  open,
  onClose,
  children,
  ariaLabel = 'Dialog',
  panelClassName,
}) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose?.()
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, onClose])

  if (!open) return null
  if (typeof document === 'undefined') return null

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel}
    >
      <button
        type="button"
        aria-label="Close dialog"
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/50"
      />
      <div
        className={cn(
          'relative z-10 max-h-[90vh] overflow-auto rounded-lg bg-white shadow-xl',
          panelClassName ?? 'w-full max-w-md p-6'
        )}
      >
        {children}
      </div>
    </div>,
    document.body
  )
}
