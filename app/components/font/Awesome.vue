<script setup lang="ts">
const props = defineProps({
  icon: String,
  class: {
    default: '',
    type: String
  },
  baseStyle: {
    default: 'fa-light fa-',
    type: String
  },
})
</script>

<template>
  <i :class="props.baseStyle + icon + ' ' + props.class"></i>
</template>

<style scoped>

</style>