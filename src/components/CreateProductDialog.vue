<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const show = defineModel('show')
const { attemptLogin } = useAuth()

const credentials = ref({
  email: '',
  password: ''
})

const router = useRouter()
const loading = ref(false)
const hasError = ref(false)

watch(show, (isOpen) => {
  if (isOpen) {
    reset()
  }
})

function reset() {
  loading.value = false
  hasError.value = false
  credentials.value = {
    email: '',
    password: ''
  }
}

function letsGo() {
  credentials.value.email = 'howard.wolowitz@gmail.com'
  credentials.value.password = 'root'
}

async function handleLogin() {
  loading.value = true
  const success = await attemptLogin(credentials.value)

  if (success) {
    show.value = false
    await router.push({
      name: 'dashboard'
    })
    return
  }

  hasError.value = true
  setTimeout((() => {
    hasError.value = false
  }), 5000)

  loading.value = false
}
</script>

<template>
  <AModal
      v-model:open="show"
      title="Authorization"
      ok-text="Sign"
      @ok="handleLogin"
      width="340px"
      :confirm-loading="loading"
  >
    <AForm
        layout="vertical"
        @submit="handleLogin"
        :disabled="loading"
        style="margin-top: 26px;"
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
        <div style="margin-bottom: 6px;">Demo credentials</div>
        <AButton @click="letsGo" size="small">Let's go</AButton>
      </AFlex>
      <div style="font-size: 12px; margin-bottom: 4px">
        <div><b>Email:</b> <strong>howard.wolowitz@gmail.com</strong></div>
        <div><b>Password:</b> <strong>root</strong></div>
      </div>

    </ATypographyText>
  </AModal>
</template>
