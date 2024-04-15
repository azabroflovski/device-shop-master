<script setup lang="ts">
import ProductStatusLabel from "@/components/ProductStatusLabel.vue";
import { MoreOutlined } from '@ant-design/icons-vue'

interface Props {
  product: ProductItem
  hideActions?: boolean
  hideFooter?: boolean
}

type Emits = {
  onOptionClick: [ key: 'edit' | 'delete', product: ProductItem]
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()


// NOTE: Ant design doest not expose types for this
// i am use any for faster implementation
function handleOptionsClick({ key }: any) {
  emit('onOptionClick', key, props.product)
}
</script>

<template>
  <ACard>
    <ACardMeta>
      <template #title>
        <AFlex justify="space-between">
          <div style="font-size: 16px">{{ product.name }}</div>
          <ADropdown trigger="click">
            <AButton
              v-if="!hideActions"
              @click.stop=""
              shape="circle"
              size="small"
              type="text"
            >
              <template #icon>
                <MoreOutlined />
              </template>
            </AButton>

            <template #overlay>
              <AMenu @click="handleOptionsClick">
                <AMenuItem key="edit">Edit</AMenuItem>
                <AMenuItem key="delete">Delete</AMenuItem>
              </AMenu>
            </template>
          </ADropdown>
        </AFlex>
      </template>

      <template #description>
        <div>{{ product.displayPrice }}</div>
        <AFlex v-if="!hideFooter" justify="space-between" style="margin-top: 6px;">
          <ProductStatusLabel :status="product.status" />
          <div>added {{ product.displayCreatedAt }}</div>
        </AFlex>
      </template>
    </ACardMeta>
  </ACard>
</template>
