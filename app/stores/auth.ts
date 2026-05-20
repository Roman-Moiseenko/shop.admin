import { defineStore } from 'pinia'
import { useRuntimeConfig, useCookie, navigateTo } from 'nuxt/app'
import { computed, ref } from 'vue'
import { useHttp } from '~/composables/useHttp'
import type { User } from '~/types'

export type { User }
export const useAuthStore = defineStore('auth', () => {
    const config = useRuntimeConfig()
    const apiBase = config.public.apiBase as string
    const tokenCookie = useCookie<string | null>('token', {
        path: '/',
        sameSite: 'lax',      // разрешить отправку при переходах внутри сайта
        secure: false,         // для localhost по HTTP
        httpOnly: false,       // чтобы JavaScript мог читать и писать
        maxAge: 60 * 60 * 24 * 365,
        default: () => null,   // начальное значение
        watch: true,           // отслеживать изменения
    })
    const isLogged = computed(() => !!tokenCookie.value)

    const getInitialState = () => (<User><unknown>{
        id: null,
        ulid: null,
        firstName: null,
        lastName: null,
        middleName: null,
        email: null,
        avatar: null,
        roles: [],
        permissions: [],
        isActive: false,
    })
    const user = ref<User>(getInitialState())

    const http = useHttp()

    async function fetchUser() {
        try {
            const { data } = await http.get<{ user: User }>('/v1/auth/user')
            if (data.value) {
                user.value = data.value.user
            }
        } catch {
            throw new Error('Ошибка получения пользователя')
        }
    }

    async function login(token: string) {
        tokenCookie.value = token
        await fetchUser()
    }

    async function logout() {
        try {
            await http.post<void>('/v1/auth/logout')
        } catch { /* игнорируем */ }
        reset()
        navigateTo('/login')
    }

    /**
     * Сброс состояния (без редиректа)
     */
    function reset(): void {
        tokenCookie.value = null
        user.value = getInitialState()
    }

    /**
     * Проверка роли
     */
    function hasRole(role: string): boolean {
        return user.value?.roles?.includes(role) ?? false
    }

    /**
     * Проверка права
     */
    function can(permission: string): boolean {
        return user.value?.permissions?.includes(permission) ?? false
    }

    return { user, token: tokenCookie, logged: isLogged, login, logout, fetchUser, reset, hasRole, can }
})
