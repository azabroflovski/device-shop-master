<script lang="ts" setup>
import { LogoutOutlined } from '@ant-design/icons-vue'
</script>

<template>
  <AFloatButtonGroup>
    <AFloatButton tooltip="Create product">
      <template #icon>
        +
      </template>
    </AFloatButton>

    <AFloatButton tooltip="Logout">
      <template #icon>
        <LogoutOutlined />
      </template>
    </AFloatButton>
  </AFloatButtonGroup>
</template>
