<script lang="ts" setup>
import ProductSearchbar from '@/components/ProductSearchbar.vue'
import LoginButton from '@/components/LoginButton.vue'

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

      <!--   Width for correct animation   -->
      <div v-auto-animate style="width: 104px">
        <LoginButton />
      </div>
    </template>
  </APageHeader>

</template>

<style>
.app-header__logo {
  font-weight: bold;
  cursor: pointer;
}
</style>
