import { computed, reactive, ref, watch } from 'vue'
import { useAsyncState, useDebounceFn } from '@vueuse/core'
import { getProducts } from '@/api/queries'
import { useProductsSorting } from '@/composables/useProductsSorting'

export function useProductsApi() {
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

  const hasFilters = computed(() => {
    return filters.status.length || filters.category.length
  })

  const { sort, sortingOptions, sortingQueryParams } = useProductsSorting()

  const queryParams = computed(() => {
    const params = {
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

    return params
  })

  const { state, isLoading, execute } = useAsyncState(() => getProducts({
    params: queryParams.value,
  }), null, { resetOnExecute: false })

  const data = computed(() => {
    return state.value?.data
  })

  const isLoadingWithData = computed(() => {
    return isLoading.value && data.value?.length
  })

  const isLoadingWithoutData = computed(() => {
    return isLoading.value && !data.value
  })

  const isEmpty = computed(() => {
    return !isLoading.value && !data.value?.length
  })

  function resetFilter() {
    filters.category = []
    filters.status = []
  }

  watch([filters, sort], async () => {
    await execute()
  })

  watch(filters, () => {
    pagination.page = 1
  })

  watch(searchQuery, useDebounceFn(async () => {
    pagination.page = 1

    await execute()
  }, 300))

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
