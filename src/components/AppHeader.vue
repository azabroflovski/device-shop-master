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
  <APageHeader class="app-header">
    <template #title>
      <span @click="goHome" class="app-header__logo">DEVICE SHOP</span>
    </template>
    <template #extra>
      <ProductSearchbar />
      <AButton>Login</AButton>
    </template>
  </APageHeader>
</template>

<style>
.app-header__logo {
  font-weight: bold;
  cursor: pointer;
}
</style>
