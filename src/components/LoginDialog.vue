<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const show = defineModel('show')
const { attemptLogin } = useAuth()

const credentials = ref({
  email: '',
  password: '',
})

const router = useRouter()
const loading = ref(false)
const hasError = ref(false)

/**
 * Watch for changes in the 'show' model and reset when the component is closed
 */
watch(show, (isOpen) => {
  if (isOpen)
    reset()
})

/**
 * Reset login component state.
 */
function reset() {
  loading.value = false
  hasError.value = false
  credentials.value = {
    email: '',
    password: '',
  }
}

/**
 * Fill in login credentials for demo purpose.
 */
function letsGo() {
  credentials.value.email = 'howard.wolowitz@gmail.com'
  credentials.value.password = 'root'
}

/**
 * Handle login process.
 */
async function handleLogin() {
  loading.value = true
  const success = await attemptLogin(credentials.value)

  // If login attempt is successful, redirect to dashboard
  if (success) {
    show.value = false
    await router.push({
      name: 'dashboard',
    })
    return
  }

  // Show error message if login attempt fails
  hasError.value = true
  setTimeout(() => {
    hasError.value = false
  }, 5000)

  loading.value = false
}
</script>

<template>
  <AModal
    v-model:open="show"
    title="Authorization"
    ok-text="Sign"
    width="340px"
    :confirm-loading="loading"
    @ok="handleLogin"
  >
    <AForm
      layout="vertical"
      :disabled="loading"
      style="margin-top: 26px;"
      @submit="handleLogin"
    >
      <AFormItem label="Login">
        <AInput
          v-model:value="credentials.email"
          placeholder="leonard@example.com"
          @keydown.enter="handleLogin"
        />
      </AFormItem>

      <AFormItem label="Password">
        <AInputPassword
          v-model:value="credentials.password"
          placeholder="Secret"
          @keydown.enter="handleLogin"
        />
      </AFormItem>
    </AForm>

    <div v-auto-animate>
      <ATypographyText v-if="hasError" type="danger">
        Your login credentials have been compromised. Try again.
      </ATypographyText>
    </div>

    <ADivider />

    <ATypographyText type="secondary">
      <AFlex justify="space-between">
        <div style="margin-bottom: 6px;">
          Demo credentials
        </div>
        <AButton size="small" @click="letsGo">
          Let's go
        </AButton>
      </AFlex>

      <div style="font-size: 12px; margin-bottom: 4px">
        <div><b>Email:</b> <strong>howard.wolowitz@gmail.com</strong></div>
        <div><b>Password:</b> <strong>root</strong></div>
      </div>
    </ATypographyText>
  </AModal>
</template>
