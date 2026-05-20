<script setup lang="ts">
const sidebarCollapsed = ref(false)
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <AppHeader />
      </el-header>
      <el-container>
        <AppSidebar :collapsed="sidebarCollapsed" @toggle="sidebarCollapsed = !sidebarCollapsed" />
        <el-main>
          <slot />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<!--template>




  <el-container class="admin-layout">
    <AppSidebar :collapsed="sidebarCollapsed" @toggle="sidebarCollapsed = !sidebarCollapsed" />

    <el-container>
      <AppHeader />

      <el-main>
        <slot />
      </el-main>
    </el-container>
  </el-container>
</template-->

<style scoped>
.admin-layout {
  height: 100vh;
}
</style>