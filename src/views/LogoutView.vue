<script lang="ts" setup>
import { useAuth } from '@/composables/useAuth'
import { useRouter } from 'vue-router'

const router = useRouter()
const { logout } = useAuth()

setTimeout(() => {
  logout()

  router.push({
    name: 'home'
  })
}, 3000)
</script>

<template>
  <AFlex justify="center" align="center" style="height: 100px;">
    <ASpin tip="Logout process" />
  </AFlex>
</template>
