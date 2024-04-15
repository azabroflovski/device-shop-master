<script lang="ts" setup>
import LoginDialog from '@/components/LoginDialog.vue'

import { ref, computed, } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const router = useRouter()
const { isLoggedIn } = useAuth()
const showLoginDialog = ref(false)

function loginOrDashboard() {
  if (isLoggedIn.value) {
    router.push({
      name: 'dashboard'
    })
  } else {
    showLoginDialog.value = true
  }
}

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
