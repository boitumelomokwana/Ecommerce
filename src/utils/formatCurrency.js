export function formatCurrency(amount, currency = 'ZAR', locale = 'en-ZA') {
  const value = Number.isFinite(amount) ? amount : 0
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  }).format(value)
}