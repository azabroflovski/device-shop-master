<script lang="ts" setup>
import { fetchProductById } from '@/api/queries'
import {computed, watch} from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const { data, isFetching, execute, onFetchFinally, error } = fetchProductById(route.params.id as string)

const product = computed(() => {
  return data.value && data.value[0]
})

watch(() => route.params.id, () => {
  execute()
})

onFetchFinally(() => {
  if (data.value?.length === 0 || error.value) {
    router.push({
      name: '404'
    })
  }
})
</script>

<template>
  <ASkeleton v-if="isFetching" active />

  <ABreadcrumb v-if="product">
    <ABreadcrumbItem>
      <RouterLink :to="{ name: 'home' }">Products</RouterLink>
    </ABreadcrumbItem>
    <ABreadcrumbItem>{{ product.name }}</ABreadcrumbItem>
  </ABreadcrumb>

  <ACard v-if="product" style="margin-top: 16px;">
    <ACardMeta :title="product.name" :description="product.description" style="margin-bottom: 16px;" />

    <ADivider />

    <AFlex justify="space-between">
      <div>
        {{ product.displayPrice }}
      </div>

      <div>
        Published: <ATypographyText> {{ product.displayCreatedAt }}</ATypographyText>
      </div>
    </AFlex>
  </ACard>
</template>
