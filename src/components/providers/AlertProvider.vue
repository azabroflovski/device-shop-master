<script lang="ts" setup>
import { notification } from 'ant-design-vue'
import { alertBus } from '@/shared/alert-bus'

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
