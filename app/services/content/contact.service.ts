import { ApiService } from '~/services/api'
import type {
    ContactBase,
    ContactCreateRequest,
    ContactUpdateRequest,
    ContactSortRequest,
} from '~/types/content'

/**
 * Contact entries CRUD + sort/activate/deactivate
 *
 * GET    /v1/content/contact          — index
 * POST   /v1/content/contact          — create
 * GET    /v1/content/contact/:id      — show
 * PUT    /v1/content/contact/:id      — update
 * DELETE /v1/content/contact/:id      — delete
 * PUT    /v1/content/contact/:id/activate   — activate
 * PUT    /v1/content/contact/:id/deactivate — deactivate
 * PUT    /v1/content/contact/:id/sort       — reorder
 */
export class ContactService extends ApiService<ContactBase> {
    constructor() {
        super('/v1/content/contact')
    }

    /** PUT /v1/content/contact/:id/activate */
    activate(id: number) {
        return this.put(`${id}/activate`)
    }

    /** PUT /v1/content/contact/:id/deactivate */
    deactivate(id: number) {
        return this.put(`${id}/deactivate`)
    }

    /** PUT /v1/content/contact/:id/sort */
    sort(id: number, data: ContactSortRequest) {
        return this.put(`${id}/sort`, data)
    }
}
