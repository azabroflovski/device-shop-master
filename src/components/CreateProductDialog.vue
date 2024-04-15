<script lang="ts" setup>
import { computed, ref, watch, getCurrentInstance } from 'vue'
import { createProductRequest, updateProductRequest } from '@/api/queries'

type Emits = {
  onCreated: [product: ProductItem]
}

const emit = defineEmits<Emits>()
const show = defineModel('open')
const vm = getCurrentInstance()

defineExpose({
  open,
  close,
})

const categories = [
  {
    label: 'Phones',
    value: 'phones'
  },
  {
    label: 'Tablets',
    value: 'tablet'
  },
  {
    label: 'Laptops',
    value: 'laptops'
  }
]

function defaultModel(): ProductItem {
  return {
    name: '',
    category: 'phones',
    description: '',
    price: 0,
    status: 'draft'
  }
}

function open(product?: ProductItem) {
  vm?.proxy?.$forceUpdate()

  if (product) {
    model.value = product
  }

  show.value = true
}

function close() {
  show.value = false
}

const model = ref<Partial<ProductItem>>(defaultModel())

const { execute: storeModel, onFetchFinally: storeHandler, data: storedModel } = createProductRequest(model)
const { execute: updateModel, onFetchFinally: updateHandler, data: updatedModel } = updateProductRequest(model)

const loading = ref(false)
const hasError = ref(false)

const statusTip = computed(() => {
  if (model.value.status === 'draft') {
    return 'Hidden from website catalog'
  }

  return ' Available online and visible in catalog'
})

const okText = computed(() => {
  return model.value?.id ? 'Save' : 'Create'
})

watch(show, (isOpen) => {
  if (!isOpen) {
    reset()
  }
})

function reset() {
  loading.value = false
  hasError.value = false
  model.value = defaultModel()
}

function handlerFactory(product: ProductItem) {
  loading.value = true

  if (product?.id) {
    show.value = false
    reset()
    emit('onCreated', product)
    return
  }

  hasError.value = true
  setTimeout((() => {
    hasError.value = false
  }), 5000)

  loading.value = false
}

storeHandler(async () => {
  handlerFactory(storedModel.value)
})

updateHandler(async () => {
  handlerFactory(updatedModel.value)
})

async function createOrSave() {
  if (model.value?.id) {
    await updateModel()
  } else {
    await storeModel()
  }
}
</script>

<template>
  <AModal
    v-model:open="show"
    title="New product"
    :ok-text="okText"
    @ok="createOrSave"
    width="340px"
    :confirm-loading="loading"
  >
    <AForm
      layout="vertical"
      @submit="createOrSave"
      :disabled="loading"
      style="margin-top: 26px;"
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
          :options="categories"
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
           <ARadio value="draft">Draft</ARadio>
           <ARadio value="published">Published</ARadio>
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
