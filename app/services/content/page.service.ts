import { ApiService } from '~/services/api'
import type { PageBase, PageCreateRequest, PageUpdateRequest } from '~/types/content'

/**
 * Page CRUD + publish/unpublish/restore/force delete
 *
 * GET    /v1/content/page              — index
 * POST   /v1/content/page              — create
 * GET    /v1/content/page/:id          — show
 * PUT    /v1/content/page/:id          — update
 * DELETE /v1/content/page/:id          — soft delete
 * DELETE /v1/content/page/:id/force    — force delete
 * PATCH  /v1/content/page/:id/restore  — restore from trash
 * POST   /v1/content/page/:id/publish   — publish
 * POST   /v1/content/page/:id/unpublish — unpublish
 */
export class PageService extends ApiService<PageBase> {
    constructor() {
        super('/v1/content/page')
    }

    /** POST /v1/content/page/:id/publish */
    publish(id: number) {
        return this.post(`${id}/publish`)
    }

    /** POST /v1/content/page/:id/unpublish */
    unpublish(id: number) {
        return this.post(`${id}/unpublish`)
    }

    /** PATCH /v1/content/page/:id/restore */
    restore(id: number) {
        return this.patch(`${id}/restore`)
    }

    /** DELETE /v1/content/page/:id/force */
    forceDelete(id: number) {
        return this.deleteReq(`${id}/force`)
    }
}
