<script lang="ts" setup>
defineProps<{
  product: ProductItem
}>()
</script>

<template>
  <ACard class="product-card" hoverable bordered>
    <ACardMeta :title="product.name" :description="product.displayPrice" />
  </ACard>
</template>
