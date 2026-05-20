<script setup lang="ts">
import type { StaffCreateRequest } from '~/types/auth'

definePageMeta({
  title: 'Добавление сотрудника',
})

const { staff } = useServices()
const msg = useMessage()
const router = useRouter()

const form = ref<StaffCreateRequest>({
  lastName: '',
  firstName: '',
  middleName: '',
  position: '',
})

const rules: Record<string, any> = {
  lastName: [{ required: true, message: 'Фамилия обязательна', trigger: 'blur' }],
  firstName: [{ required: true, message: 'Имя обязательно', trigger: 'blur' }],
  position: [{ required: true, message: 'Должность обязательна', trigger: 'blur' }],
}

const formRef = ref<InstanceType<typeof ElForm> | null>(null)
const loading = ref(false)

async function handleSubmit() {
  const valid = await formRef.value?.validate().catch(() => false)
  if (!valid) return

  loading.value = true
  try {
    const { data } = await staff.create(form.value)
    if (data.value) {
      msg.success('Сотрудник добавлен')
      router.push(`/auth/staff/${data.value.id}`)
    }
  } catch {
    msg.error('Ошибка при создании сотрудника')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center gap-4">
      <el-button @click="router.back()" text>
        <font-awesome :icon="['fas', 'arrow-left']" />
      </el-button>
      <h1 class="text-2xl font-bold">Добавление сотрудника</h1>
    </div>

    <el-card>
      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-width="180px"
        label-position="left"
        @submit.prevent="handleSubmit"
      >
        <el-form-item label="Фамилия" prop="lastName">
          <el-input v-model="form.lastName" placeholder="Иванов" />
        </el-form-item>

        <el-form-item label="Имя" prop="firstName">
          <el-input v-model="form.firstName" placeholder="Иван" />
        </el-form-item>

        <el-form-item label="Отчество" prop="middleName">
          <el-input v-model="form.middleName" placeholder="Иванович (необязательно)" />
        </el-form-item>

        <el-form-item label="Должность" prop="position">
          <el-input v-model="form.position" placeholder="Менеджер" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" :loading="loading" @click="handleSubmit">
            Сохранить
          </el-button>
          <el-button @click="router.back()">Отмена</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
