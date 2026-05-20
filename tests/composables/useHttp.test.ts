import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ref } from 'vue'
// @ts-ignore
import { useHttp } from '~/composables/useHttp'

vi.mock('nuxt/app', () => ({
    useFetch: vi.fn(),
    useCookie: vi.fn(),
    useRuntimeConfig: vi.fn(),
}))

import { useFetch, useCookie, useRuntimeConfig } from 'nuxt/app'
// @ts-ignore
const mockedUseFetch = useFetch as vi.MockedFunction<typeof useFetch>
// @ts-ignore
const mockedUseCookie = useCookie as vi.MockedFunction<typeof useCookie>
// @ts-ignore
const mockedUseRuntimeConfig = useRuntimeConfig as vi.MockedFunction<typeof useRuntimeConfig>
describe('useHttp', () => {
    beforeEach(() => {
        vi.clearAllMocks()
        mockedUseRuntimeConfig.mockReturnValue({
            public: { apiBase: '/api' }
        })
        mockedUseCookie.mockReturnValue(ref(null))
    })

    // @ts-ignore
    it('должен использовать baseURL из конфига', async () => {
        const http = useHttp()
        http.get('/products')

        expect(mockedUseFetch).toHaveBeenCalledWith('/products', expect.objectContaining({
            baseURL: '/api',
        }))
    })

    it('должен добавлять заголовок Authorization, если есть токен', () => {
        const token = 'abc123'
        mockedUseCookie.mockReturnValue(ref(token))

        const http = useHttp()
        http.get('/products')

        // Достаём переданные опции
        const callOpts = mockedUseFetch.mock.calls[0][1] as any
        // Вызываем onRequest вручную, чтобы проверить формирование заголовков
        const options: any = { headers: {} }
        callOpts.onRequest?.({ request: '/products', options })

        expect(options.headers.Authorization).toBe(`Bearer ${token}`)
    })

    it('должен устанавливать Accept и Content-Type по умолчанию', () => {
        const http = useHttp()
        http.post('/products', { name: 'Test' })

        const callOpts = mockedUseFetch.mock.calls[0][1] as any
        const options: any = { headers: {} }
        callOpts.onRequest?.({ request: '/products', options })

        expect(options.headers.Accept).toBe('application/json')
        expect(options.headers['Content-Type']).toBe('application/json')
    })

    it('не должен добавлять Content-Type для FormData', () => {
        const http = useHttp()
        const body = new FormData()
        http.post('/upload', body)

        const callOpts = mockedUseFetch.mock.calls[0][1] as any
        const options: any = { headers: {} }
        callOpts.onRequest?.({ request: '/upload', options })

        expect(options.headers['Content-Type']).toBeUndefined()
    })

    it('должен пробрасывать пользовательские хуки onRequest', () => {
        const onRequestSpy = vi.fn()
        const http = useHttp()
        http.get('/products', {}, { onRequest: onRequestSpy })

        const callOpts = mockedUseFetch.mock.calls[0][1] as any
        // Симулируем вызов onRequest
        callOpts.onRequest?.({ request: '/products', options: { headers: {} } })

        expect(onRequestSpy).toHaveBeenCalled()
    })

    it('должен корректно передавать метод и тело', () => {
        const http = useHttp()
        http.post('/orders', { id: 1 })

        expect(mockedUseFetch).toHaveBeenCalledWith('/orders', expect.objectContaining({
            method: 'POST',
            body: { id: 1 },
        }))
    })
})