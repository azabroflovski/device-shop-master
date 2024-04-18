<script lang="ts" setup>
import { computed, getCurrentInstance, ref, watch } from 'vue'
import { storeProduct, updateProduct } from '@/api/queries'
import { categoriesConfig, defaultModel } from '@/config/product'

const emit = defineEmits<{
  onSuccess: [product?: ProductItem]
}>()

const vm = getCurrentInstance()
const show = defineModel('open')

const model = ref<Partial<ProductItem>>(defaultModel() as ProductItem)
const loading = ref(false)
const hasError = ref(false)

const statusTip = computed(() => {
  if (model.value.status === 'draft')
    return 'Hidden from website catalog'

  return ' Available online and visible in catalog'
})

const okText = computed(() => {
  return model.value?.id ? 'Save' : 'Create'
})

watch(show, (isOpen) => {
  if (!isOpen)
    reset()
})

defineExpose({
  open,
  close,
})

function open(product?: ProductItem) {
  vm?.proxy?.$forceUpdate()

  if (product)
    model.value = product

  show.value = true
}

function close() {
  show.value = false
}

function reset() {
  loading.value = false
  hasError.value = false
  model.value = defaultModel() as ProductItem
}

function resetWithSuccess() {
  show.value = false
  reset()
  emit('onSuccess')
}

async function createOrSave() {
  try {
    const isExistModel = !!model.value?.id
    loading.value = true

    model.value.createdAt = new Date()

    isExistModel
      ? await updateProduct(model.value.id!, model.value)
      : await storeProduct(model.value)

    resetWithSuccess()
  }
  catch (error) {
    // send error to sentry/bugsnag
    hasError.value = true

    setTimeout(() => {
      hasError.value = false
    }, 5000)
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <AModal
    v-model:open="show"
    title="New product"
    :ok-text="okText"
    width="340px"
    :confirm-loading="loading"
    @ok="createOrSave"
  >
    <AForm
      layout="vertical"
      :disabled="loading"
      style="margin-top: 26px;"
      @submit="createOrSave"
    >
      <AFlex gap="12">
        <AFormItem label="Name">
          <AInput
            v-model:value="model.name"
            placeholder="Pixel 7"
          />
        </AFormItem>

        <AFormItem label="Price">
          <AInputNumber
            v-model:value.number="model.price"
            placeholder="Enter amount"
            :controls="false"
          >
            <template #addonAfter>
              USD
            </template>
          </AInputNumber>
        </AFormItem>
      </AFlex>

      <AFormItem label="Category">
        <ASelect
          v-model:value="model.category"
          :options="categoriesConfig.categories"
          placeholder="Type of device"
        />
      </AFormItem>

      <AFormItem label="Description">
        <ATextarea
          v-model:value="model.description"
          placeholder="Tell about device"
        />
      </AFormItem>

      <AFormItem label="Status">
        <ARadioGroup v-model:value="model.status">
          <ARadio value="draft">
            Draft
          </ARadio>
          <ARadio value="published">
            Published
          </ARadio>
        </ARadioGroup>

        <div style="margin-top: 12px">
          <ATypographyText type="secondary">
            {{ statusTip }}
          </ATypographyText>
        </div>
      </AFormItem>
    </AForm>
  </AModal>
</template>
