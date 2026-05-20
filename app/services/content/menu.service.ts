import { ApiService } from '~/services/api'
import type {
    ContactBase,
    WidgetInstanceBase,
    WidgetInstanceCreateRequest,
    WidgetInstanceUpdateRequest
} from '~/types/content'
/**    ContactBase,
    ContactCreateRequest,
 * WidgetInstance CRUD (concrete widget on a page)
    ContactSortRequest,
 * GET    /v1/content/widget-instance       — index
 * POST   /v1/content/widget-instance       — create
 * GET    /v1/content/widget-instance/:id   — show
 * PUT    /v1/content/widget-instance/:id   — update
 * DELETE /v1/content/widget-instance/:id   — delete
 * GET    /v1/content/contact          — index
* export class WidgetInstanceService extends ApiService<WidgetInstanceBase> {
 * GET    /v1/content/contact/:id      — show
        super('/v1/content/widget-instance')
 * DELETE /v1/content/contact/:id      — delete
 * PUT    /v1/content/contact/:id/activate   — activate
 */
export class ContactService extends ApiService<ContactBase> {
    constructor() {
        super('/v1/content/contact')
    }
}

import type { MenuBase } from '~/types/content'

/**
 * Menu CRUD
 *
 * GET    /v1/content/menu       — index
 * POST   /v1/content/menu       — create
 * GET    /v1/content/menu/:id   — show
 * PUT    /v1/content/menu/:id   — update
 * DELETE /v1/content/menu/:id   — delete
 */
export class MenuService extends ApiService<MenuBase> {
    constructor() {
        super('/v1/content/menu')
    }
}
