<script lang="ts" setup>
import { useAuth } from '@/composables/useAuth'

const { user, logoutWithRedirect } = useAuth()
</script>

<template>
  <ACard>
    <AFlex justify="space-between">
      <AFlex align="end">
        <AAvatar size="large">{{ user.name[0] }}</AAvatar>

        <div style="margin-left: 12px;">
          <div style="line-height: 1">{{ user.name }}</div>
          <ATypographyText type="secondary" style="font-size: 12px">
            {{ user.email }}
          </ATypographyText>
        </div>
      </AFlex>

      <AFlex v-if="user" align="center" justify="space-between">
        <ATypographyLink @click="logoutWithRedirect">
          Logout
        </ATypographyLink>
      </AFlex>
    </AFlex>
  </ACard>
</template>
