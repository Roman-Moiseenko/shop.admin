import { ApiService } from '~/services/api'
import type {
    ClientBase,
    ClientCreateRequest,
    ClientUpdateRequest,
    ClientCredentialsRequest,
    ClientRegistrationRequest,
    ClientProfileUpdateRequest,
} from '~/types/auth'

/**
 * Client management service
 *
 * GET    /v1/auth/client              — index
 * POST   /v1/auth/client              — create
 * GET    /v1/auth/client/:id          — show
 * PUT    /v1/auth/client/:id          — update
 * DELETE /v1/auth/client/:id          — delete
 * POST   /v1/auth/client/:id/register — register (create user account)
 * GET    /v1/auth/client/profile      — get own profile
 * PUT    /v1/auth/client/profile      — update own profile
 * POST   /v1/auth/client/credentials  — change email/password
 * POST   /v1/auth/client/registration — public registration
 */
export class ClientService extends ApiService<ClientBase> {
    constructor() {
        super('/v1/auth/client')
    }

    /** POST /v1/auth/client/:id/register — register client (admin creates user account) */
    register(clientId: number, data: { password: string }) {
        return this.post(`${clientId}/register`, data)
    }

    /** GET /v1/auth/client/profile — get own profile */
    profile() {
        return this.get<ClientBase>('profile')
    }

    /** PUT /v1/auth/client/profile — update own profile */
    updateProfile(data: ClientProfileUpdateRequest) {
        return this.put<ClientBase>('profile', data)
    }

    /** POST /v1/auth/client/credentials — change email/password */
    credentials(data: ClientCredentialsRequest) {
        return this.post('credentials', data)
    }

    /** POST /v1/auth/client/registration — public registration from site */
    registration(data: ClientRegistrationRequest) {
        return this.http.post<{ token: string }>('/v1/auth/client/registration', data)
    }
}
