import { useFetch, useCookie, useRuntimeConfig } from 'nuxt/app'
import type { UseFetchOptions } from 'nuxt/app'

export function useHttp<T = unknown>() {
    const config = useRuntimeConfig()
    const tokenCookie = useCookie<string | null>('token')
    const apiBase = config.public.apiBase as string

    function request<U = T>(
        url: string | (() => string),
        opts?: UseFetchOptions<U>
    ) {
        return useFetch<U>(url, {
            baseURL: apiBase,
            credentials: 'include',
            ...opts,
            onRequest(ctx: any) {
                const { request, options } = ctx
                const headers: Record<string, string> = {
                    Accept: 'application/json',
                }
                if (opts?.body && !(opts.body instanceof FormData)) {
                    headers['Content-Type'] = 'application/json'
                }
                if (tokenCookie.value) {
                    headers.Authorization = `Bearer ${tokenCookie.value}`
                }
                options.headers = { ...headers, ...options.headers }
                if (opts?.onRequest) {
                    (opts.onRequest as any)({ request, options })
                }
            },
            onRequestError(ctx: any) {
                if (opts?.onRequestError) {
                    (opts.onRequestError as any)(ctx)
                }
            },
            onResponse(ctx: any) {
                if (opts?.onResponse) {
                    (opts.onResponse as any)(ctx)
                }
            },
            onResponseError(ctx: any) {
                if (opts?.onResponseError) {
                    (opts.onResponseError as any)(ctx)
                }
            },
        } as any)
    }

    return {
        get<U = T>(url: string | (() => string), params?: Record<string, any>, opts?: UseFetchOptions<U>) {
            return request<U>(url, { method: 'GET', params, ...opts })
        },
        post<U = T>(url: string | (() => string), body?: any, opts?: UseFetchOptions<U>) {
            return request<U>(url, { method: 'POST', body, ...opts })
        },
        put<U = T>(url: string | (() => string), body?: any, opts?: UseFetchOptions<U>) {
            return request<U>(url, { method: 'PUT', body, ...opts })
        },
        patch<U = T>(url: string | (() => string), body?: any, opts?: UseFetchOptions<U>) {
            return request<U>(url, { method: 'PATCH', body, ...opts })
        },
        delete<U = T>(url: string | (() => string), opts?: UseFetchOptions<U>) {
            return request<U>(url, { method: 'DELETE', ...opts })
        },
        request,
    }
}