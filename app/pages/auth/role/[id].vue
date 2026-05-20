<script setup lang="ts">
import type { RoleBase, PermissionGroup, RoleCreateRequest, RoleUpdateRequest } from '~/types/auth'

definePageMeta({
  title: 'Роль / Редактирование',
})

const route = useRoute()
const { role } = useServices()
const msg = useMessage()

const isCreate = computed(() => route.params.id === 'create')

const loading = ref(false)
const saving = ref(false)
const roleName = ref('')
const selectedPermissions = ref<Set<string>>(new Set())
const originalRoleName = ref('')
const originalPermissions = ref<Set<string>>(new Set())
const permissionGroups = ref<PermissionGroup[]>([])
const activeGroups = ref<string[]>([])

const hasChanges = computed(() => {
  if (isCreate.value) return true
  return (
    roleName.value !== originalRoleName.value ||
    !setsEqual(selectedPermissions.value, originalPermissions.value)
  )
})

function setsEqual(a: Set<string>, b: Set<string>) {
  if (a.size !== b.size) return false
  for (const item of a) {
    if (!b.has(item)) return false
  }
  return true
}

function togglePermission(perm: string) {
  if (selectedPermissions.value.has(perm)) {
    selectedPermissions.value.delete(perm)
  } else {
    selectedPermissions.value.add(perm)
  }
}

function resetForm() {
  roleName.value = originalRoleName.value
  selectedPermissions.value = new Set(originalPermissions.value)
}

function getPermissionLabel(permKey: string): string {
  const parts = permKey.split('.')
  return permKey //parts[parts.length - 1] - не исправлять, пока так.
}

async function loadRole() {
  if (isCreate.value) return
  loading.value = true
  try {
    const { data } = await role.show(route.params.id as string)
    if (data.value) {
      const roleData = data.value as RoleBase
      roleName.value = roleData.name
      originalRoleName.value = roleData.name
      selectedPermissions.value = new Set(roleData.permissions)
      originalPermissions.value = new Set(roleData.permissions)
    }
  } catch {
    msg.error('Ошибка загрузки роли')
  } finally {
    loading.value = false
  }
}

async function loadPermissions() {
  try {
    const { data } = await role.getPermissionsGrouped()
    if (data.value) {
      permissionGroups.value = data.value
    }
  } catch {
    msg.error('Ошибка загрузки доступов')
  }
}

async function saveRole() {
  saving.value = true
  try {
    const permissions = Array.from(selectedPermissions.value)
    if (isCreate.value) {
      const body: RoleCreateRequest = {
        name: roleName.value,
        permissions,
      }
      const { data } = await role.create(body)
      if (data.value) {
        msg.success('Роль создана')
        const createdRole = data.value as RoleBase
        navigateTo('/auth/role/' + createdRole.id)
      }
    } else {
      const body: RoleUpdateRequest = {
        name: roleName.value,
        permissions,
      }
      await role.update(route.params.id as string, body)
      msg.success('Роль обновлена')
      originalRoleName.value = roleName.value
      originalPermissions.value = new Set(selectedPermissions.value)
    }
  } catch {
    msg.error('Ошибка сохранения')
  } finally {
    saving.value = false
  }
}

onMounted(() => {
  loadPermissions()
  loadRole()
})
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold">
        {{ isCreate ? 'Создание роли' : 'Редактирование роли' }}
      </h1>
    </div>

    <div v-loading="loading" class="space-y-6">
      <el-card>
        <template #header>
          <span class="font-semibold">Основная информация</span>
        </template>
        <el-form label-width="120px">
          <el-form-item label="Название">
            <el-input
              v-model="roleName"
              placeholder="Введите название роли"
              :disabled="saving"
              class="max-w-md"
            />
          </el-form-item>
        </el-form>
      </el-card>

      <el-card>
        <template #header>
          <span class="font-semibold">Доступы</span>
        </template>

        <div v-if="permissionGroups.length === 0 && !loading" class="text-gray-400">
          Нет доступов для отображения
        </div>

        <el-collapse v-model="activeGroups" v-else>
          <el-collapse-item
            v-for="group in permissionGroups"
            :key="group.role"
            :name="group.role"
          >
            <template #title>
              <span class="font-medium">{{ group.description }}</span>
              <span class="text-xs text-gray-400 ml-2">
                ({{ group.permissions.filter(p => selectedPermissions.has(p)).length }} / {{ group.permissions.length }})
              </span>
            </template>

            <div class="space-y-1 py-1">
              <div
                v-for="permKey in group.permissions"
                :key="permKey"
                class="flex items-center gap-2 py-1"
              >
                <el-checkbox
                  :model-value="selectedPermissions.has(permKey)"
                  :disabled="saving"
                  @change="togglePermission(permKey)"
                >
                  <span class="text-sm">{{ getPermissionLabel(permKey) }}</span>
                </el-checkbox>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-card>

      <div v-if="!isCreate && hasChanges" class="flex gap-3">
        <el-button @click="resetForm" :disabled="saving">Отмена</el-button>
        <el-button type="primary" :loading="saving" @click="saveRole">Сохранить</el-button>
      </div>

      <div v-if="isCreate" class="flex gap-3">
        <el-button @click="navigateTo('/auth/role')" :disabled="saving">Назад</el-button>
        <el-button type="primary" :loading="saving" @click="saveRole">Создать</el-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.el-checkbox {
  margin-right: 0;
}
</style>
