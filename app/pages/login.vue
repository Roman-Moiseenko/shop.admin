<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import {useServices} from "~/composables/useServices";

definePageMeta({
  layout: 'login',
})
useSeoMeta({ title: 'Log In' })

const { auth: authService } = useServices()
const auth = useAuthStore()
const router = useRouter()
const form = ref<FormInstance>()
const msg = useMessage()

const state = reactive({
  email: '',
  password: '',
  remember: false,
})

const loginStatus = ref<'idle' | 'pending' | 'success' | 'error'>('idle')

async function onSubmit() {
  loginStatus.value = 'pending'
  const { data, error } = await authService.login(state)

  if (data.value) {
    await auth.login(data.value.token)
    await router.push('/')
    loginStatus.value = 'success'
  } else if (error.value) {
    const errData = error.value.data as any
    if (errData?.errors) {
      form.value?.setErrors(errData.errors)
    } else {
      msg.error(errData?.message || 'Ошибка входа')
    }
    loginStatus.value = 'error'
  }
}
</script>

<template>
  <el-card class="w-full max-w-md mx-auto my-20">
    <h1 class="text-3xl font-black mb-6 leading-tight tracking-tight">Log In</h1>
    <div class="space-y-4">
      <el-form ref="form" :model="state" @submit="onSubmit" class="space-y-4" label-width="auto">
        <el-form-item label="Email" prop="email" required>
          <el-input
              v-model="state.email"
              class="w-full"
              placeholder="you@example.com"
              icon="i-heroicons-envelope"
              trailing
              type="email"
              autofocus
          />
        </el-form-item>
        <el-form-item label="Password" prop="password" required>
          <el-input
              v-model="state.password"
              class="w-full"
              placeholder="Please input password"
              show-password
          />
        </el-form-item>
        <el-tooltip content="for 1 month" placement="top">
          <div class="inline-flex">
            <el-checkbox v-model="state.remember" label="Remember me" class="inline-flex"/>
          </div>
        </el-tooltip>

        <div class="flex items-center justify-end space-x-4">
          <el-button @click="onSubmit()" size="large" type="primary" class="w-full"
                     :disabled="loginStatus === 'pending'">
            Login
          </el-button>
        </div>
      </el-form>

    </div>
  </el-card>
</template>

<style scoped>

</style>