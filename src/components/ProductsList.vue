<script lang="ts" setup>
import { ref } from 'vue'
import { FilterOutlined } from '@ant-design/icons-vue'
import ProductCard from '@/components/ProductCard.vue'
import CreateProductDialog from '@/components/CreateProductDialog.vue'

import { destroyProduct } from '@/api/queries'
import { useProductsApi } from '@/composables/useProductsApi'
import ProductFilters from '@/components/ProductFilters.vue'

const productDialog = ref()

const {
  data,
  sort,
  filters,
  isLoading,
  sortingOptions,
  isLoadingWithoutData,
  isLoadingWithData,
  isEmpty,
  refetchProducts,
} = useProductsApi()

const productOptionHandlers = {
  async edit(product: ProductItem) {
    productDialog.value.open(product)
  },

  async delete(product: ProductItem) {
    try {
      isLoading.value = true
      await destroyProduct(product.id!)
      await refetchProducts() // renew products list
    }
    catch (error) {
      // send error to sentry/bugsnag/etc
    }
  },
}

async function callProductOption(key: 'edit' | 'delete', product: ProductItem) {
  if (key in productOptionHandlers) {
    try {
      await productOptionHandlers[key](product)
    }
    catch (error) {
      // send error to sentry/bugsnag/etc
    }
  }
}
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

      <APopover trigger="click" placement="topRight">
        <ATooltip title="Filters" placement="bottom">
          <AButton>
            <template #icon>
              <FilterOutlined />
            </template>
          </AButton>
        </ATooltip>
        <template #content>
          <ProductFilters v-model="filters" />
        </template>
      </APopover>

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
