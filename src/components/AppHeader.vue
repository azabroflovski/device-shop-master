<script lang="ts" setup>
import { useSearchbar } from '@/composables/useSearchbar'

const { searchQuery } = useSearchbar()
</script>

<template>
  <APageHeader title="Device Shop">
    <template #extra>
      <AInputSearch v-model:value="searchQuery" placeholder="Find something" />
      <AButton>Login</AButton>
    </template>
  </APageHeader>
</template>
