<script lang="ts" setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useHead } from '@unhead/vue'
import ProductCard from '@/components/ProductCard.vue'
import { useProductsApi } from '@/composables/useProductsApi'

const router = useRouter()
const { data, isLoading, isEmpty } = useProductsApi()

// I didn't write my own backend.
// I took a ready-made one, I was too lazy to do it on the side of the backend.
const publishedProducts = computed(() => {
  return data.value?.filter(product => product.status === 'published')
})

useHead({
  title: 'Home',
})

function openProduct(id: number) {
  router.push({
    name: 'product',
    params: {
      id,
    },
  })
}
</script>

<template>
  <AFlex justify="center" align="center" style="height: 100px;">
    <ASpin v-if="isLoading" />
  </AFlex>

  <ARow v-if="data" :gutter="[16, 16]">
    <ACol v-for="product in publishedProducts" :key="product.id" :span="12">
      <ProductCard
        :product="product"
        hide-actions
        hide-footer
        @click="openProduct(product.id!)"
      />
    </ACol>
  </ARow>

  <AEmpty v-if="isEmpty" />
</template>
