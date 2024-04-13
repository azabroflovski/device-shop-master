<script lang="ts" setup>
import { computed } from 'vue'

interface Props {
  product: ProductItem
}

const props = defineProps<Props>()

const status = computed(() => {
  if (props.product.status === 'published')
    return 'success'

  return 'default'
})
</script>

<template>
  <ACard class="product-card" hoverable bordered>
    <ACardMeta :title="product.name" :description="product.displayPrice" />

    <ABadge :status="status" :text="product.status" class="product-card__status" />
  </ACard>
</template>


<style>
.product-card__status {
  margin-top: 16px;
}

.product-card__status .ant-badge-status-text {
  font-size: 12px !important;
  color: #aaa !important;
  text-transform: capitalize;
}
</style>
