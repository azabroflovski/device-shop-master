<script setup lang="ts">
import AppFooter from '@/components/AppFooter.vue'
import AppHeader from '@/components/AppHeader.vue'
import AuthActionsProvider from '@/components/providers/AuthActionsProvider.vue'
import AuthProvider from '@/components/providers/AuthProvider.vue'
import AlertProvider from '@/components/providers/AlertProvider.vue'
</script>

<template>
  <div class="container">
    <AppHeader />

    <!-- Providers -->
    <AuthProvider />
    <AuthActionsProvider />
    <AlertProvider />
    <!-- Providers -->

    <RouterView :key="$route.name ?? ''" />
  </div>

  <AppFooter />
</template>

<style>
.container {
  max-width: 680px;
  margin-inline: auto;
  padding: 0 24px;
}

.container .ant-page-header {
  padding-inline: 0;
}
</style>
