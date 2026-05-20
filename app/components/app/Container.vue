<script setup lang="ts">
const props = defineProps({
  class: String
})
const baseClass = 'mx-auto px-4 sm:px-6 lg:px-8 w-full '
</script>

<template>
  <div :class="baseClass + props.class">
    <slot/>
  </div>
</template>

<style scoped>

</style>