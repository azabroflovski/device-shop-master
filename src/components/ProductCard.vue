<script setup lang="ts">
import { MoreOutlined } from '@ant-design/icons-vue'
import ProductStatusLabel from '@/components/ProductStatusLabel.vue'

interface Props {
  /**
   * The product item.
   */
  product: ProductItem

  /**
   * Whether to hide card actions.
   */
  hideActions?: boolean

  /**
   * Whether to hide card footer
   */
  hideFooter?: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  onOptionClick: [ key: 'edit' | 'delete', product: ProductItem]
}>()

/**
 * Handles the click event of the options.
 *
 * NOTE: Ant design doest not expose types for this
 * I am use any for faster implementation
 *
 * @param {object} option - The clicked option.
 * @param {'edit' | 'delete'} option.key - The key of the clicked option.
 */
function handleOptionsClick({ key }: any) {
  emit('onOptionClick', key, props.product)
}
</script>

<template>
  <ACard>
    <ACardMeta>
      <template #title>
        <AFlex justify="space-between">
          <div>
            <ATypographyText>
              {{ product.name }}
            </ATypographyText>

            <br>

            <ATypographyText type="secondary" style="font-size: 12px; text-transform: capitalize">
              {{ product.category }}
            </ATypographyText>
          </div>

          <ADropdown trigger="click">
            <AButton
              v-if="!hideActions"
              shape="circle"
              size="small"
              type="text"
              @click.stop=""
            >
              <template #icon>
                <MoreOutlined />
              </template>
            </AButton>

            <template #overlay>
              <AMenu @click="handleOptionsClick">
                <AMenuItem key="edit">
                  Edit
                </AMenuItem>
                <AMenuItem key="delete">
                  Delete
                </AMenuItem>
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
