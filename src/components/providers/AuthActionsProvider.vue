<script lang="ts" setup>
import { LogoutOutlined } from '@ant-design/icons-vue'
import { useAuth } from '@/composables/useAuth'

const { isLoggedIn, logoutWithRedirect } = useAuth()
</script>

<template>
  <div v-if="isLoggedIn">
    <AFloatButtonGroup>
      <AFloatButton tooltip="Create product">
        <template #icon>
          +
        </template>
      </AFloatButton>

      <AFloatButton tooltip="Logout" @click="logoutWithRedirect">
        <template #icon>
          <LogoutOutlined />
        </template>
      </AFloatButton>
    </AFloatButtonGroup>
  </div>
</template>
