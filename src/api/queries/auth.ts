import { $api } from '@/api/client'

/**
 * Interface representing login credentials.
 */
export interface LoginCredentials {
    email: string
    password: string
}

/**
 * Sends a request to the server to log in with the provided credentials.
 * @param {LoginCredentials} credentials - The login credentials.
 * @returns {Promise<any>} A promise that resolves with the response from the server.
 */
export function loginRequest(credentials: LoginCredentials) {
    return $api('/auth/login').post(credentials).json()
}

/**
 * Fetches the user profile from the server.
 * @returns {Promise<any>} A promise that resolves with the user profile data.
 */
export function fetchProfile() {
    return $api('/auth/me').json()
}
