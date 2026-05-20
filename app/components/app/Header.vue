<script setup lang="ts">
import {Fold} from '@element-plus/icons-vue'
import {useAuthStore} from "~/stores/auth";

const {user, logout} = useAuthStore()

defineEmits(['toggle-sidebar'])
</script>

<template>
  <div class="flex w-full">
    <div class="left">
      Верхняя панель
      <el-icon class="hamburger" @click="$emit('toggle-sidebar')">
        <Fold/>
      </el-icon>
      <AppBreadcrumbs class="breadcrumbs"/>
    </div>
    <div class="ml-auto">
      <AppNotifications/>
      <AppTheme />
      <el-dropdown trigger="click">
        <span class="user-info">
          <el-avatar :size="32" icon="UserFilled"/>
          <span class="username">{{ user?.fullName }}</span>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="navigateTo('/profile')">Профиль</el-dropdown-item>
            <el-dropdown-item divided @click="logout">Выйти</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style scoped>
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  height: 48px;
  padding: 0 16px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
}

.left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.hamburger {
  font-size: 20px;
  cursor: pointer;
}

.right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}
</style>