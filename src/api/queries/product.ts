import { $api } from '@/api/client'
import { productTransformer } from '@/api/transformers'
import type { AxiosResponse, AxiosRequestConfig } from 'axios'

/**
 * Retrieves a list of products.
 * @param {AxiosRequestConfig} options - Options for the request.
 * @returns {Promise<AxiosResponse<ProductItem[]>>} A promise that resolves with the response data.
 */
export function getProducts(options: AxiosRequestConfig = {}) {
    return $api.get<ProductItem[]>('/products', {
        transformResponse: productTransformer,
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
    return $api.get<ProductItem[]>(`/products/${id}`, {
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
 * @param {Partial<ProductItem>} payload - The data of the product to update.
 * @returns {Promise<AxiosResponse<ProductItem>>} A promise that resolves with the response data.
 */
export function updateProduct(payload: Partial<ProductItem>) {
    return $api.patch<ProductItem>(`/products/${payload.id}`, {
        immediate: false
    })
}

/**
 * Deletes a product.
 * @param {Partial<ProductItem>} payload - The data of the product to delete.
 * @returns {Promise<AxiosResponse>} A promise that resolves with the response data.
 */
export async function destroyProduct(payload: Partial<ProductItem>) {
    return $api.delete(`/products/${payload.id}`)
}


export async function searchProduct(keyword: string) {
    return $api.get<ProductItem[]>(`/products?query=${keyword}`)
}
