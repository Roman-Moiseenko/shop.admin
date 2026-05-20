import { ApiService } from '~/services/api'
import type {
    FreelanceBase,
    FreelanceCreateRequest,
    FreelanceUpdateRequest,
    FreelanceCreateUserRequest,
} from '~/types/auth'
import type { User } from '~/types'

/**
 * Freelance CRUD + User management
 *
 * POST   /v1/auth/freelance         — create
 * GET    /v1/auth/freelance         — index
 * GET    /v1/auth/freelance/:id     — show
 * PUT    /v1/auth/freelance/:id     — update
 * DELETE /v1/auth/freelance/:id     — delete
 * POST   /v1/auth/freelance/:id/user — create user account
 */
export class FreelanceService extends ApiService<FreelanceBase> {
    constructor() {
        super('/v1/auth/freelance')
    }

    /** POST /v1/auth/freelance/:id/user */
    createUser(freelanceId: number, data: FreelanceCreateUserRequest) {
        return this.post<User>(`${freelanceId}/user`, data)
    }
}
