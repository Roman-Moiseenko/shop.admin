// ========================================================================
// Core API types & DTOs
// ========================================================================

// ---- Pagination ----
export interface PaginatedResponse<T> {
    data: T[]
    meta: {
        current_page: number
        last_page: number
        per_page: number
        total: number
    }
}

export interface PaginationParams {
    page?: number
    per_page?: number
    sort?: string
    direction?: 'asc' | 'desc'
}

// ---- API Error ----
export interface ApiError {
    message: string
    errors?: Record<string, string[]>
    status?: number
}

// ---- User / Auth ----
export interface User {
    id: number
    ulid: string
    firstName: string | null
    lastName: string | null
    middleName: string | null
    email: string | null
    avatar: string | null
    roles: string[]
    permissions: string[]
    isActive: boolean
}

export interface LoginRequest {
    email: string
    password: string
    remember?: boolean
}

export interface LoginResponse {
    token: string
    user: User
}
