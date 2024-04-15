import { $api } from '@/api/client'
import { productTransformer } from '@/api/transformers'
import type { ComputedRef, Ref } from 'vue'
import { URLBuilder } from '@/utils/url'

/**
 * Interface for specifying fetch options.
 */
interface FetchOptions {
    query: {
        [key: string]: any
    }
}

/**
 * Fetches products from the API based on the provided options.
 * @param {ComputedRef<FetchOptions>} [options] - Optional computed reference containing fetch options.
 * @returns {Promise<ProductItem[]>} A promise that resolves with an array of product items.
 */
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

/**
 * Fetches a product by its ID from the API.
 * @param {number | string} id - The ID of the product to fetch.
 * @returns {Promise<ProductItem>} A promise that resolves with the fetched product item.
 */
export function fetchProductById(id: number | string) {
    return $api(`/products/${id}`, {
        afterFetch(ctx) {
            ctx.data = productTransformer(ctx.data)
            return ctx
        }
    }).json<ProductItem[]>()
}

/**
 * Creates a request to create a new product.
 * @param {Ref<Partial<ProductItem>>} payload - The payload containing the data for the new product.
 * @returns {Promise<ProductItem>} A promise that resolves with the created product item.
 */
export function createProductRequest(payload: Ref<Partial<ProductItem>>) {
    return $api(`/products`, {
        immediate: false
    }).post(() => payload.value).json<ProductItem>()
}

/**
 * Creates a request to update an existing product.
 * @param {Ref<Partial<ProductItem>>} payload - The payload containing the data for the product to update.
 * @returns {Promise<ProductItem>} A promise that resolves with the updated product item.
 */
export function updateProductRequest(payload: Ref<Partial<ProductItem>>) {
    return $api(() =>`/products/${payload.value.id}`, {
        immediate: false
    }).patch(() => payload.value).json<ProductItem>()
}

/**
 * Creates a request to delete an existing product.
 * @param {Ref<Partial<ProductItem>>} payload - The payload containing the data for the product to delete.
 * @returns {Promise<void>} A promise that resolves once the product is deleted.
 */
export function deleteProductRequest(payload: Ref<Partial<ProductItem>>) {
    return $api(() =>`/products/${payload.value.id}`, {
        immediate: false
    })
}

/**
 * Searches for products based on a query string.
 * @param {Ref<string>} query - The query string to search for.
 * @returns {Promise<ProductItem[]>} A promise that resolves with an array of product items matching the search query.
 */
export function searchProduct(query: Ref<string>) {
    return $api<ProductItem[]>(() => `/products-search?query=${query.value}`, {
        immediate: false
    }).json<ProductItem[]>()
}
