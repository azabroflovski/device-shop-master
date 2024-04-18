import { computed, ref, watch } from 'vue'
import { createEventHook, toRefs, useDebounceFn } from '@vueuse/core'

const onSearchHook = createEventHook<Response>()

const state = ref({
  searchQuery: '',
})

watch(() => state.value.searchQuery, useDebounceFn((query) => {
  onSearchHook.trigger(query)
}, 300))

const hasSearchQuery = computed(() => state.value.searchQuery.length > 0)

export function useSearchbar() {
  return {
    hasSearchQuery,
    onSearch: onSearchHook.on,
    ...toRefs(state),
  }
}
