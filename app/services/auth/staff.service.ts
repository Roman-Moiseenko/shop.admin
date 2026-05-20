import { ApiService } from '~/services/api'
import type {
    StaffBase,
    StaffCreateRequest,
    StaffUpdateRequest,
    StaffCreateUserRequest,
} from '~/types/auth'
import type { User } from '~/types'

/**
 * Staff CRUD + User management
 *
 * POST   /v1/auth/staff         — create
 * GET    /v1/auth/staff         — index
 * GET    /v1/auth/staff/:id     — show
 * PUT    /v1/auth/staff/:id     — update
 * DELETE /v1/auth/staff/:id     — delete
 * POST   /v1/auth/staff/:id/user — create user account for staff
 */
export class StaffService extends ApiService<StaffBase> {
    constructor() {
        super('/v1/auth/staff')
    }

    /** POST /v1/auth/staff/:id/user — create user account for staff member */
    createUser(staffId: number, data: StaffCreateUserRequest) {
        return this.post<User>(`${staffId}/user`, data)
    }
}
