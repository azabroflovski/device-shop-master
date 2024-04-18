<script lang="ts" setup>
import { LogoutOutlined } from '@ant-design/icons-vue'
import { ref } from 'vue'
import CreateProductDialog from '@/components/CreateProductDialog.vue'
import { useAuth } from '@/composables/useAuth'

const { isLoggedIn, logoutWithRedirect } = useAuth()
const productDialog = ref()
</script>

<template>
  <div v-if="isLoggedIn">
    <AFloatButtonGroup>
      <AFloatButton tooltip="Create product" @click="productDialog.open()">
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

    <CreateProductDialog ref="productDialog" />
  </div>
</template>
