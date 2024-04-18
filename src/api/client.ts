import axios from 'axios'
import { env } from '@/utils/env'
import { alertBus } from '@/shared/alert-bus'

export function createApiClient() {
    const apiURL = env('API_URL', '')

    if (!apiURL) {
        throw 'API_URL is not defined in environment variables'
    }

    const $api =  axios.create({
        baseURL: apiURL
    })

    $api.interceptors.request.use((config) => {
        const authToken = localStorage.getItem('authToken')

        if (authToken) {
            config.headers.set('Authorization', `Bearer ${authToken}`)
        }

        return config
    })

    $api.interceptors.response.use((response) => {
        if (response.data?.code === 'ERROR_CODE_TOO_MANY_REQUESTS') {
            alertBus.emit('REQUEST_LIMIT_ERROR', {
                title: 'ERROR_CODE_TOO_MANY_REQUESTS',
                description: response.data.message
            })
        }

        return response
    }, (error) => {
        return Promise.reject(error)
    })

    return $api
}

export const $api = createApiClient()
