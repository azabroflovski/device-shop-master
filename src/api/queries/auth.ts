import { authDelay, authorizedUser } from '@/config/auth'
import { sleep } from '@/utils/async'

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
 * @returns A promise that resolves with the response from the server.
 */
export async function loginRequest(credentials: LoginCredentials) {
  const { email, password } = authorizedUser
  // For the sake of decency, let's run his credentials
  const isCorrectCredentials
        = email === credentials.email
        && password === credentials.password

  const authToken = isCorrectCredentials ? 'bla_bla' : null

  // Imagine there's a request to the authentication server.
  await sleep(authDelay)

  // and... puff!!
  return {
    authToken, // MAGIC
  }
}

/**
 * Fetches the user profile from the server.
 */
export async function fetchProfile() {
  await sleep(1000)
  return authorizedUser
}
