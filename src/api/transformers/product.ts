import { formatTimeAgo } from '@vueuse/core'
import { toPrice } from '@/utils/number'

/**
 * Transforms a product item by updating its display price.
 * @param {ProductItem} product - The product item to transform.
 * @returns {ProductItem} The transformed product item.
 */
export function productTransformer(product: ProductItem): ProductItem {
  product.displayPrice = toPrice(product.price)
  product.displayCreatedAt = formatTimeAgo(new Date(product.createdAt!))

  return product
}
