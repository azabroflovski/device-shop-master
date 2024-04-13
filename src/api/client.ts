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
        options: {
          beforeFetch({ options }) {
              const authToken = localStorage.getItem('authToken')

              if (authToken) {
                  options.headers = {
                      Authorization: `Bearer ${authToken}`
                  }
              }
          },
          onFetchError(ctx) {
              if (ctx.data.code === 'ERROR_CODE_TOO_MANY_REQUESTS') {
                  alert(ctx.data.message)
              }
              return ctx
          },
        },
        fetchOptions: {
            headers: {
                'apikey': apiKey
            }
        }
    })
}

export const $api = createApiClient()
