<script lang="ts" setup>
import { onMounted } from 'vue'
import { useAuth } from '@/composables/useAuth'

const { init } = useAuth()

onMounted(() => {
  init()
})
</script>

<template>
  <div />
</template>
