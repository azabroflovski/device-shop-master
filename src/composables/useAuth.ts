import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { createSharedComposable, toRefs } from '@vueuse/core'
import { fetchProfile, type LoginCredentials, loginRequest } from '@/api/queries'

interface AuthState {
    user: {
        id: number
        name: string
        email: string
        created_at: number
    } | null
}

function authComposable() {
    const router = useRouter()

    const state = ref<AuthState>({
        user: null
    })

    const isLoggedIn = computed(() => {
        return !!state.value.user?.id
    })

    const isGuest = computed(() => {
        return !isLoggedIn.value
    })

    function getAuthToken() {
        return localStorage.getItem('authToken')
    }

    function setAuthToken(token: string) {
        localStorage.setItem('authToken', token)
    }

    function destroyAuthToken() {
        localStorage.removeItem('authToken')
    }

    async function attemptLogin(credentials: LoginCredentials) {
        const { authToken } = await loginRequest(credentials)

        if (authToken) {
            setAuthToken(authToken)
            await init()
            return true
        }

        return false
    }

    async function init() {
        const authToken = getAuthToken()

        if (authToken) {
            state.value.user = await fetchProfile()
        }
    }

    async function logout() {
        destroyAuthToken()
        state.value.user = null
    }

    async function logoutWithRedirect() {
        await router.push({
            name: 'logout'
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

export const useAuth = createSharedComposable(authComposable)
