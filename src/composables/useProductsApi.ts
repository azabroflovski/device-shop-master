import { computed, watch } from 'vue'
import { useAsyncState } from '@vueuse/core'
import { getProducts } from '@/api/queries'
import { useProductSorting } from '@/composables/useProductSorting'

export function useProductsApi() {
    const { sort, sortingOptions, sortingQueryParams } = useProductSorting()
    const { state, isLoading, execute } = useAsyncState(() => getProducts({
        params: sortingQueryParams.value
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

    watch(sortingQueryParams, async () => {
        await execute()
    })

    return {
        sort,
        sortingOptions,
        data,
        isLoading,
        isLoadingWithoutData,
        isLoadingWithData,
        isEmpty,
        refetchProducts: execute,
    }
}
