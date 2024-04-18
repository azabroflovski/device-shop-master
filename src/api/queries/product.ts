import { $api } from '@/api/client'
import { productTransformer } from '@/api/transformers'
import type { AxiosRequestConfig } from 'axios'

/**
 * Retrieves a list of products.
 * @param {AxiosRequestConfig} options - Options for the request.
 * @returns {Promise<AxiosResponse<ProductItem[]>>} A promise that resolves with the response data.
 */
export function getProducts(options: AxiosRequestConfig = {}) {
    return $api.get<ProductItem[]>('/products', {
        transformResponse(data: string) {
            const items = JSON.parse(data)
            return items.map(productTransformer)
        },
        ...options
    })
}

/**
 * Finds a product by its ID.
 * @param {number} id - The ID of the product to find.
 * @param {AxiosRequestConfig} options - Options for the request.
 * @returns {Promise<AxiosResponse<ProductItem[]>>} A promise that resolves with the response data.
 */
export async function findProduct(id: number, options: AxiosRequestConfig = {}) {
    return $api.get<ProductItem>(`/products/${id}`, {
        transformResponse: productTransformer,
        ...options
    })
}

/**
 * Stores a new product.
 * @param {Partial<ProductItem>} payload - The data of the product to store.
 * @param {AxiosRequestConfig} options - Options for the request.
 * @returns {Promise<AxiosResponse>} A promise that resolves with the response data.
 */
export async function storeProduct(payload: Partial<ProductItem>, options: AxiosRequestConfig = {}) {
    return $api.post('/products', payload, {
        ...options
    })
}

/**
 * Updates an existing product.
 * @param {number} id - The id of the product to update
 * @param {Partial<ProductItem>} payload - The data of the product to update.
 * @returns {Promise<AxiosResponse<ProductItem>>} A promise that resolves with the response data.
 */
export function updateProduct(id: number, payload: Partial<ProductItem>) {
    return $api.patch<ProductItem>(`/products/${id}`, payload)
}

/**
 * Deletes a product.
 * @param {number} id - The id of the product to delete.
 * @returns {Promise<AxiosResponse<any, any>>} A promise that resolves with the response data.
 */
export async function destroyProduct(id: number) {
    return $api.delete(`/products/${id}`)
}


export async function searchProduct(keyword: string) {
    return $api.get<ProductItem[]>(`/products?query=${keyword}`)
}
