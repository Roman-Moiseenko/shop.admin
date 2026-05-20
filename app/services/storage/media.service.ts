import { ApiService } from '~/services/api'
import type {
    MediaBase,
    MediaUploadRequest,
    MediaDownloadRequest,
    MediaUpdateRequest,
    MediaClearCacheRequest,
    MediaTagsRequest,
} from '~/types/storage'

/**
 * Media (images/files) management
 *
 * POST   /v1/storage/media/upload       — upload file
 * POST   /v1/storage/media/download      — download from URL
 * POST   /v1/storage/media/clear-cache   — clear thumbnails cache
 * PUT    /v1/storage/media/:id           — update meta
 * DELETE /v1/storage/media/:id           — delete
 * GET    /v1/storage/media/:uuid         — show media info (?thumb=card)
 * GET    /v1/storage/media/:uuid/file    — get file content
 * GET    /v1/storage/media/public        — public index (?model_type=&model_id=)
 * PUT    /v1/storage/media/:id/tags      — attach tags
 *
 * Client endpoints (так же через /v1/storage/client/media):
 * POST   /v1/storage/client/media          — client upload
 * GET    /v1/storage/client/media          — client index
 * DELETE /v1/storage/client/media/:uuid    — client delete
 */
export class MediaService extends ApiService<MediaBase> {
    constructor() {
        super('/v1/storage/media')
    }

    /** POST /v1/storage/media/upload */
    upload(data: MediaUploadRequest) {
        const formData = new FormData()
        formData.append('model_type', data.modelType)
        formData.append('model_id', String(data.modelId))
        formData.append('type', data.type)
        if (data.title) formData.append('title', data.title)
        if (data.description) formData.append('description', data.description)
        if (data.sort !== undefined) formData.append('sort', String(data.sort))
        formData.append('file', data.file)
        return this.http.post<MediaBase>('/v1/storage/media/upload', formData)
    }

    /** POST /v1/storage/media/download — download from URL */
    download(data: MediaDownloadRequest) {
        return this.post<MediaBase>('download', data)
    }

    /** POST /v1/storage/media/clear-cache */
    clearCache(data?: MediaClearCacheRequest) {
        return this.post('clear-cache', data)
    }

    /** GET /v1/storage/media/:uuid (?thumb=card|thumb|preview) */
    showByUuid(uuid: string, thumb?: 'card' | 'thumb' | 'preview') {
        const params = thumb ? { thumb } : undefined
        return this.http.get<MediaBase>(`/v1/storage/media/${uuid}`, params)
    }

    /** GET /v1/storage/media/:uuid/file */
    file(uuid: string) {
        return this.http.get<Blob>(`/v1/storage/media/${uuid}/file`)
    }

    /** PUT /v1/storage/media/:id/tags — attach tags */
    attachTags(id: number, data: MediaTagsRequest) {
        return this.put(`${id}/tags`, data)
    }

    /** GET /v1/storage/media/public */
    publicIndex(params: { model_type: string; model_id: number; type?: string }) {
        return this.http.get<MediaBase[]>('/v1/storage/media/public', params)
    }

    // ---- Client endpoints (для клиентского профиля) ----
    /** POST /v1/storage/client/media */
    clientUpload(data: { model_type: string; model_id: number; type: string; file: File; title?: string; description?: string; sort?: number }) {
        const formData = new FormData()
        formData.append('model_type', data.model_type)
        formData.append('model_id', String(data.model_id))
        formData.append('type', data.type)
        if (data.title) formData.append('title', data.title)
        if (data.description) formData.append('description', data.description)
        if (data.sort !== undefined) formData.append('sort', String(data.sort))
        formData.append('file', data.file)
        return this.http.post<MediaBase>('/v1/storage/client/media', formData)
    }

    /** GET /v1/storage/client/media */
    clientIndex(params: { model_type: string; model_id: number; type?: string }) {
        return this.http.get<MediaBase[]>('/v1/storage/client/media', params)
    }

    /** DELETE /v1/storage/client/media/:uuid */
    clientDelete(uuid: string) {
        return this.http.delete(`/v1/storage/client/media/${uuid}`)
    }
}
