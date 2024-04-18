<script lang="ts" setup>
import { computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useHead } from '@unhead/vue'
import { useAsyncState } from '@vueuse/core'

import { findProduct } from '@/api/queries'
import { safeTitle } from '@/utils/seo'

const route = useRoute()
const router = useRouter()

const { state: response, isLoading, execute } = useAsyncState(() => findProduct(route.params.id as string), null, {
  onError() {
    // send error to sentry/bugsnag
    router.push({
      name: '404',
    })
  },
})

const product = computed(() => {
  return response.value?.data
})

useHead({
  title: () => safeTitle(product.value?.name),
})

watch(() => route.params.id, () => {
  execute()
})
</script>

<template>
  <ASkeleton v-if="isLoading" active />

  <ABreadcrumb v-if="product">
    <ABreadcrumbItem>
      <RouterLink :to="{ name: 'home' }">
        Products
      </RouterLink>
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
