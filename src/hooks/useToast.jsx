import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react'

const ToastContext = createContext(null)

let nextId = 1

/**
 * Toast provider + hook. Components call `toast('Saved!')` and the
 * <ToastContainer /> renders a stacked list that auto-dismisses.
 */
export function ToastProvider({ children, defaultDuration = 3000 }) {
  const [toasts, setToasts] = useState([])
  const timers = useRef(new Map())

  const dismiss = useCallback((id) => {
    setToasts((curr) => curr.filter((t) => t.id !== id))
    const handle = timers.current.get(id)
    if (handle) {
      clearTimeout(handle)
      timers.current.delete(id)
    }
  }, [])

  const push = useCallback(
    (message, opts = {}) => {
      const id = nextId++
      const toast = {
        id,
        message,
        type: opts.type ?? 'info', // 'info' | 'success' | 'error'
        duration: opts.duration ?? defaultDuration,
      }
      setToasts((curr) => [...curr, toast])
      const handle = setTimeout(() => dismiss(id), toast.duration)
      timers.current.set(id, handle)
      return id
    },
    [dismiss, defaultDuration]
  )

  const value = useMemo(() => ({ toasts, push, dismiss }), [toasts, push, dismiss])

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within a ToastProvider')
  return ctx
}
