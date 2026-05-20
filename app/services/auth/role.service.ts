import { ApiService } from '~/services/api'
import type {
    RoleBase,
    RoleCreateRequest,
    RoleUpdateRequest,
    PermissionGroup,
} from '~/types/auth'

/**
 * Role & Permissions management
 *
 * GET    /v1/auth/role                — index (?type=system|user)
 * POST   /v1/auth/role                — create
 * GET    /v1/auth/role/:id            — show
 * PUT    /v1/auth/role/:id            — update
 * DELETE /v1/auth/role/:id            — delete
 * GET    /v1/auth/permission/grouped  — all permissions grouped by module
 */
export class RoleService extends ApiService<RoleBase> {
    constructor() {
        super('/v1/auth/role')
    }

    /** GET /v1/auth/role with type filter */
    indexByType(type: 'system' | 'user') {
        return this.http.get<RoleBase[]>('/v1/auth/role', { type })
    }

    /** GET /v1/auth/permission/grouped */
    getPermissionsGrouped() {
        return this.http.get<PermissionGroup[]>('/v1/auth/permission/grouped')
    }
}
