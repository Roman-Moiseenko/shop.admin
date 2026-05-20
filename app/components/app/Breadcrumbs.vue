<script setup lang="ts">
const route = useRoute()

const breadcrumbs = computed(() => {
  // Логика разбора route.matched или кастомного маппинга путей к названиям
  // Упрощённо: используем navigationItems из useNavigation для сопоставления
  const { getBreadcrumbs } = useNavigation()
  return getBreadcrumbs(route.path)
})
</script>

<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item v-for="crumb in breadcrumbs" :key="crumb.path" :to="crumb.path">
      {{ crumb.title }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<style scoped>

</style>