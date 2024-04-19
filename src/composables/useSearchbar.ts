import { computed, ref, watch } from 'vue'
import { createEventHook, toRefs, useDebounceFn } from '@vueuse/core'

/**
 * Event hook triggered when a search query is performed.
 */
const onSearchHook = createEventHook<Response>()

/**
 * State object representing the search bar state.
 */
const state = ref({
  searchQuery: '',
})

/**
 * Watch for changes in the searchQuery state and trigger the search event with debouncing.
 */
watch(() => state.value.searchQuery, useDebounceFn((query) => {
  onSearchHook.trigger(query)
}, 300))

/**
 * Computed property to determine if there is a search query.
 * @returns Boolean indicating whether there is a search query or not.
 */
const hasSearchQuery = computed(() => state.value.searchQuery.length > 0)

/**
 * Composable function for managing the search bar.
 * @returns Search bar composable object.
 */
export function useSearchbar() {
  return {
    hasSearchQuery,
    onSearch: onSearchHook.on,
    ...toRefs(state),
  }
}
