import { computed, reactive, watch } from 'vue'
import { useAsyncState } from '@vueuse/core'
import { getProducts } from '@/api/queries'
import { useProductsSorting } from '@/composables/useProductsSorting'

export function useProductsApi() {
  const pagination = reactive({
    page: 1,
    total: 0,
  })

  const filters = reactive({
    category: [],
    status: [],
  })

  const { sort, sortingOptions, sortingQueryParams } = useProductsSorting()

  const queryParams = computed(() => {
    const params = {
      _page: 1,
      _limit: 1,
      category: [],
      status: [],
      ...sortingQueryParams.value,
    }

    if (filters.category.length > 0)
      params.category = filters.category

    if (filters.status.length > 0)
      params.status = filters.status

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

  watch(queryParams, async () => {
    await execute()
  })

  return {
    sort,
    sortingOptions,
    data,
    pagination,
    filters,
    isLoading,
    isLoadingWithoutData,
    isLoadingWithData,
    isEmpty,
    refetchProducts: execute,
  }
}
