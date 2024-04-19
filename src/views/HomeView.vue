<script lang="ts" setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useHead } from '@unhead/vue'
import ProductCard from '@/components/ProductCard.vue'
import { useProductsApi } from '@/composables/useProductsApi'

const router = useRouter()
const { data, isLoading, pagination, refetchProducts, isEmpty } = useProductsApi({
  queryParams: computed(() => {
    return {
      status: 'published',
    }
  }),
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

  <ARow v-if="data?.length" :gutter="[16, 16]" style="margin-bottom: 26px">
    <ACol v-for="product in data" :key="product.id" :span="12">
      <ProductCard
        :product="product"
        hide-actions
        hide-footer
        @click="openProduct(product.id!)"
      />
    </ACol>
  </ARow>

  <AEmpty v-if="isEmpty" />

  <APagination
    v-if="pagination.total"
    v-model:current="pagination.page"
    v-model:page-size="pagination.pageSize"
    :total="pagination.total"
    show-size-changer
    show-less-items
    @change="refetchProducts"
  />
</template>
