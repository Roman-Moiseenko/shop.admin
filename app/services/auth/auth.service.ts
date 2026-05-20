import { useHttp } from '~/composables/useHttp'
import type { User, LoginRequest, LoginResponse } from '~/types'

/**
 * Auth system service: login, register, user, logout
 * Использует собственный http, т.к. пути не наследуют basePath
 */
export class AuthService {
    protected http = useHttp()
    /** POST /v1/auth/login */
    login(data: LoginRequest) {
        return this.http.post<LoginResponse>('/v1/auth/login', data)
    }

    /** GET /v1/auth/user */
    me() {
        return this.http.get<{ user: User }>('/v1/auth/user')
    }

    /** POST /v1/auth/logout */
    logout() {
        return this.http.post<void>('/v1/auth/logout')
    }

    /** POST /v1/auth/register */
    register(data: { email: string; password: string; remember?: boolean }) {
        return this.http.post<{ token: string }>('/v1/auth/register', data)
    }
}
