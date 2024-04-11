<script lang="ts" setup>
import ProductSearchbar from '@/components/ProductSearchbar.vue'
</script>

<template>
  <APageHeader title="Device Shop">
    <template #extra>
      <ProductSearchbar />
      <AButton>Login</AButton>
    </template>
  </APageHeader>
</template>
