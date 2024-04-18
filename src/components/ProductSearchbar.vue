<script lang="ts" setup>
import { useAsyncState } from '@vueuse/core'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useSearchbar } from '@/composables/useSearchbar'
import { searchProduct } from '@/api/queries'

const { searchQuery, hasSearchQuery, onSearch } = useSearchbar()
const { state: response, isLoading, execute } = useAsyncState(() => searchProduct(searchQuery.value), [], {
  immediate: false,
})

const router = useRouter()

const searchResult = computed(() => {
  if (searchQuery.value.length === 0)
    return []

  return response.value?.data?.map(item => ({
    label: item.name,
    value: item.id,
  }))
})

onSearch(() => {
  if (hasSearchQuery.value)
    execute()
})

function onSelect(text: string, option: any) {
  router.push({
    name: 'product',
    params: {
      id: option.value,
    },
  })
}
</script>

<template>
  <AAutoComplete :options="searchResult" @select="onSelect">
    <AInputSearch
      v-model:value="searchQuery"
      placeholder="Find something"
      :loading="isLoading"
    />
  </AAutoComplete>
</template>
