<script lang="ts" setup>
defineProps<{
  product: ProductItem
}>()
</script>

<template>
  <ACard hoverable class="product-card" bordered>
    <template #cover>
      <img :src="product.image" :alt="product.title">
    </template>
    <ACardMeta :title="product.title" :description="product.category" />
  </ACard>
</template>

<style>
.product-card img {
  object-fit: contain;
  padding: 16px;
  display: none;
  height: 200px;
}
</style>
