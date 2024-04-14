<script setup lang="ts">
import ProductStatusLabel from "@/components/ProductStatusLabel.vue";
import { MoreOutlined } from '@ant-design/icons-vue'

interface Props {
  product: ProductItem
}

defineProps<Props>()
</script>

<template>
  <ACard>
    <ACardMeta>
      <template #title>
        <AFlex justify="space-between">
          <div style="font-size: 16px">{{ product.name }}</div>
          <AButton shape="circle" size="small" type="text">
            <template #icon>
              <MoreOutlined />
            </template>
          </AButton>
        </AFlex>
      </template>

      <template #description>
        <div>{{ product.displayPrice }}</div>
        <AFlex justify="space-between" style="margin-top: 6px;">
          <ProductStatusLabel :status="product.status" />
          <div>added {{ product.displayCreatedAt }}</div>
        </AFlex>
      </template>
    </ACardMeta>
  </ACard>
</template>
