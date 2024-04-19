<script lang="ts" setup>
import { computed, getCurrentInstance, ref, watch } from 'vue'
import { storeProduct, updateProduct } from '@/api/queries'
import { categoriesConfig, defaultModel } from '@/config/product'
import { requiredRuleFactory } from '@/utils/validators'

const emit = defineEmits<{
  success: []
}>()

const vm = getCurrentInstance()
const show = defineModel('open')

const form = ref()
const model = ref<Partial<ProductItem>>(defaultModel() as ProductItem)
const loading = ref(false)
const hasError = ref(false)

/**
 * Computed property for check if the model exists.
 */
const isExistModel = computed(() => model.value?.id)

/**
 * Computed property that determines the title of the modal based on the existence of the model.
 */
const modalTitle = computed(() => {
  return isExistModel.value ? 'Edit' : 'New product'
})

/**
 * Computed property for determining text for the OK button
 */
const statusTip = computed(() => {
  if (model.value.status === 'draft')
    return 'Hidden from website catalog'

  return ' Available online and visible in catalog'
})

/**
 *  Watch for changes in the 'show' model and reset when the component is closed
 */
const okText = computed(() => {
  return model.value?.id ? 'Save' : 'Create'
})

watch(show, (isOpen) => {
  if (!isOpen)
    reset()
})

/**
 * Expose methods to parent component
 */
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

/**
 * Function to open the modal and optionally set the product model
 */
function close() {
  show.value = false
}

/**
 * Function to reset component state
 */
function reset() {
  loading.value = false
  hasError.value = false
  model.value = defaultModel() as ProductItem
}

/**
 * Function to reset and close modal after a success
 */
function resetWithSuccess() {
  show.value = false
  reset()
  emit('success')
}

async function createOrSave() {
  try {
    loading.value = true

    await form.value?.validate()
    const isExistModel = !!model.value?.id

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
    :title="modalTitle"
    :ok-text="okText"
    width="340px"
    :confirm-loading="loading"
    @ok="createOrSave"
  >
    <AForm
      ref="form"
      layout="vertical"
      :disabled="loading"
      :model="model"
      style="margin-top: 26px;"
      @submit="createOrSave"
    >
      <AFlex gap="12">
        <AFormItem
          label="Name"
          name="name"
          :rules="[
            requiredRuleFactory('Enter device name'),
          ]"
        >
          <AInput
            v-model:value="model.name"
            placeholder="Pixel 7"
          />
        </AFormItem>

        <AFormItem
          label="Year"
          name="year"
          :rules="[
            requiredRuleFactory('Select year'),
          ]"
        >
          <ADatePicker
            v-model:value="model.year"
            picker="year"
            placeholder="2012"
          />
        </AFormItem>
      </AFlex>

      <AFormItem
        label="Price"
        name="price"
        :rules="[
          requiredRuleFactory('Price required'),
        ]"
      >
        <AInputNumber
          v-model:value.number="model.price"
          placeholder="Enter amount"
          :controls="false"
          style="width: 100%"
        >
          <template #addonAfter>
            USD
          </template>
        </AInputNumber>
      </AFormItem>

      <AFormItem label="Category" name="category">
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
