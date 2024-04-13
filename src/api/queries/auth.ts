import { $api } from '@/api/client'

export interface LoginCredentials {
    email: string
    password: string
}
export function loginRequest(credentials: LoginCredentials) {
    return $api('/auth/login').post(credentials).json()
}

export function fetchProfile() {
    return $api('/auth/me').json()
}
