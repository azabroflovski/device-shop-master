<script lang="ts" setup>
import { useSearchbar } from '@/composables/useSearchbar'
import { searchProduct } from '@/api/queries'
import {computed, watch} from 'vue'

const { searchQuery, hasSearchQuery, onSearch } = useSearchbar()
const { data, isFetching, execute } = searchProduct(searchQuery)

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
</script>

<template>
  <AAutoComplete :options="searchResult" :open="hasSearchQuery">
    <AInputSearch v-model:value="searchQuery" placeholder="Find something" :loading="isFetching" />
  </AAutoComplete>
</template>
