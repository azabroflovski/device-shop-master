<script lang="ts" setup>
import { useAuth } from '@/composables/useAuth'
import { onMounted } from 'vue'

const { init } = useAuth()

onMounted(() => {
  init()
})
</script>

<template>
  <div></div>
</template>
