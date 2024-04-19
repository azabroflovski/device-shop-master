import { computed, ref } from 'vue'
import { sortingConfig } from '@/config/product'

/**
 * Composable function for managing product sorting.
 * @returns Product sorting composable object.
 */
export function useProductsSorting() {
  // Reference to the currently selected sorting option.
  const sort = ref(sortingConfig.default)

  // Available sorting options.
  const sortingOptions = sortingConfig.options

  /**
   * Computed property to generate sorting query parameters based on the selected sorting option.
   * @returns Object containing sorting query parameters.
   */
  const sortingQueryParams = computed(() => {
    return {
      _sort: sort.value,
    }
  })

  return {
    sort,
    sortingOptions,
    sortingQueryParams,
  }
}
