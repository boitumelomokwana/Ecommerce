# Acme Store — E-Commerce Scaffold

A runnable React front-end for an e-commerce demo, built with **Vite**, **Tailwind CSS**, **React Router**, and **Context** for cart/wishlist state.

## Quick start

```bash
npm install
npm run dev
```

Open <http://localhost:5173>.

## Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Vite dev server with HMR |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint over the whole project |

## Project layout

```
src/
├── components/
│   ├── layout/    Layout, Header, Footer, Navbar
│   ├── product/   ProductCard, ProductGrid, ProductFilter, ProductSort
│   ├── cart/      CartDrawer, CartItem
│   └── ui/        Badge, Button, Input, Modal, Toast
├── context/       CartContext, WishlistContext
├── data/          mockProducts (rich JSON dataset)
├── hooks/         useCart, useWishlist, useFilter, useToast
├── pages/         Home, ProductDetails, Catalog, CartPage, CheckoutPage
├── utils/         formatCurrency, priceCalc, classnames
├── App.jsx        Router
└── main.jsx       Entry point
```

## Routes

| Path | Page |
| --- | --- |
| `/` | Home (hero + featured grid) |
| `/catalog` | Catalog (filter sidebar + product grid) |
| `/product/:id` | Product details |
| `/cart` | Full-page cart |
| `/checkout` | Checkout form + order summary |

## State

- **Cart** — `useReducer` with `ADD`, `UPDATE_QTY`, `REMOVE`, `CLEAR`. Persists to `localStorage` under `acme.cart.v1`.
- **Wishlist** — `useReducer` with `TOGGLE`, `CLEAR`. Persists to `localStorage` under `acme.wishlist.v1`.
- **Toasts** — `useState` queue, auto-dismiss after 3 s.

Both context providers and the toast provider wrap the app in `main.jsx`.

## Path alias

Imports use the `@/` alias that maps to `src/`, configured in `vite.config.js`:

```js
import { Button } from '@/components/ui/Button'
```

## Notes

- All product data is mocked in `src/data/mockProducts.js`. Image URLs use Unsplash so no binary assets are required.
- ESLint is configured with `eslint-plugin-react`, `react-hooks`, and `react-refresh`.
- Tailwind is set up with a single brand color extension in `tailwind.config.js`.
- No tests are included — add Vitest/Testing Library when you're ready.
