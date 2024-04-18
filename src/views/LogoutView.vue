<script lang="ts" setup>
import { useAuth } from '@/composables/useAuth'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
import { logoutDelay } from '@/config/auth'

const router = useRouter()
const { logout } = useAuth()

onMounted(() => {
  logout()

  setTimeout(() => {
    router.push({
      name: 'home'
    })
  }, logoutDelay)
})
</script>

<template>
  <AFlex justify="center" align="center" style="height: 100px;">
    <ASpin tip="Logout process" />
  </AFlex>
</template>
