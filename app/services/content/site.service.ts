import { ApiService } from '~/services/api'
import type { SiteHeader, SiteFooter } from '~/types/content'

/**
 * Site settings (Header & Footer)
 *
 * GET  /v1/content/site/header  — get header config
 * PUT  /v1/content/site/header  — save header config
 * GET  /v1/content/site/footer  — get footer config
 * PUT  /v1/content/site/footer  — save footer config
 */
export class SiteService extends ApiService {
    constructor() {
        super('/v1/content/site')
    }

    /** GET /v1/content/site/header */
    getHeader() {
        return this.get<SiteHeader>(`/header`)
    }

    /** PUT /v1/content/site/header */
    saveHeader(data: SiteHeader) {
        return this.put<SiteHeader>(`/header`, data)
    }

    /** GET /v1/content/site/footer */
    getFooter() {
        return this.get<SiteFooter>(`/footer`)
    }

    /** PUT /v1/content/site/footer */
    saveFooter(data: SiteFooter) {
        return this.put<SiteFooter>(`/footer`, data)
    }
}
