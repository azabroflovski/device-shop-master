<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import LoginDialog from '@/components/LoginDialog.vue'
import { useAuth } from '@/composables/useAuth'

const router = useRouter()
const { isLoggedIn } = useAuth()
const showLoginDialog = ref(false)

/**
 * Navigate to the dashboard or show the login dialog based on authentication status.
 */
function loginOrDashboard() {
  if (isLoggedIn.value) {
    router.push({
      name: 'dashboard',
    })
  }
  else {
    showLoginDialog.value = true
  }
}

/**
 * Computed property for determining the label of the login button based on authentication status.
 */
const buttonLabel = computed(() => {
  return isLoggedIn.value ? 'Dashboard' : 'Login'
})
</script>

<template>
  <AButton :key="buttonLabel" @click="loginOrDashboard">
    {{ buttonLabel }}
  </AButton>

  <LoginDialog v-model:show="showLoginDialog" />
</template>
