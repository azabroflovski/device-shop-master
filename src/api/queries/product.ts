import { $api } from '@/api/client'
import { productTransformer } from '@/api/transformers'

export function fetchProducts() {
    return $api<ProductItem>('/products', {
        afterFetch(ctx) {
            ctx.data = ctx.data.map(productTransformer)
            return ctx
        },
    }).json()
}
