<script lang="ts" setup>
import ProductCard from '@/components/ProductCard.vue'

import { computed, ref, watch } from 'vue'
import { fetchProducts } from '@/api/queries'

const sort = ref('price=desc')
const sortingOptions = [
  {
    label: 'Highest price',
    value: 'price=desc'
  },
  {
    label: 'Lowest price',
    value: 'price=asc',
  }
]

const queryOptions = computed(() => {
  const [sortBy, orderBy] = sort.value.split('=')

  return {
    query: {
      sortBy,
      orderBy,
    }
  }
})

const { isFetching, data, execute } = fetchProducts(queryOptions)

watch(queryOptions, () => {
  data.value = []
  execute()
})
</script>
<template>
  <AFlex justify="space-between" align="center" style="margin-bottom: 16px">
    <h3>Products</h3>

    <AFlex gap="12">
      <ASelect v-model:value="sort" placeholder="Sorting" :options="sortingOptions" style="width: 150px" />
      <AInputSearch placeholder="Filter" style="width: 200px" />
      <AButton>Add</AButton>
    </AFlex>
  </AFlex>

  <div>
    <ProductCard
      v-for="product in data"
      :key="product.id"
      :product="product"
      style="margin-bottom: 16px"
    />
  </div>

  <AFlex v-if="isFetching">
    <ASkeleton active />
  </AFlex>
</template>
