import type { RouterConfig } from 'nuxt/app'

export default <RouterConfig>{
    scrollBehavior(to, from, savedPosition) {
        // Если есть сохранённая позиция (нажали "назад") — используем её
        if (savedPosition) {
            return savedPosition
        }
        // Не скроллим при обычных переходах (sidebar, ссылки)
        return false
    },
}
