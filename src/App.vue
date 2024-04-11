<script setup lang="ts">
import AppFooter from '@/components/AppFooter.vue'
import AppHeader from '@/components/AppHeader.vue'
</script>

<template>
  <Suspense>
    <!-- Suspense need a single root  -->
    <div id="#app">
      <div class="container">
        <AppHeader />
        <RouterView style="padding: 24px" />
      </div>

      <AppFooter />
    </div>
  </Suspense>
</template>

<style>
.container {
  max-width: 680px;
  margin-inline: auto;
}
</style>
