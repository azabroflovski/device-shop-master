<script lang="ts" setup>
import { useHead } from '@unhead/vue'
import AuthUserCard from '@/components/AuthUserCard.vue'
import ProductsList from '@/components/ProductsList.vue'

useHead({
  title: 'Dashboard',
})
</script>

<template>
  <section>
    <h3 style="margin-bottom: 10px">
      You profile
    </h3>
    <AuthUserCard />
  </section>

  <section style="margin-top: 40px">
    <ProductsList />
  </section>
</template>
