export function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Acme Store. Developed by:Boitumelo Mokwana.</p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-slate-900">Shipping</a>
          <a href="#" className="hover:text-slate-900">Returns</a>
          <a href="#" className="hover:text-slate-900">Privacy</a>
        </div>
      </div>
    </footer>
  )
}
