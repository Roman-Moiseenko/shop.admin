// ========================================================================
// Storage module DTOs
// ========================================================================

// ---- Media ----
export type MediaModelType = string // e.g. 'catalog.product', 'auth.client', 'storage.gallery'

export interface MediaBase {
    id: number
    uuid: string
    modelType: MediaModelType
    modelId: number
    type: string
    title: string | null
    description: string | null
    sort: number
    fileName: string
    mimeType: string
    size: number
    url: string | null
    thumbnails: {
        card?: string
        thumb?: string
        preview?: string
    } | null
    createdAt: string
    updatedAt: string
}

export interface MediaUploadRequest {
    modelType: MediaModelType
    modelId: number
    type: string
    title?: string
    description?: string
    sort?: number
    file: File
}

export interface MediaDownloadRequest {
    modelType: MediaModelType
    modelId: number
    type: string
    title?: string
    description?: string
    sort?: number
    url: string
}

export interface MediaUpdateRequest {
    title?: string
    description?: string
    sort?: number
}

export interface MediaClearCacheRequest {
    modelType?: string
    modelId?: number
}

export interface MediaTagsRequest {
    tagIds: number[]
}

// ---- Tag ----
export interface TagBase {
    id: number
    name: string
    slug: string
    createdAt: string
    updatedAt: string
}

export interface TagCreateRequest {
    name: string
    slug: string
}

export interface TagUpdateRequest extends TagCreateRequest {}

// ---- Gallery ----
export interface GalleryBase {
    id: number
    name: string
    slug: string
    description: string | null
    isActive: boolean
    createdAt: string
    updatedAt: string
}

export interface GalleryCreateRequest {
    name: string
    slug?: string
    description?: string
    isActive?: boolean
}

export interface GalleryUpdateRequest extends GalleryCreateRequest {}
