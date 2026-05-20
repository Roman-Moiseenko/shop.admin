/**
 * Central composable to access all API services.
 * Создаёт экземпляры сервисов внутри setup-контекста.
 * Usage: const { staff, page, media } = useServices()
 */
import { AuthService } from '~/services/auth'
import { StaffService } from '~/services/auth'
import { FreelanceService } from '~/services/auth'
import { ClientService } from '~/services/auth'
import { RoleService } from '~/services/auth'

import { PageService } from '~/services/content'
import { WidgetService } from '~/services/content'
import { WidgetInstanceService } from '~/services/content'
import { ContentBlockService } from '~/services/content'
import { MenuService } from '~/services/content'
import { MenuItemService } from '~/services/content'
import { SiteService } from '~/services/content'
import { ContactService } from '~/services/content'

import { MediaService } from '~/services/storage'
import { TagService } from '~/services/storage'
import { GalleryService } from '~/services/storage'
export function useServices() {
    return {
        // Auth
        auth: new AuthService(),
        staff: new StaffService(),
        freelance: new FreelanceService(),
        client: new ClientService(),
        role: new RoleService(),

        // Content
        page: new PageService(),
        widget: new WidgetService(),
        widgetInstance: new WidgetInstanceService(),
        contentBlock: new ContentBlockService(),
        menu: new MenuService(),
        menuItem: new MenuItemService(),
        site: new SiteService(),
        contact: new ContactService(),

        // Storage
        media: new MediaService(),
        tag: new TagService(),
        gallery: new GalleryService(),
    }
}
