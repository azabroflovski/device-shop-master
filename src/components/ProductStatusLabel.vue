<script lang="ts" setup>
import { computed } from 'vue'

/**
 * Represents the props for the component.
 */
interface Props {
  /**
   * The status of the product.
   */
  status: 'draft' | 'published'
}

const props = defineProps<Props>()

/**
 * Computed property to determine if the item is in draft status.
 */
const isDraft = computed(() => props.status === 'draft')

/**
 * Computed property to determine the badge status based on the item status.
 */
const badgeStatus = computed(() => {
  if (isDraft.value)
    return 'default'

  return 'success'
})

/**
 * Computed property to determine the tooltip text based on the item status.
 */
const badgeTip = computed(() => {
  if (isDraft.value)
    return 'Item is not displayed on the site.'

  return 'Item is visible on the website'
})
</script>

<template>
  <ATooltip :title="badgeTip" placement="right">
    <ABadge :status="badgeStatus" :text="status" class="product-status" />
  </ATooltip>
</template>

<style>
.product-status .ant-badge-status-text {
  font-size: 12px !important;
  color: #aaa !important;
  text-transform: capitalize;
  cursor: pointer;
}
</style>
