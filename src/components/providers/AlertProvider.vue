<script lang="ts" setup>
import { notification } from 'ant-design-vue'
import { alertBus } from '@/shared/alert-bus'

/**
 * Handler for the 'REQUEST_LIMIT_ERROR' event.
 * Opens a notification with the provided title and description.
 * @param data - Data containing the title and description of the error.
 */
alertBus.on('REQUEST_LIMIT_ERROR', ({ title, description }) => {
  notification.open({
    message: title,
    description,
    placement: 'topRight',
  })
})
</script>

<template>
  <div />
</template>
