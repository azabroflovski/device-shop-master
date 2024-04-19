import axios from 'axios'
import { env } from '@/utils/env'
import { alertBus } from '@/shared/alert-bus'

export function createApiClient() {
  const apiURL = env('API_URL', '')

  if (!apiURL)
    throw new Error('API_URL is not defined in environment variables')

  const $api = axios.create({
    baseURL: apiURL,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  })

  $api.interceptors.request.use((config) => {
    const authToken = localStorage.getItem('authToken')

    if (authToken) {
      // NOTE: when its enabled, we have a cors error (json-server issue)
      // config.headers.setAuthorization(`Bearer ${authToken}`)
    }

    return config
  })

  $api.interceptors.response.use((response) => {
    if (response.data?.code === 'ERROR_CODE_TOO_MANY_REQUESTS') {
      alertBus.emit('REQUEST_LIMIT_ERROR', {
        title: 'ERROR_CODE_TOO_MANY_REQUESTS',
        description: response.data.message,
      })
    }

    return response
  }, (error) => {
    alertBus.emit('NETWORK_ERROR', {
      title: 'NETWORK ERROR',
      description: error,
    })
    return Promise.reject(error)
  })

  return $api
}

export const $api = createApiClient()
