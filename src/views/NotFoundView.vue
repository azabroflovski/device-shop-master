<template>
  <AResult
    status="404"
    title="404"
    sub-title="Sorry, the page you visited does not exist."
  >
    <template #extra>
      <AButton type="primary" @click="$router.push({ name: 'home' })">
        Back Home
      </AButton>
    </template>
  </AResult>
</template>
