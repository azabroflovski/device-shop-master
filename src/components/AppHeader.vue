<script lang="ts" setup>
import ProductSearchbar from '@/components/ProductSearchbar.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

function goHome() {
  router.push({
    name: 'home'
  })
}
</script>

<template>
  <APageHeader>
    <template #title>
      <span @click="goHome">Device shop</span>
    </template>
    <template #extra>
      <ProductSearchbar />
      <AButton>Login</AButton>
    </template>
  </APageHeader>
</template>
