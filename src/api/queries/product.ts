import { $api } from '@/api/client'
import { productTransformer } from '@/api/transformers'
import type { ComputedRef, Ref } from 'vue'
import { URLBuilder } from '@/utils/url'


interface FetchOptions {
    query: {
        [key: string]: any
    }
}

export function fetchProducts(options?: ComputedRef<FetchOptions>) {
    return $api(() => '/products', {
        beforeFetch(ctx) {
            const url = new URLBuilder()
            if (options?.value?.query) {
                url.setQueryParams(options?.value?.query)
                ctx.url += url.build()
                return ctx
            }
        },
        afterFetch(ctx) {
            ctx.data = ctx.data?.items?.map(productTransformer)
            return ctx
        },
    }).json<ProductItem[]>()
}

export function fetchProductById(id: number | string) {
    return $api(`/products/${id}`, {
        afterFetch(ctx) {
            ctx.data = productTransformer(ctx.data)
            return ctx
        }
    }).json<ProductItem[]>()
}

export function createProductRequest(payload: Ref<Partial<ProductItem>>) {
    return $api(`/products`, {
        immediate: false
    }).post(() => payload.value).json<ProductItem>()
}

export function updateProductRequest(payload: Ref<Partial<ProductItem>>) {
    return $api(() =>`/products/${payload.value.id}`, {
        immediate: false
    }).patch(() => payload.value).json<ProductItem>()
}


export function searchProduct(query: Ref<string>) {
    return $api<ProductItem[]>(() => `/products-search?query=${query.value}`, {
        immediate: false
    }).json<ProductItem[]>()
}
