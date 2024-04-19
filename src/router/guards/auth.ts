import { nextTick } from 'vue'
import type { NavigationGuard } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

/**
 * Navigation guard for checking authentication status before navigating to a route.
 * @param to - The target route.
 * @param from - The current route.
 * @param next - The function to proceed with navigation.
 */
export const authGuard: NavigationGuard = async (to, from, next) => {
  const { init, isLoggedIn } = useAuth()

  // Check if the user is logged in
  if (isLoggedIn.value) {
    next() // Proceed with navigation
    return
  }

  // Initialize authentication state
  await init()
  await nextTick()

  // Check authentication status again after initialization
  if (isLoggedIn.value)
    next() // Proceed with navigation
  else
    next('/login') // Redirect to login page if not logged in
}
