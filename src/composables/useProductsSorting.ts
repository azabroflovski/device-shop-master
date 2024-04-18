import { computed, ref } from 'vue'
import { sortingConfig } from '@/config/product'

export function useProductsSorting() {
  const sort = ref(sortingConfig.default)
  const sortingOptions = sortingConfig.options
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
