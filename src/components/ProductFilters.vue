<script lang="ts" setup>
import { categoriesConfig, statusesConfig } from '@/config/product'

const filters = defineModel({
  default() {
    return {
      category: [],
      status: [],
    }
  },
})
</script>

<template>
  <ACardMeta title="Category" style="padding: 8px;">
    <template #description>
      <AFlex gap="10" style="margin-top: 10px;">
        <ACheckboxGroup
          v-model:value="filters.category"
          :options="categoriesConfig.categories"
        />
      </AFlex>
    </template>
  </ACardMeta>

  <ACardMeta title="Status" style="padding: 8px;">
    <template #description>
      <AFlex gap="10" style="margin-top: 10px;">
        <ACheckboxGroup
          v-model:value="filters.status"
          :options="statusesConfig.statuses"
        />
      </AFlex>
    </template>
  </ACardMeta>
</template>
