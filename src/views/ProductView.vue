<script lang="ts" setup>
import { watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useHead } from '@unhead/vue'

import { fetchProductById } from '@/api/queries'
import { safeTitle } from '@/utils/seo'

const route = useRoute()
const router = useRouter()
const { data: product, isFetching, execute, onFetchFinally, error } = fetchProductById(route.params.id as string)

useHead({
  title: () => safeTitle(product.value?.name)
})

watch(() => route.params.id, () => {
  execute()
})

onFetchFinally(() => {
  if (!product.value || error.value) {
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
    <ABreadcrumbItem>
      {{ product.name }}
    </ABreadcrumbItem>
  </ABreadcrumb>

  <ACard v-if="product" style="margin-top: 16px;">
    <ACardMeta
      :title="product.name"
      :description="product.description"
      style="margin-bottom: 16px;"
    />

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
