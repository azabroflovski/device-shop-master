import { nextTick } from 'vue'
import type { NavigationGuard } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

/**
 * Navigation guard for checking authentication status before navigating to a route.
 * @param {RouteLocationNormalized} to - The target route location.
 * @param {RouteLocationNormalized} from - The current route location.
 * @param {NavigationGuardNext} next - The function to call to continue the navigation.
 * @returns {Promise<void>} A promise that resolves once the authentication status is checked.
 */
export const authGuard: NavigationGuard = async (to, from, next) => {
  const { init, isLoggedIn } = useAuth()

  if (isLoggedIn.value) {
    next()
    return
  }

  await init()
  await nextTick()

  if (isLoggedIn.value)
    next()
  else
    next('/login')
}
