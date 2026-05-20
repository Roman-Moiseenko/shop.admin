import { ApiService } from '~/services/api'
import type { ContentBlockBase, ContentBlockAddRequest, ContentBlockSortRequest, ContentBlockCaptionRequest } from '~/types/content'

/**
 * ContentBlock management (widget instances grouping in pages)
 *
 * POST   /v1/content/page/:id/block          — add block
 * PUT    /v1/content/page/:id/block/sort     — reorder block
 * PATCH  /v1/content/page/:id/block/caption  — update caption
 * DELETE /v1/content/page/:id/block/:blockId — remove block
 */
export class ContentBlockService extends ApiService {
    constructor() {
        super('/v1/content/page')
    }

    /** POST /v1/content/page/:id/block */
    add(pageId: number, data: ContentBlockAddRequest) {
        return this.post<ContentBlockBase>(`${pageId}/block`, data)
    }

    /** PUT /v1/content/page/:id/block/sort */
    sort(pageId: number, data: ContentBlockSortRequest) {
        return this.put(`${pageId}/block/sort`, data)
    }

    /** PATCH /v1/content/page/:id/block/caption */
    updateCaption(pageId: number, data: ContentBlockCaptionRequest) {
        return this.patch(`${pageId}/block/caption`, data)
    }

    /** DELETE /v1/content/page/:id/block/:blockId */
    remove(pageId: number, blockId: number) {
        return this.delete(`${pageId}/block/${blockId}`)
    }
}
