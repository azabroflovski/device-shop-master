<script lang="ts" setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useHead } from '@unhead/vue'
import ProductCard from '@/components/ProductCard.vue'
import { useProductsApi } from '@/composables/useProductsApi'

const router = useRouter()
const { data, isLoading, sort, sortingOptions, pagination, refetchProducts, isEmpty } = useProductsApi({
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
  <APageHeader>
    <template #title>
      Our catalog <ASpin v-if="isLoading" style="margin-left: 12px;" />
    </template>

    <template #extra>
      <ASelect
        v-model:value="sort"
        placeholder="Sorting"
        :options="sortingOptions" style="width: 150px"
      />
    </template>
  </APageHeader>

  <ARow
    v-if="data?.length"
    v-auto-animate
    :gutter="[16, 16]"
    style="margin-bottom: 26px"
  >
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
