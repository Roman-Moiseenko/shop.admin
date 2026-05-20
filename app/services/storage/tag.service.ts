import { ApiService } from '~/services/api'
import type { TagBase, TagCreateRequest, TagUpdateRequest } from '~/types/storage'

/**
 * Media Tags CRUD
 *
 * GET    /v1/storage/media/tag      — index
 * POST   /v1/storage/media/tag      — create
 * GET    /v1/storage/media/tag/:id  — show
 * PUT    /v1/storage/media/tag/:id  — update
 * DELETE /v1/storage/media/tag/:id  — delete
 */
export class TagService extends ApiService<TagBase> {
    constructor() {
        super('/v1/storage/media/tag')
    }
}
