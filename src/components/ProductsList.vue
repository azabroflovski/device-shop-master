<script lang="ts" setup>
import ProductCard from '@/components/ProductCard.vue'

import { computed, ref, watch } from 'vue'
import { getProducts, destroyProduct } from '@/api/queries'
import { sortingConfig } from '@/config/dashboard'
import CreateProductDialog from '@/components/CreateProductDialog.vue'
import { useAsyncState } from '@vueuse/core'

const productDialog = ref()
const sort = ref(sortingConfig.default)
const sortingOptions = sortingConfig.options

const queryParams = computed(() => {
  return {
    _sort: sort.value,
  }
})

const { state: response, isLoading, execute: refetchProducts } = useAsyncState(() => getProducts({
  params: queryParams.value
}), null, { resetOnExecute: false })

const data = computed(() => {
  return response.value?.data
})

watch(queryParams, () => {
  refetchProducts()
})

const productOptionHandlers = {
  async edit(product: ProductItem) {
    productDialog.value.open(product)
  },

  async delete(product: ProductItem) {
    try {
      await destroyProduct(product.id!)
      await refetchProducts() // renew products list
    } catch (error) {
      // send error to sentry/bugsnag/etc
    }
  }
}

async function callProductOption(key: 'edit' | 'delete', product: ProductItem) {
  if (key in productOptionHandlers) {
    try {
      await productOptionHandlers[key](product)
    } catch (error) {
      // send error to sentry/bugsnag/etc
    }
  }
}

const isLoadingWithData = computed(() => {
  return isLoading.value && data.value?.length
})

const isLoadingWithoutData = computed(() => {
  return isLoading.value && !data.value
})

const isEmpty = computed(() => {
  return !isLoading.value && !data.value?.length
})
</script>
<template>
  <AFlex justify="space-between" align="center" style="margin-bottom: 16px">
    <h3>Products <ASpin v-if="isLoadingWithData" style="margin-left: 16px" /></h3>

    <AFlex gap="12">
      <ASelect
        v-model:value="sort"
        placeholder="Sorting"
        :options="sortingOptions" style="width: 150px"
      />
      <AInputSearch placeholder="Filter" style="width: 200px" />
      <AButton @click="productDialog.open()">Add</AButton>
    </AFlex>
  </AFlex>

  <div v-auto-animate>
    <ProductCard
      v-for="product in data"
      :key="product.id"
      :product="product"
      style="margin-bottom: 16px"
      @click="productDialog.open(product)"
      @on-option-click="callProductOption"
    />
  </div>

  <AFlex v-if="isLoadingWithoutData">
    <ASkeleton active />
  </AFlex>

  <AEmpty
    v-if="isEmpty"
    style="margin-top: 30px;"
  />

  <CreateProductDialog ref="productDialog" @on-success="refetchProducts" />
</template>
