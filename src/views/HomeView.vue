<script lang="ts" setup>
import ProductCard from '@/components/ProductCard.vue'

import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useHead } from '@unhead/vue'
import { fetchProducts } from '@/api/queries'

const router = useRouter()
const { data, isFetching } = fetchProducts()

// I didn't write my own backend.
// I took a ready-made one, I was too lazy to do it on the side of the backend.
const publishedProducts = computed(() => {
  return data.value?.filter(product => product.status === 'published')
})

useHead({
  title: 'Home'
})

function openProduct(id: number) {
  router.push({
    name: 'product',
    params: {
      id,
    }
  })
}

const hasProducts = computed(() => {
  return publishedProducts.value && publishedProducts.value?.length && !isFetching.value
})

const isEmpty = computed(() => {
  return !isFetching.value && !data.value?.length
})
</script>

<template>
  <AFlex justify="center" align="center" style="height: 100px;">
    <ASpin v-if="isFetching" />
  </AFlex>

  <ARow v-if="hasProducts" :gutter="[16,16]">
    <ACol v-for="product in publishedProducts" :key="product.id" :span="12">
      <ProductCard
        @click="openProduct(product.id)"
        :product="product"
        hide-actions
        hide-footer
      />
    </ACol>
  </ARow>

  <AEmpty v-if="isEmpty" />
</template>
