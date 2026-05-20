<script setup lang="ts">
import type { StaffBase, StaffUpdateRequest, RoleBase, StaffCreateUserRequest } from '~/types/auth'

definePageMeta({
  title: 'Редактирование сотрудника',
})

const { staff, role } = useServices()
const msg = useMessage()
const route = useRoute()
const router = useRouter()

const staffId = computed(() => Number(route.params.id))
const loading = ref(false)
const saving = ref(false)

// --- Форма сотрудника ---
const form = ref<StaffUpdateRequest>({
  lastName: '',
  firstName: '',
  middleName: '',
  position: '',
  department: '',
  workPhone: '',
  personalPhone: '',
  workEmail: '',
  hireDate: '',
  birthDate: '',
  telegramChatId: '',
  maxChatId: '',
  notes: '',
  terminated: false,
})

// --- Доступ к системе ---
const hasAccess = ref(false)
const userForm = ref<StaffCreateUserRequest>({
  active: true,
  email: '',
  password: '',
  roleNames: [],
})

const roles = ref<RoleBase[]>([])
const roleLoading = ref(false)

// Валидация
const formRules: Record<string, any> = {
  lastName: [{ required: true, message: 'Фамилия обязательна', trigger: 'blur' }],
  firstName: [{ required: true, message: 'Имя обязательно', trigger: 'blur' }],
  position: [{ required: true, message: 'Должность обязательна', trigger: 'blur' }],
}

const userFormRef = ref<InstanceType<typeof ElForm> | null>(null)
const formRef = ref<InstanceType<typeof ElForm> | null>(null)

// --- Загрузка данных ---
async function loadStaff() {
  loading.value = true
  try {
    const { data } = await staff.show(staffId.value)
    if (data.value) {
      const s = data.value as StaffBase
      form.value = {
        lastName: s.lastName,
        firstName: s.firstName,
        middleName: s.middleName || '',
        position: s.position || '',
        department: s.department || '',
        workPhone: s.workPhone || '',
        personalPhone: s.personalPhone || '',
        workEmail: s.workEmail || '',
        hireDate: s.hireDate || '',
        birthDate: s.birthDate || '',
        telegramChatId: s.telegramChatId || '',
        maxChatId: s.maxChatId || '',
        notes: s.notes || '',
        terminated: s.terminated,
      }
    }
  } catch {
    msg.error('Ошибка загрузки данных сотрудника')
  } finally {
    loading.value = false
  }
}

async function loadRoles() {
  roleLoading.value = true
  try {
    const { data } = await role.indexByType('user')
    if (data.value) {
      roles.value = data.value
    }
  } catch {
    msg.error('Ошибка загрузки ролей')
  } finally {
    roleLoading.value = false
  }
}

// --- Сохранение сотрудника ---
async function handleSave() {
  const valid = await formRef.value?.validate().catch(() => false)
  if (!valid) return

  // Если доступ предоставлен, валидируем форму пользователя
  if (hasAccess.value) {
    const userValid = await userFormRef.value?.validate().catch(() => false)
    if (!userValid) return
  }

  saving.value = true
  try {
    // Сначала обновляем данные сотрудника
    await staff.update(staffId.value, form.value)

    // Затем обрабатываем доступ к системе
    await staff.createUser(staffId.value, {
      active: hasAccess.value,
      email: userForm.value.email,
      password: userForm.value.password,
      roleNames: hasAccess.value ? userForm.value.roleNames : [],
    })

    msg.success('Сотрудник сохранён')
  } catch {
    msg.error('Ошибка при сохранении')
  } finally {
    saving.value = false
  }
}

// --- Удаление ---
async function handleDelete() {
  try {
    await ElMessageBox.confirm('Вы уверены, что хотите удалить сотрудника?', 'Подтверждение', {
      type: 'warning',
      confirmButtonText: 'Удалить',
      cancelButtonText: 'Отмена',
    })
    await staff.delete(staffId.value)
    msg.success('Сотрудник удалён')
    router.push('/auth/staff')
  } catch {
    // Пользователь отменил или ошибка
  }
}

onMounted(() => {
  loadStaff()
  loadRoles()
})
</script>

<template>
  <div class="space-y-6">
    <!-- Шапка -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-4">
        <el-button @click="router.back()" text>
          <font-awesome :icon="['fas', 'arrow-left']" />
        </el-button>
        <h1 class="text-2xl font-bold">
          Редактирование сотрудника
        </h1>
      </div>
      <el-button type="danger" plain @click="handleDelete">
        <font-awesome :icon="['fas', 'trash']" class="mr-1" />
        Удалить
      </el-button>
    </div>

    <el-card v-loading="loading">
      <el-form
        ref="formRef"
        :model="form"
        :rules="formRules"
        label-width="200px"
        label-position="left"
      >
        <el-divider content-position="left">Основная информация</el-divider>

        <el-form-item label="Фамилия" prop="lastName">
          <el-input v-model="form.lastName" placeholder="Иванов" />
        </el-form-item>

        <el-form-item label="Имя" prop="firstName">
          <el-input v-model="form.firstName" placeholder="Иван" />
        </el-form-item>

        <el-form-item label="Отчество" prop="middleName">
          <el-input v-model="form.middleName" placeholder="Иванович" />
        </el-form-item>

        <el-form-item label="Должность" prop="position">
          <el-input v-model="form.position" placeholder="Менеджер" />
        </el-form-item>

        <el-divider content-position="left">Контакты</el-divider>

        <el-form-item label="Рабочий email" prop="workEmail">
          <el-input v-model="form.workEmail" placeholder="ivanov@company.ru" />
        </el-form-item>

        <el-form-item label="Рабочий телефон" prop="workPhone">
          <el-input v-model="form.workPhone" placeholder="+7 (999) 123-45-67" />
        </el-form-item>

        <el-form-item label="Личный телефон" prop="personalPhone">
          <el-input v-model="form.personalPhone" placeholder="+7 (999) 123-45-67" />
        </el-form-item>

        <el-divider content-position="left">Дополнительно</el-divider>

        <el-form-item label="Отдел" prop="department">
          <el-input v-model="form.department" placeholder="Отдел продаж" />
        </el-form-item>

        <el-form-item label="Дата приёма" prop="hireDate">
          <el-date-picker
            v-model="form.hireDate"
            type="date"
            placeholder="Выберите дату"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
            style="width: 100%"
          />
        </el-form-item>

        <el-form-item label="Дата рождения" prop="birthDate">
          <el-date-picker
            v-model="form.birthDate"
            type="date"
            placeholder="Выберите дату"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
            style="width: 100%"
          />
        </el-form-item>

        <el-form-item label="Telegram Chat ID" prop="telegramChatId">
          <el-input v-model="form.telegramChatId" placeholder="123456789" />
        </el-form-item>

        <el-form-item label="Max Chat ID" prop="maxChatId">
          <el-input v-model="form.maxChatId" placeholder="987654321" />
        </el-form-item>

        <el-form-item label="Заметки" prop="notes">
          <el-input
            v-model="form.notes"
            type="textarea"
            :rows="3"
            placeholder="Дополнительная информация"
          />
        </el-form-item>

        <el-form-item label="Статус">
          <el-switch
            v-model="form.terminated"
            active-text="Уволен"
            inactive-text="Активен"
            inline-prompt
          />
        </el-form-item>

        <el-divider content-position="left">Доступ к системе</el-divider>

        <!-- Доступ к системе -->
        <el-form-item label="Предоставить доступ">
          <el-switch
            v-model="hasAccess"
            active-text="Доступ предоставлен"
            inactive-text="Нет доступа"
            inline-prompt
          />
        </el-form-item>

        <template v-if="hasAccess">
          <el-form
            ref="userFormRef"
            :model="userForm"
            label-width="200px"
            label-position="left"
          >
            <el-form-item
              label="Email"
              prop="email"
              :rules="[
                { required: true, message: 'Email обязателен', trigger: 'blur' },
                { type: 'email', message: 'Некорректный email', trigger: 'blur' },
              ]"
            >
              <el-input v-model="userForm.email" placeholder="ivanov@company.ru" />
            </el-form-item>

            <el-form-item
              label="Пароль"
              prop="password"
              :rules="[
                { required: true, message: 'Пароль обязателен', trigger: 'blur' },
                { min: 6, message: 'Минимум 6 символов', trigger: 'blur' },
              ]"
            >
              <el-input
                v-model="userForm.password"
                type="password"
                show-password
                placeholder="Минимум 6 символов"
              />
            </el-form-item>

            <el-form-item
              label="Роли"
              prop="roleNames"
              :rules="[
                { required: true, message: 'Выберите хотя бы одну роль', trigger: 'change' },
              ]"
            >
              <el-select
                v-model="userForm.roleNames"
                multiple
                placeholder="Выберите роли"
                style="width: 100%"
                :loading="roleLoading"
              >
                <el-option
                  v-for="r in roles"
                  :key="r.name"
                  :label="r.description || r.name"
                  :value="r.name"
                >
                  <span>{{ r.description || r.name }}</span>
                  <span class="text-gray-400 text-xs ml-2">({{ r.name }})</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </template>

        <!-- Кнопки -->
        <el-form-item>
          <el-button type="primary" :loading="saving" @click="handleSave">
            <font-awesome :icon="['fas', 'floppy-disk']" class="mr-1" />
            Сохранить
          </el-button>
          <el-button @click="router.back()">Отмена</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
