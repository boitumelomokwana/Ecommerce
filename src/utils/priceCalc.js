/**
 * Cart line item shape used by these helpers:
 * { id, price, quantity, variantPriceDelta? }
 */

/**
 * Subtotal of an array of cart items.
 * @param {Array} items
 * @returns {number}
 */
export function subtotal(items = []) {
  return items.reduce((sum, item) => {
    const unit = (item.price ?? 0) + (item.variantPriceDelta ?? 0)
    return sum + unit * (item.quantity ?? 0)
  }, 0)
}

/**
 * Apply a tax rate to a subtotal.
 * @param {number} sub
 * @param {number} [rate=0.08]
 */
export function tax(sub, rate = 0.08) {
  return Math.max(0, sub) * rate
}

/**
 * Flat shipping: free above threshold, otherwise flat fee.
 * @param {number} sub
 * @param {number} [flatFee=8]
 * @param {number} [threshold=75]
 */
export function shipping(sub, flatFee = 8, threshold = 75) {
  return sub >= threshold ? 0 : flatFee
}

/**
 * Aggregate total from items + tax/shipping options.
 * @param {object} opts
 */
export function total({ items = [], taxRate = 0.08, shippingFee = 8, shippingThreshold = 75 } = {}) {
  const sub = subtotal(items)
  return sub + tax(sub, taxRate) + shipping(sub, shippingFee, shippingThreshold)
}
