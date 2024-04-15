<script lang="ts" setup>
import ProductCard from '@/components/ProductCard.vue'

import { computed, ref, watch } from 'vue'
import { fetchProducts } from '@/api/queries'
import CreateProductDialog from '@/components/CreateProductDialog.vue'
import { $api } from '@/api/client'

const productDialog = ref()
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

async function productOptionHandler(key: string, product: ProductItem) {
  if (key === 'edit') {
    productDialog.value.open(product)
  }

  if (key === 'delete') {
    try {
      await $api(`/products/${product.id}`).delete()
      await execute() // renew products list
    } catch (error) {
      // send error to sentry/bugsnag/etc
    }
  }
}
</script>
<template>
  <AFlex justify="space-between" align="center" style="margin-bottom: 16px">
    <h3>Products</h3>

    <AFlex gap="12">
      <ASelect v-model:value="sort" placeholder="Sorting" :options="sortingOptions" style="width: 150px" />
      <AInputSearch placeholder="Filter" style="width: 200px" />
      <AButton @click="productDialog.open()">
        Add
      </AButton>
    </AFlex>
  </AFlex>

  <div v-auto-animate>
    <ProductCard
      v-for="product in data"
      :key="product.id"
      :product="product"
      style="margin-bottom: 16px"
      @click="productDialog.open(product)"
      @on-option-click="productOptionHandler"
    />
  </div>

  <AFlex v-if="isFetching && !data">
    <ASkeleton active />
  </AFlex>

  <AEmpty
    v-if="!isFetching && !data?.length"
    style="margin-top: 30px;"
  />

  <CreateProductDialog ref="productDialog" @on-created="execute" />
</template>
