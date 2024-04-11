import { createFetch } from '@vueuse/core'
import { env } from '@/utils/env'

export function createApiClient() {
    const apiUrl = env('API_URL', '')
    const apiKey = env('API_KEY', '')

    if (!apiUrl && !apiKey) {
        throw 'API_URL and API_KEY not defined in environment variables'
    }

    return createFetch({
        baseUrl: apiUrl,
        fetchOptions: {
            headers: {
                'apikey': apiKey
            }
        }
    })
}

export const $api = createApiClient()
