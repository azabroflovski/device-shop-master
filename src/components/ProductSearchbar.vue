<script lang="ts" setup>
import { useAsyncState } from '@vueuse/core'
import { useSearchbar } from '@/composables/useSearchbar'
import { searchProduct } from '@/api/queries'
import { computed, watch } from 'vue'
import { useRouter } from 'vue-router'

const { searchQuery, hasSearchQuery, onSearch } = useSearchbar()
const { state: data, isLoading, execute } = useAsyncState(() => searchProduct(searchQuery.value),[], {
  immediate: false
})

const router = useRouter()

const searchResult = computed(() => {
  return data.value?.map(item => ({
    text: item.id,
    value: item.name,
  }))
})

onSearch(() => {
  if (hasSearchQuery.value) {
    execute()
  }
})

watch(searchQuery, (value) => {
  if (value.length === 0) {
    data.value = []
  }
})

function onSelect(text: string, option: any) {
  router.push({
    name: 'product',
    params: {
      id: option.text
    }
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
