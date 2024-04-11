import { ref, watch } from 'vue'
import { toRefs, useDebounceFn } from '@vueuse/core'
import { createEventHook } from '@vueuse/core'

const onSearchHook = createEventHook<Response>()

const state = ref({
    searchQuery: ''
})

watch(() => state.value.searchQuery, useDebounceFn((query) => {
    onSearchHook.trigger(query)
}, 300))

export function useSearchbar() {
    return {
        onSearch: onSearchHook.on,
        ...toRefs(state),
    }
}
