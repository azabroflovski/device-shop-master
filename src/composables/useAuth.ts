import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { createSharedComposable, toRefs } from '@vueuse/core'
import { type LoginCredentials, fetchProfile, loginRequest } from '@/api/queries'

/**
 * Interface representing the authentication state.
 */
export interface AuthState {
  user: {
    id: number
    name: string
    email: string
    createdAt: number
  } | null
}

/**
 * Composable function for handling authentication.
 * @returns Authentication composable object.
 */
function authComposable() {
  const router = useRouter()

  const state = ref<AuthState>({
    user: null,
  })

  /**
   * Computed property to check if the user is logged in.
   */
  const isLoggedIn = computed(() => {
    return !!state.value.user?.id
  })

  /**
   * Computed property to check if the user is a guest (not logged in).
   */
  const isGuest = computed(() => {
    return !isLoggedIn.value
  })

  /**
   * Get authentication token from local storage.
   * @returns Authentication token.
   */
  function getAuthToken() {
    return localStorage.getItem('authToken')
  }

  /**
   * Set authentication token in local storage.
   * @param token - Authentication token to be set.
   */
  function setAuthToken(token: string) {
    localStorage.setItem('authToken', token)
  }

  /**
   * Remove authentication token from local storage.
   */
  function destroyAuthToken() {
    localStorage.removeItem('authToken')
  }

  /**
   * Attempt to log in using provided credentials.
   * @param credentials - Login credentials.
   * @returns Boolean indicating if login attempt was successful.
   */
  async function attemptLogin(credentials: LoginCredentials) {
    const { authToken } = await loginRequest(credentials)

    if (authToken) {
      setAuthToken(authToken)
      await init()
      return true
    }

    return false
  }

  /**
   * Initialize authentication state by fetching user profile if authenticated.
   */
  async function init() {
    const authToken = getAuthToken()

    if (authToken)
      state.value.user = await fetchProfile()
  }

  /**
   * Log out the user.
   */
  async function logout() {
    destroyAuthToken()
    state.value.user = null
  }

  /**
   * Log out the user and redirect to logout route.
   */
  async function logoutWithRedirect() {
    await router.push({
      name: 'logout',
    })
  }

  return {
    ...toRefs(state),
    init,
    isGuest,
    isLoggedIn,
    getAuthToken,
    destroyAuthToken,
    setAuthToken,
    logout,
    logoutWithRedirect,
    attemptLogin,
  }
}

/**
 * Export shared authentication composable (singleton).
 */
export const useAuth = createSharedComposable(authComposable)
