import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react'

const STORAGE_KEY = 'acme.wishlist.v1'

const WishlistContext = createContext(null)

const initialState = { ids: [] }

function reducer(state, action) {
  switch (action.type) {
    case 'HYDRATE':
      return { ids: Array.isArray(action.payload) ? action.payload : [] }
    case 'TOGGLE': {
      const id = action.payload
      return state.ids.includes(id)
        ? { ids: state.ids.filter((x) => x !== id) }
        : { ids: [...state.ids, id] }
    }
    case 'CLEAR':
      return initialState
    default:
      return state
  }
}

function readStored() {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function WishlistProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState, () => ({
    ids: readStored(),
  }))

  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.ids))
    } catch {
      /* swallow */
    }
  }, [state.ids])

  const toggle = useCallback((id) => dispatch({ type: 'TOGGLE', payload: id }), [])
  const clear = useCallback(() => dispatch({ type: 'CLEAR' }), [])

  const value = useMemo(() => {
    const set = new Set(state.ids)
    return {
      ids: state.ids,
      count: state.ids.length,
      isWishlisted: (id) => set.has(id),
      toggle,
      clear,
    }
  }, [state.ids, toggle, clear])

  return (
    <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
  )
}

export function useWishlistContext() {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error('useWishlistContext must be used within a WishlistProvider')
  return ctx
}
