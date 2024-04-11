<script setup lang="ts">
import AppFooter from '@/components/AppFooter.vue'
import AppHeader from '@/components/AppHeader.vue'
</script>

<template>
  <div class="container">
    <AppHeader />
    <RouterView />
  </div>

  <AppFooter />
</template>

<style>
.container {
  max-width: 680px;
  margin-inline: auto;
}
</style>
