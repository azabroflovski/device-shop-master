<script lang="ts" setup>
import { computed, ref } from 'vue'
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
  pagination,
  filters,
  hasFilters,
  resetFilter,
  searchQuery,
  isLoading,
  sortingOptions,
  isLoadingWithoutData,
  isLoadingWithData,
  isEmpty,
  refetchProducts,
} = useProductsApi()

/**
 * Computed property to generate an empty description message based on the presence of filters.
 */
const emptyDescription = computed(() => {
  return hasFilters.value
    ? 'We didn\'t find anything. Try changing the filter settings.'
    : 'No data'
})

/**
 * Handlers for various product options like editing and deleting.
 */
const productOptionHandlers = {
  /**
   * Handler for editing a product.
   * @param product - The product to be edited.
   */
  async edit(product: ProductItem) {
    productDialog.value.open(product)
  },

  /**
   * Handler for deleting a product.
   * @param product - The product to be deleted.
   */
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

/**
 * Calls the appropriate product option handler based on the key.
 * @param key - The key corresponding to the product option.
 * @param product - The product related to the option.
 */
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

      <AInputSearch
        v-model:value="searchQuery"
        placeholder="Filter"
        allow-clear
        style="width: 200px"
      />

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

  <APagination
    v-if="pagination.total"
    v-model:current="pagination.page"
    v-model:page-size="pagination.pageSize"
    :total="pagination.total"
    show-size-changer
    show-less-items
    @change="refetchProducts"
  />

  <AFlex v-if="isLoadingWithoutData">
    <ASkeleton active />
  </AFlex>

  <AEmpty
    v-if="isEmpty"
    style="margin-top: 30px;"
  >
    <template #description>
      <div>{{ emptyDescription }}</div>

      <AButton
        v-if="hasFilters"
        style="margin-top: 16px"
        @click="resetFilter"
      >
        Reset filters
      </AButton>
    </template>
  </AEmpty>

  <CreateProductDialog ref="productDialog" @success="refetchProducts()" />
</template>
