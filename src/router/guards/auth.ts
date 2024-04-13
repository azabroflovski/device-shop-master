import { nextTick } from 'vue'
import type { NavigationGuard } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

export const authGuard: NavigationGuard = async (to, from, next) => {
    const { init, isLoggedIn } = useAuth();

    if (isLoggedIn.value) {
        next()
        return
    }

    await init()
    await nextTick()

    if (isLoggedIn.value) {
        next()
    } else {
        next('/login')
    }
};
