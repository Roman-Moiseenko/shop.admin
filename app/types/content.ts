// ========================================================================
// Content module DTOs
// ========================================================================

// ---- Page ----
export interface PageBase {
    id: number
    ulid: string
    title: string
    slug: string
    contentType: 'simple' | 'widget_based'
    content: string | null
    meta: {
        title: string | null
        description: string | null
    } | null
    template: string
    authorId: number | null
    isPublished: boolean
    publishedAt: string | null
    deletedAt: string | null
    createdAt: string
    updatedAt: string
}

export interface PageCreateRequest {
    title: string
    slug: string
    contentType: 'simple' | 'widget_based'
    content?: string
    meta?: {
        title?: string
        description?: string
    }
    template?: string
    authorId?: number
}

export interface PageUpdateRequest extends PageCreateRequest {}

// ---- Widget ----
export interface WidgetBase {
    id: number
    name: string
    slug: string
    category: string
    description: string | null
    schema: Record<string, any>
    createdAt: string
    updatedAt: string
}

export interface WidgetCreateRequest {
    name: string
    slug: string
    category: string
    description?: string
    schema?: Record<string, any>
}

export interface WidgetUpdateRequest extends WidgetCreateRequest {}

export interface WidgetOption {
    value: string
    label: string
    category: string
    description: string | null
}

// ---- WidgetInstance ----
export interface WidgetInstanceBase {
    id: number
    widgetId: number
    title: string
    params: Record<string, any>
    createdAt: string
    updatedAt: string
}

export interface WidgetInstanceCreateRequest {
    widgetId: number
    title: string
    params: Record<string, any>
}

export interface WidgetInstanceUpdateRequest extends WidgetInstanceCreateRequest {}

// ---- ContentBlock ----
export interface ContentBlockBase {
    id: number
    instanceId: number
    sort: number
    section: string | null
    caption: string | null
}

export interface ContentBlockAddRequest {
    instanceId: number
    sort?: number
    section?: string
    caption?: string
}

export interface ContentBlockSortRequest {
    id: number
    sort: number
}

export interface ContentBlockCaptionRequest {
    id: number
    caption: string
}

// ---- Menu ----
export interface MenuBase {
    id: number
    name: string
    slug: string
    description: string | null
    isActive: boolean
    createdAt: string
    updatedAt: string
}

export interface MenuCreateRequest {
    name: string
    slug?: string
    description?: string
    isActive?: boolean
}

export interface MenuUpdateRequest extends MenuCreateRequest {}

// ---- MenuItem ----
export type MenuItemStyle = 'default' | 'highlight' | string

export interface MenuItemBase {
    id: number
    menuId: number
    parentId: number | null
    title: string
    url: string | null
    referenceType: string | null
    referenceId: number | null
    iconUuid: string | null
    style: MenuItemStyle
    targetBlank: boolean
    widgetInstanceId: number | null
    sort: number
    isActive: boolean
    children?: MenuItemBase[]
}

export interface MenuItemCreateRequest {
    title: string
    parentId?: number | null
    url?: string
    referenceType?: string
    referenceId?: number
}

export interface MenuItemUpdateRequest {
    title?: string
    parentId?: number | null
    url?: string
    referenceType?: string
    referenceId?: number
    iconUuid?: string
    style?: MenuItemStyle
    targetBlank?: boolean
    widgetInstanceId?: number
}

export interface MenuItemParentRequest {
    newParentId: number | null
}

export interface MenuItemSortRequest {
    id: number
    newSort: number
}

// ---- Site ----
export interface SiteHeader {
    siteName: string
    logoUuid: string | null
    menuPositions: { position: string; menuId: number }[]
    searchEnabled: boolean
    searchPlaceholder: string | null
    searchActionUrl: string | null
}

export interface SiteFooter {
    copyright: string | null
    description: string | null
    menuPositions: { position: string; menuId: number }[]
}

// ---- Contact ----
export type ContactType = 'email' | 'phone' | 'address' | 'social'

export interface ContactBase {
    id: number
    type: ContactType
    value: string
    link: string | null
    iconUuid: string | null
    caption: string | null
    analyticsField: string | null
    sort: number
    isActive: boolean
}

export interface ContactCreateRequest {
    type: ContactType
    value: string
    link?: string
    iconUuid?: string
    caption?: string
    analyticsField?: string
}

export interface ContactUpdateRequest extends ContactCreateRequest {}

export interface ContactSortRequest {
    id: number
    newSort: number
}
