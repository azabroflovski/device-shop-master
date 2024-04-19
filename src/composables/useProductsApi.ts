import type { ComputedRef } from 'vue'
import { computed, reactive, ref, watch } from 'vue'
import { useAsyncState, useDebounceFn } from '@vueuse/core'
import { getProducts } from '@/api/queries'
import { useProductsSorting } from '@/composables/useProductsSorting'

interface UseProductsApiOptions {
  queryParams: ComputedRef<{
    [key: string]: any
  }>
}

/**
 * Composable for managing products API data.
 *
 * @param {UseProductsApiOptions} [options] - Options for products API.
 * @returns {object} Object containing products API data and methods.
 */
export function useProductsApi(options?: UseProductsApiOptions) {
  const pagination = reactive({
    page: 1,
    pageSize: 5,
    total: 0,
  })

  const filters = reactive({
    category: [],
    status: [],
  })

  const searchQuery = ref('')

  /**
   * Indicates whether there are active filters.
   */
  const hasFilters = computed(() => {
    return filters.status.length || filters.category.length
  })

  const { sort, sortingOptions, sortingQueryParams } = useProductsSorting()

  /**
   * Computed query parameters for the API request.
   */
  const queryParams = computed(() => {
    let params = {
      _page: pagination.page,
      _limit: pagination.pageSize,
      category: [],
      status: [],
      q: '',
      ...sortingQueryParams.value,
    }

    if (searchQuery.value)
      params.q = searchQuery.value

    if (hasFilters.value) {
      if (filters.category.length)
        params.category = filters.category

      if (filters.status.length)
        params.status = filters.status
    }

    if (options?.queryParams.value) {
      params = {
        ...params,
        ...options?.queryParams.value,
      }
    }

    return params
  })

  const { state, isLoading, execute } = useAsyncState(() => getProducts({
    params: queryParams.value,
  }), null, { resetOnExecute: false })

  /**
   * Computed data from the API response.
   */
  const data = computed(() => {
    return state.value?.data
  })

  /**
   * Indicates whether data is loading and there is data available.
   */
  const isLoadingWithData = computed(() => {
    return isLoading.value && data.value?.length
  })

  /**
   * Indicates whether data is loading and there is no data available.
   */
  const isLoadingWithoutData = computed(() => {
    return isLoading.value && !data.value
  })

  /**
   * Indicates whether there is no data available and loading is complete.
   */
  const isEmpty = computed(() => {
    return !isLoading.value && !data.value?.length
  })

  /**
   * Resets filters to default values.
   */
  function resetFilter() {
    filters.category = []
    filters.status = []
  }

  // Watch for changes in filters and sorting, then execute API request.
  watch([filters, sort], async () => {
    await execute()
  })

  // Watch for changes in filters and reset pagination when filters change.
  watch(filters, () => {
    pagination.page = 1
  })

  // Watch for changes in search query, debounce, and execute API request.
  watch(searchQuery, useDebounceFn(async () => {
    pagination.page = 1

    await execute()
  }, 300))

  // Watch for changes in response headers to update pagination total.
  // T_T sorry for any (времени нету)
  watch(() => state.value?.headers, async (headers: any) => {
    if (headers && headers.has('x-total-count'))
      pagination.total = Number.parseInt(headers.get('x-total-count'))
  })

  return {
    sort,
    sortingOptions,
    data,
    pagination,
    filters,
    hasFilters,
    resetFilter,
    searchQuery,
    isLoading,
    isLoadingWithoutData,
    isLoadingWithData,
    isEmpty,
    refetchProducts: execute,
  }
}
