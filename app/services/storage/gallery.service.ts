import { ApiService } from '~/services/api'
import type {
    GalleryBase,
    GalleryCreateRequest,
    GalleryUpdateRequest,
    MediaBase,
    TagBase,
} from '~/types/storage'

/**
 * Gallery CRUD + related media & tags
 *
 * GET    /v1/storage/gallery          — index
 * POST   /v1/storage/gallery          — create
 * GET    /v1/storage/gallery/:id      — show
 * PUT    /v1/storage/gallery/:id      — update
 * DELETE /v1/storage/gallery/:id      — delete
 * GET    /v1/storage/gallery/:id/tags — tags
 * GET    /v1/storage/gallery/:id/media — media files
 */
export class GalleryService extends ApiService<GalleryBase> {
    constructor() {
        super('/v1/storage/gallery')
    }

    /** GET /v1/storage/gallery/:id/tags */
    tags(galleryId: number) {
        return this.http.get<TagBase[]>(`/v1/storage/gallery/${galleryId}/tags`)
    }

    /** GET /v1/storage/gallery/:id/media */
    media(galleryId: number) {
        return this.http.get<MediaBase[]>(`/v1/storage/gallery/${galleryId}/media`)
    }
}
