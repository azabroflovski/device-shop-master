<script lang="ts" setup>
import { useRouter } from 'vue-router'
import ProductSearchbar from '@/components/ProductSearchbar.vue'
import LoginButton from '@/components/LoginButton.vue'

const router = useRouter()

function goHome() {
  router.push({
    name: 'home',
  })
}
</script>

<template>
  <APageHeader class="app-header">
    <template #title>
      <span class="app-header__logo" @click="goHome">DEVICE SHOP</span>
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
