<script setup lang="ts">
import type { RoleBase } from '~/types/auth'

definePageMeta({
  title: 'Роли',
})

const { role } = useServices()
const msg = useMessage()

const loading = ref(false)
const roleList = ref<RoleBase[]>([])

async function loadData() {
  loading.value = true
  try {
    const { data } = await role.indexByType('user')
    if (data.value) {
      roleList.value = data.value
    }
  } catch {
    msg.error('Ошибка загрузки ролей')
  } finally {
    loading.value = false
  }
}

function navigateToRole(id: number) {
  navigateTo(`/auth/role/${id}`)
}

function navigateToCreate() {
  navigateTo('/auth/role/create')
}

async function deleteRole(id: number) {
  try {
    await role.delete(id)
    msg.success('Роль удалена')
    await loadData()
  } catch {
    msg.error('Ошибка удаления')
  }
}

onMounted(() => loadData())
</script>

<template>
  <div class="space-y-4">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold">Роли</h1>
      <el-button type="primary" @click="navigateToCreate">
        Добавить роль
      </el-button>
    </div>

    <!-- Таблица -->
    <el-table
      v-loading="loading"
      :data="roleList"
      stripe
      style="width: 100%"
      @row-click="(row: any) => navigateToRole(row.id)"
      highlight-current-row
    >
      <el-table-column prop="id" label="ID" width="60" />
      <el-table-column prop="name" label="Название" min-width="200" />
      <el-table-column label="Доступы" min-width="300">
        <template #default="{ row }">
          <div class="flex flex-wrap gap-1">
            <el-tag
              v-for="perm in row.permissions"
              :key="perm"
              size="small"
              type="info"
            >
              {{ perm }}
            </el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Действия" width="150" fixed="right">
        <template #default="{ row }">
          <el-button
            size="small"
            type="danger"
            @click.stop="deleteRole(row.id)"
          >
            Удалить
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style scoped>
.el-table ::v-deep(.el-table__row) {
  cursor: pointer;
}
</style>
