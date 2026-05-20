import { ApiService } from '~/services/api'
import type { WidgetBase, WidgetCreateRequest, WidgetUpdateRequest, WidgetOption } from '~/types/content'

/**
 * Widget CRUD (templates for widget instances)
 *
 * GET    /v1/content/widget           — index
 * POST   /v1/content/widget           — create
 * GET    /v1/content/widget/:id       — show
 * PUT    /v1/content/widget/:id       — update
 * DELETE /v1/content/widget/:id       — delete
 * GET    /v1/content/widget/options   — available widget options for selection
 */
export class WidgetService extends ApiService<WidgetBase> {
    constructor() {
        super('/v1/content/widget')
    }

    /** GET /v1/content/widget/options */
    options() {
        return this.http.get<WidgetOption[]>('/v1/content/widget/options')
    }
}
