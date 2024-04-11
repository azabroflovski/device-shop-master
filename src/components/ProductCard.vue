<script lang="ts" setup>
defineProps<{
  product: ProductItem
}>()
</script>

<template>
  <ACard hoverable class="product-card" bordered>
    <ACardMeta :title="product.name" :description="product.category" />
  </ACard>
</template>
