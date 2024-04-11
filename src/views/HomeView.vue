<script lang="ts" setup>
import ProductCard from '@/components/ProductCard.vue'

import { fetchProducts } from '@/api/queries'
const { data, isFetching } = fetchProducts()
</script>

<template>
  <AFlex justify="center" align="center" style="height: 100px;">
    <ASpin v-if="isFetching" />
  </AFlex>

  <ARow v-if="data && data?.length && !isFetching" :gutter="[16,16]">
    <ACol v-for="item in data" :key="item.id" :span="8">
      <ProductCard :product="item"  />
    </ACol>
  </ARow>

  <AEmpty v-if="!isFetching && !data?.length" />
</template>
