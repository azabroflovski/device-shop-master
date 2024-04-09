<script setup lang="ts">

</script>

<template>
  <div class="container">
    <APageHeader title="Amazon">
      <template #extra>
        <AInputSearch placeholder="Find something" />
        <AButton>Create</AButton>
      </template>
    </APageHeader>

    <ADivider style="font-size: 12px;">&copy; azabroflovski</ADivider>
  </div>
</template>

<style>
.container {
  max-width: 680px;
  margin-inline: auto;
}
</style>
