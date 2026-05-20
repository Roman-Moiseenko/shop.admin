// tests/stores/auth.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ref } from 'vue'
import { setActivePinia, createPinia } from 'pinia'
import { useAuthStore } from '~/stores/auth'

// Моки Nuxt-зависимостей
vi.mock('nuxt/app', () => ({
    useRuntimeConfig: vi.fn(),
    useCookie: vi.fn(),
    navigateTo: vi.fn(),
}))

// Глобальный мок $fetch (используется в сторе напрямую)
const mockFetch = vi.fn()
globalThis.$fetch = mockFetch

import { useRuntimeConfig, useCookie, navigateTo } from 'nuxt/app'

const mockedUseRuntimeConfig = useRuntimeConfig as vi.MockedFunction<typeof useRuntimeConfig>
const mockedUseCookie = useCookie as vi.MockedFunction<typeof useCookie>
const mockedNavigateTo = navigateTo as vi.MockedFunction<typeof navigateTo>

// Вспомогательная функция для создания тестового стора
function createTestStore() {
    // Создаём новый экземпляр Pinia для изоляции тестов
    const pinia = createPinia()
    setActivePinia(pinia)
    return useAuthStore()
}

describe('useAuthStore', () => {
    // Реактивная переменная, которую будет возвращать замоканный useCookie
    let tokenRef: ReturnType<typeof ref>

    beforeEach(() => {
        // Сбрасываем моки и устанавливаем значения по умолчанию
        vi.clearAllMocks()
        mockFetch.mockReset()

        // Кука по умолчанию пустая
        tokenRef = ref<string | null>(null)

        // useCookie возвращает tokenRef (имитация реактивной куки)
        mockedUseCookie.mockReturnValue(tokenRef as any)

        // useRuntimeConfig возвращает тестовый конфиг
        mockedUseRuntimeConfig.mockReturnValue({
            public: { apiBase: '/api' }
        })

        // navigateTo по умолчанию ничего не делает
        mockedNavigateTo.mockImplementation(() => {})
    })

    it('начальное состояние: пользователь не авторизован', () => {
        const store = createTestStore()
        expect(store.logged).toBe(false)
        expect(store.token).toBe(null)
        expect(store.user).toEqual({
            ulid: null,
            name: null,
            email: null,
            avatar: null,
            roles: [],
            providers: [],
            permissions: []
        })
    })

    describe('fetchUser', () => {
        it('успешная загрузка пользователя', async () => {
            const store = createTestStore()
            // Устанавливаем токен, чтобы запрос был авторизованным
            tokenRef.value = 'valid_token'

            const mockUser = {
                ulid: '01H...',
                name: 'Admin',
                email: 'admin@example.com',
                avatar: null,
                roles: ['admin'],
                providers: [],
                permissions: ['catalog.view']
            }
            mockFetch.mockResolvedValueOnce({ user: mockUser })

            await store.fetchUser()

            expect(mockFetch).toHaveBeenCalledWith('/v1/auth/user', {
                baseURL: '/api',
                headers: { Authorization: 'Bearer valid_token' }
            })
            expect(store.user).toEqual(mockUser)
        })

        it('ошибка загрузки пользователя сбрасывает состояние', async () => {
            const store = createTestStore()
            tokenRef.value = 'invalid_token'
            mockFetch.mockRejectedValueOnce(new Error('401'))

            await expect(store.fetchUser()).rejects.toThrow('Ошибка получения пользователя')

            // После ошибки должен вызваться reset
            expect(tokenRef.value).toBeNull()
            expect(store.user.ulid).toBeNull()
            expect(store.user.name).toBeNull()
        })

        it('отправляет запрос без токена, если кука пуста', async () => {
            const store = createTestStore()
            mockFetch.mockResolvedValueOnce({ user: {} })

            await store.fetchUser()

            expect(mockFetch).toHaveBeenCalledWith('/v1/auth/user', {
                baseURL: '/api',
                headers: {}  // без Authorization
            })
        })
    })

    describe('login', () => {
        it('сохраняет токен в куку и загружает пользователя', async () => {
            const store = createTestStore()
            const mockUser = { ulid: '01H...', name: 'Test', email: 'test@test.com', avatar: null, roles: [], providers: [], permissions: [] }
            mockFetch.mockResolvedValueOnce({ user: mockUser })

            await store.login('new_token')

            // Должен установить куку
            expect(tokenRef.value).toBe('new_token')

            // Должен вызвать fetchUser (уже внутри login) -> $fetch
            expect(mockFetch).toHaveBeenCalledWith('/v1/auth/user', {
                baseURL: '/api',
                headers: { Authorization: 'Bearer new_token' }
            })

            // Пользователь загружен
            expect(store.user).toEqual(mockUser)
            expect(store.logged).toBe(true)
        })
    })

    describe('logout', () => {
        it('вызывает API logout и очищает состояние', async () => {
            const store = createTestStore()
            tokenRef.value = 'valid_token'
            mockFetch.mockResolvedValueOnce({}) // успешный логаут

            await store.logout()

            // API logout вызван с правильными параметрами
            expect(mockFetch).toHaveBeenCalledWith('/v1/auth/logout', {
                baseURL: '/api',
                method: 'POST',
                headers: { Authorization: 'Bearer valid_token' }
            })

            // Состояние сброшено
            expect(tokenRef.value).toBeNull()
            expect(store.user.ulid).toBeNull()

            // Редирект на страницу логина
            expect(navigateTo).toHaveBeenCalledWith('/login')
        })

        it('даже при ошибке API очищает состояние и редиректит', async () => {
            const store = createTestStore()
            tokenRef.value = 'valid_token'
            mockFetch.mockRejectedValueOnce(new Error('Network error'))

            await store.logout() // не должен бросать исключение

            // Состояние всё равно сброшено
            expect(tokenRef.value).toBeNull()
            expect(store.user.ulid).toBeNull()
            expect(navigateTo).toHaveBeenCalledWith('/login')
        })
    })

    describe('reset', () => {
        it('очищает токен и пользователя', () => {
            const store = createTestStore()
            // Симулируем залогиненное состояние
            tokenRef.value = 'some_token'
            store.user = {
                ulid: '123',
                name: 'User',
                email: 'user@example.com',
                avatar: null,
                roles: ['user'],
                providers: [],
                permissions: []
            }

            store.reset()

            expect(tokenRef.value).toBeNull()
            expect(store.user).toEqual({
                ulid: null,
                name: null,
                email: null,
                avatar: null,
                roles: [],
                providers: [],
                permissions: []
            })
        })
    })

    describe('hasRole', () => {
        it('возвращает true, если роль присутствует', () => {
            const store = createTestStore()
            store.user = { ...store.user, roles: ['admin', 'editor'] }
            expect(store.hasRole('admin')).toBe(true)
        })
        it('возвращает false, если роли нет', () => {
            const store = createTestStore()
            store.user = { ...store.user, roles: [] }
            expect(store.hasRole('admin')).toBe(false)
        })
    })

    describe('can', () => {
        it('возвращает true, если право есть', () => {
            const store = createTestStore()
            store.user = { ...store.user, permissions: ['catalog.view'] }
            expect(store.can('catalog.view')).toBe(true)
        })
        it('возвращает false, если права нет', () => {
            const store = createTestStore()
            store.user = { ...store.user, permissions: [] }
            expect(store.can('catalog.view')).toBe(false)
        })
    })
})