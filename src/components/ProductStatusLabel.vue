<script lang="ts" setup>
import { computed } from 'vue'

interface Props {
  status: 'draft' | 'published'
}

const props = defineProps<Props>()
const isDraft = computed(() => props.status === 'draft')

const badgeStatus = computed(() => {
  if (isDraft.value)
    return 'default'

  return 'success'
})

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
