<script setup lang="ts">
import type { StaffBase } from '~/types/auth'

definePageMeta({
  title: 'Сотрудники',
})

const { staff } = useServices()
const msg = useMessage()

const searchTerm = ref('')
const loading = ref(false)
const staffList = ref<StaffBase[]>([])
const pagination = ref({ currentPage: 1, lastPage: 1, total: 0 })

async function loadData(page = 1) {
  loading.value = true
  try {
    const { data } = await staff.index({ page, per_page: 15 })
    if (data.value) {
      staffList.value = data.value.data
      pagination.value = {
        currentPage: data.value.meta.current_page,
        lastPage: data.value.meta.last_page,
        total: data.value.meta.total,
      }
    }
  } catch {
    msg.error('Ошибка загрузки сотрудников')
  } finally {
    loading.value = false
  }
}

async function deleteStaff(id: number) {
  try {
    await staff.delete(id)
    msg.success('Сотрудник удалён')
    await loadData(pagination.value.currentPage)
  } catch {
    msg.error('Ошибка удаления')
  }
}

// Фильтр по поиску (если API поддерживает)
const filteredList = computed(() => {
  if (!searchTerm.value) return staffList.value
  const term = searchTerm.value.toLowerCase()
  return staffList.value.filter(
    (s) =>
      s.lastName.toLowerCase().includes(term) ||
      s.firstName.toLowerCase().includes(term) ||
      s.position?.toLowerCase().includes(term)
  )
})

onMounted(() => loadData())
</script>

<template>
  <div class="space-y-4">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold">Сотрудники</h1>
      <el-button type="primary" @click="navigateTo('/auth/staff/create')">
        Добавить сотрудника
      </el-button>
    </div>

    <!-- Поиск -->
    <el-input
      v-model="searchTerm"
      placeholder="Поиск по имени, фамилии или должности"
      clearable
      class="max-w-md"
    />

    <!-- Таблица -->
    <el-table
      v-loading="loading"
      :data="filteredList"
      stripe
      style="width: 100%"
    >
      <el-table-column prop="id" label="ID" width="60" />
      <el-table-column label="ФИО" min-width="200">
        <template #default="{ row }">
          {{ row.lastName }} {{ row.firstName }} {{ row.middleName || '' }}
</template>
      </el-table-column>
      <el-table-column prop="position" label="Должность" min-width="150" />
      <el-table-column prop="workEmail" label="Email" min-width="180" />
      <el-table-column prop="workPhone" label="Телефон" width="140" />
      <el-table-column prop="department" label="Отдел" width="120" />
      <el-table-column label="Статус" width="100">
        <template #default="{ row }">
          <el-tag :type="row.terminated ? 'danger' : 'success'" size="small">
            {{ row.terminated ? 'Уволен' : 'Активен' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Действия" width="200" fixed="right">
        <template #default="{ row }">
          <el-button size="small" @click="navigateTo(`/auth/staff/${row.id}`)">
            Просмотр
          </el-button>
          <el-button
            size="small"
            type="danger"
            @click="deleteStaff(row.id)"
          >
            Удалить
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- Пагинация -->
    <div class="flex justify-center">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="pagination.total"
        :page-size="15"
        @current-change="loadData"
      />
    </div>
  </div>
</template>

<style scoped>

</style>