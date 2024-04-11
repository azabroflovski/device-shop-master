<script lang="ts" setup>
import ProductCard from '@/components/ProductCard.vue'

import { useRouter } from 'vue-router'
import { fetchProducts } from '@/api/queries'
const router = useRouter()
const { data, isFetching } = fetchProducts()

function openProduct(id: number) {
  router.push({
    name: 'product',
    params: {
      id,
    }
  })
}
</script>

<template>
  <AFlex justify="center" align="center" style="height: 100px;">
    <ASpin v-if="isFetching" />
  </AFlex>

  <ARow v-if="data && data?.length && !isFetching" :gutter="[16,16]">
    <ACol v-for="item in data" :key="item.id" :span="8">
      <ProductCard :product="item" @click="openProduct(item.id)" />
    </ACol>
  </ARow>

  <AEmpty v-if="!isFetching && !data?.length" />
</template>
