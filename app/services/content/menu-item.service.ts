import { ApiService } from '~/services/api'
import type {
    MenuItemBase,
    MenuItemCreateRequest,
    MenuItemUpdateRequest,
    MenuItemParentRequest,
    MenuItemSortRequest,
} from '~/types/content'

/**
 * Menu Item management
 *
 * GET    /v1/content/menu/:id/item              — index
 * POST   /v1/content/menu/:id/item              — create
 * GET    /v1/content/menu/:id/item/:itemId      — show
 * PUT    /v1/content/menu/:id/item/:itemId      — update
 * DELETE /v1/content/menu/:id/item/:itemId      — delete
 * PUT    /v1/content/menu/:id/item/:itemId/parent — change parent
 * POST   /v1/content/menu/:id/item/:itemId/activate   — activate
 * POST   /v1/content/menu/:id/item/:itemId/deactivate — deactivate
 * PUT    /v1/content/menu/:id/item/reorder      — reorder
 */
export class MenuItemService extends ApiService {
    constructor() {
        super('/v1/content/menu')
    }

    /** GET /v1/content/menu/:id/item */
    items(menuId: number) {
        return this.get<MenuItemBase[]>(`${menuId}/item`)
    }

    /** POST /v1/content/menu/:id/item */
    createItem(menuId: number, data: MenuItemCreateRequest) {
        return this.post(`${menuId}/item`, data)
    }

    /** GET /v1/content/menu/:id/item/:itemId */
    showItem(menuId: number, itemId: number) {
        return this.get(`${menuId}/item/${itemId}`)
    }

    /** PUT /v1/content/menu/:id/item/:itemId */
    updateItem(menuId: number, itemId: number, data: MenuItemUpdateRequest) {
        return this.put(`${menuId}/item/${itemId}`, data)
    }

    /** DELETE /v1/content/menu/:id/item/:itemId */
    deleteItem(menuId: number, itemId: number) {
        return this.delete(`${menuId}/item/${itemId}`)
    }

    /** PUT /v1/content/menu/:id/item/:itemId/parent */
    changeParent(menuId: number, itemId: number, data: MenuItemParentRequest) {
        return this.put(`${menuId}/item/${itemId}/parent`, data)
    }

    /** POST /v1/content/menu/:id/item/:itemId/activate */
    activate(menuId: number, itemId: number) {
        return this.post(`${menuId}/item/${itemId}/activate`)
    }

    /** POST /v1/content/menu/:id/item/:itemId/deactivate */
    deactivate(menuId: number, itemId: number) {
        return this.post(`${menuId}/item/${itemId}/deactivate`)
    }

    /** PUT /v1/content/menu/:id/item/reorder */
    reorder(menuId: number, data: MenuItemSortRequest) {
        return this.put(`${menuId}/item/reorder`, data)
    }
}
