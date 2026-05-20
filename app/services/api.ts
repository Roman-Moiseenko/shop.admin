import { useHttp } from '~/composables/useHttp'
import type { UseFetchOptions } from 'nuxt/app'
import type { PaginatedResponse, PaginationParams } from '~/types'

/**
 * Generic API service with CRUD operations.
 *
 * ВАЖНО: не создавайте экземпляры на уровне модуля!
 * useHttp() работает только внутри setup-контекста (composables, setup()).
 * Используйте фабрику useServices() в composables/useServices.ts.
 */
export class ApiService<T = any> {
    constructor(
        protected basePath: string,
        protected http = useHttp<T>()
    ) {}

    /** GET /{basePath} — paginated list */
    index(params?: PaginationParams & Record<string, any>, opts?: UseFetchOptions<PaginatedResponse<T>>) {
        return this.http.get<PaginatedResponse<T>>(this.basePath, params, opts)
    }

    /** GET /{basePath}/{id} — single item */
    show(id: number | string, opts?: UseFetchOptions<T>) {
        return this.http.get<T>(`${this.basePath}/${id}`, undefined, opts)
    }

    /** POST /{basePath} — create item */
    create(body: Partial<T> | FormData, opts?: UseFetchOptions<T>) {
        return this.http.post<T>(this.basePath, body, opts)
    }

    /** PUT /{basePath}/{id} — update item */
    update(id: number | string, body: Partial<T> | FormData, opts?: UseFetchOptions<T>) {
        return this.http.put<T>(`${this.basePath}/${id}`, body, opts)
    }

    /** DELETE /{basePath}/{id} — delete item */
    delete(id: number | string, opts?: UseFetchOptions<void>) {
        return this.http.delete<void>(`${this.basePath}/${id}`, opts)
    }

    /** Custom POST request to a sub-path */
    post<U = any>(path: string, body?: any, opts?: UseFetchOptions<U>) {
        return this.http.post<U>(`${this.basePath}/${path}`, body, opts)
    }

    /** Custom GET request to a sub-path */
    get<U = any>(path: string, params?: Record<string, any>, opts?: UseFetchOptions<U>) {
        return this.http.get<U>(`${this.basePath}/${path}`, params, opts)
    }

    /** Custom PUT request to a sub-path */
    put<U = any>(path: string, body?: any, opts?: UseFetchOptions<U>) {
        return this.http.put<U>(`${this.basePath}/${path}`, body, opts)
    }

    /** Custom DELETE request to a sub-path */
    deleteReq<U = any>(path: string, opts?: UseFetchOptions<U>) {
        return this.http.delete<U>(`${this.basePath}/${path}`, opts)
    }

    /** Custom PATCH request to a sub-path */
    patch<U = any>(path: string, body?: any, opts?: UseFetchOptions<U>) {
        return this.http.patch<U>(`${this.basePath}/${path}`, body, opts)
    }
}
