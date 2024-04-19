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

/**
 * Computed property to derive search results based on the response data.
 */
const searchResult = computed(() => {
  if (searchQuery.value.length === 0)
    return []

  return response.value?.data?.map(item => ({
    label: item.name,
    value: item.id,
  }))
})

/**
 * Callback function to trigger a search operation when there is a search query.
 * @param {Function} callback - The callback function to execute when a search is triggered.
 */
onSearch(() => {
  if (hasSearchQuery.value)
    execute()
})

/**
 * Handles the selection of a search result.
 * p.s sorry for any, ant-design not expose typing for this (+ времени мало)
 * @param {string} text - The text of the selected option.
 * @param {object} option - The selected option object.
 */
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
