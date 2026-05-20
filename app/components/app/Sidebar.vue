<script setup lang="ts">
import { Fold } from '@element-plus/icons-vue'
import { useNavigation, type NavigationItem } from '~/composables/useNavigation'

const props = defineProps<{
  collapsed: boolean
}>()

const emit = defineEmits(['toggle'])

const route = useRoute()
const { navigationItems } = useNavigation()

const activeRoute = computed(() => route.path)
</script>

<template>
  <div class="sidebar h-screen " :class="{ collapsed }">
    <div class="sidebar-toggle" @click="$emit('toggle')">
      <el-icon :size="20"><Fold /></el-icon>
    </div>

    <el-menu
        :default-active="activeRoute"
        :collapse="collapsed"
        :router="false"
        class="sidebar-menu"
    >
      <AppSidebarItem
          v-for="item in navigationItems"
          :key="item.key"
          :item="item"
          :collapsed="collapsed"
      />
    </el-menu>
  </div>
</template>

<style scoped>
.sidebar {
  transition: width 0.2s;
  overflow: hidden;
}
.sidebar.collapsed {
  width: 64px;
}
.sidebar-toggle {
  display: flex;
  justify-content: center;
  padding: 12px 0;
  cursor: pointer;
}
</style>