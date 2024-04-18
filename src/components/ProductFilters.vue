<script lang="ts" setup>
import { reactive } from 'vue'
import { categoriesConfig } from '@/config/product'

const filters = defineModel({
  default() {
    return reactive({
      categories: [],
      statuses: [],
    })
  },
})

function hasCategory(category: any) {
  return filters.value.categories.findIndex(item => item.value === category.value) >= 0
}

function removeCategory(category: any) {
  const categoryIndex = filters.value.categories.findIndex(item => item.value === category.value)
  filters.value.categories.splice(categoryIndex, 1)
}

function selectCategory(category: any) {
  if (hasCategory(category))
    removeCategory(category)
  else
    filters.value.categories.push(category)
}
</script>

<template>
  <ACard>
    <ACardMeta title="Filters">
      <template #description>
        <AFlex gap="10">
          <AButton
            v-for="category in categoriesConfig.categories"
            :key="category.value"
            :type="hasCategory(category) ? 'primary' : 'dashed'"
            @click="selectCategory(category)"
          >
            {{ category.label }}
          </AButton>
        </AFlex>
      </template>
    </ACardMeta>
  </ACard>
</template>
