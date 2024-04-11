<script lang="ts" setup>
import { fetchProducts } from '@/api/queries'
import ProductCard from '@/components/ProductCard.vue'

const { data } = await fetchProducts()
</script>

<template>
  <ARow v-if="data && data.length" :gutter="[16,16]">
    <ACol v-for="item in data" :key="item.id" :span="8">
      <ProductCard :product="item"  />
    </ACol>
  </ARow>

  <AEmpty v-else />
</template>
