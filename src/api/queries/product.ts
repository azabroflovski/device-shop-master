import { $api } from '@/api/client'
import { productTransformer } from '@/api/transformers'
import type {Ref} from "vue";

export function fetchProducts() {
    return $api<ProductItem>('/products', {
        afterFetch(ctx) {
            ctx.data = ctx.data.map(productTransformer)
            return ctx
        },
    }).json()
}

export function fetchProductById(id: number | string) {
    return $api(`/products?id=eq.${id}`, {
        afterFetch(ctx) {
            ctx.data = ctx.data.map(productTransformer)
            return ctx
        }
    }).json<ProductItem[]>()
}


export function searchProduct(query: Ref<string>) {
    return $api<ProductItem[]>(() => `/products?name=ilike(any).{${query.value}*}`, {
        immediate: false
    }).json<ProductItem[]>()
}
