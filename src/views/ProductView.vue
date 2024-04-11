<script lang="ts" setup>
import { fetchProductById } from '@/api/queries'
import { watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const { data, execute } = fetchProductById(route.params.id as string)

watch(() => route.params.id, () => {
  execute()
})
</script>
<template>
  <div>
    <pre>{{ data }}</pre>
  </div>
</template>
