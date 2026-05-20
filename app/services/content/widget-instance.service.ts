import { ApiService } from '~/services/api'
import type { WidgetInstanceBase, WidgetInstanceCreateRequest, WidgetInstanceUpdateRequest } from '~/types/content'

/**
 * WidgetInstance CRUD (concrete widget on a page)
 *
 * GET    /v1/content/widget-instance       — index
 * POST   /v1/content/widget-instance       — create
 * GET    /v1/content/widget-instance/:id   — show
 * PUT    /v1/content/widget-instance/:id   — update
 * DELETE /v1/content/widget-instance/:id   — delete
 */
export class WidgetInstanceService extends ApiService<WidgetInstanceBase> {
    constructor() {
        super('/v1/content/widget-instance')
    }
}
