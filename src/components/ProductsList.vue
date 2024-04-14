<script lang="ts" setup>
import ProductStatusLabel from '@/components/ProductStatusLabel.vue'

import { fetchProducts } from '@/api/queries'
import { MoreOutlined } from '@ant-design/icons-vue'
import { computed, ref, watch } from 'vue'

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
    </AFlex>
  </AFlex>

  <div v-if="data && data.length">
    <ACard v-for="product in data" :key="product.id" style="margin-bottom: 16px;">
      <ACardMeta>
        <template #title>
          <AFlex justify="space-between">
            <div style="font-size: 16px">{{ product.name }}</div>
            <AButton shape="circle" size="small" type="text">
              <template #icon>
                <MoreOutlined />
              </template>
            </AButton>
          </AFlex>
        </template>

        <template #description>
            <div>{{ product.displayPrice }}</div>
            <AFlex justify="space-between" style="margin-top: 6px;">
              <ProductStatusLabel :status="product.status" />
              <div>added {{ product.displayCreatedAt }}</div>
            </AFlex>
        </template>
      </ACardMeta>
    </ACard>
  </div>

  <AFlex v-if="isFetching">
    <ASkeleton active />
  </AFlex>
</template>
