<script setup lang="ts">
import type { NavigationItem } from '~/composables/useNavigation'

const props = defineProps<{
  item: NavigationItem
  collapsed: boolean
}>()

const route = useRoute()
const router = useRouter()

const hasChildren = computed(() =>
    props.item.children && props.item.children.length > 0
)

function isActive(path?: string) {
  return path ? route.path === path : false
}

function navigate(path: string) {
  router.push(path)
}
</script>

<template>
  <el-sub-menu v-if="hasChildren" :index="item.key">
    <template #title>
      <FontAwesome v-if="item.icon" :icon="item.icon" />
      <span class="ml-2">{{ item.title }}</span>
    </template>

    <!-- Если у самого пункта есть path, первым добавляем пункт "Все" -->
    <el-menu-item
        v-if="item.path"
        :index="item.path"
        :class="{ 'is-active': isActive(item.path) }"
        @click="navigate(item.path)"
    >
      <FontAwesome v-if="item.icon" :icon="item.icon" />
      <span class="ml-2">{{ item.title }} (все)</span>
    </el-menu-item>

    <!-- Рекурсивно отрисовываем дочерние пункты -->
    <AppSidebarItem
        v-for="child in item.children"
        :key="child.key"
        :item="child"
        :collapsed="collapsed"
    />
  </el-sub-menu>

  <!-- Нет детей — обычный пункт меню -->
  <el-menu-item
      v-else
      v-if="item.path"
      :index="item.path"
      :class="{ 'is-active': isActive(item.path) }"
      @click="navigate(item.path)"
  >
    <FontAwesome v-if="item.icon" :icon="item.icon" />
    <span class="ml-2">{{ item.title }}</span>
  </el-menu-item>
</template>

<style scoped>
/* sr-only — визуально скрываем, но оставляем для Element Plus popover */

</style>