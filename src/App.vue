<script setup lang="ts">

</script>

<template>
  <Suspense>
    <div class="container">
      <APageHeader title="Amazon">
        <template #extra>
          <AInputSearch placeholder="Find something" />
          <AButton>Create</AButton>
        </template>
      </APageHeader>

      <RouterView style="padding: 24px" />

      <ADivider style="font-size: 12px;">&copy; azabroflovski</ADivider>
    </div>
  </Suspense>
</template>

<style>
.container {
  max-width: 680px;
  margin-inline: auto;
}
</style>
