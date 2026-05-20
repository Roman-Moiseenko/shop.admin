import { Shop, Goods, Box, ShoppingCart } from '@element-plus/icons-vue'

export interface NavigationItem {
    key: string          // уникальный ключ для индекса el-sub-menu
    title: string
    icon?: string           // иконка из @element-plus/icons-vue
    path?: string        // роут, если пункт сам является ссылкой
    children?: NavigationItem[]
}

export const useNavigation = () => {
    const navigationItems: NavigationItem[] =  [
        {
            key: 'auth',
            title: 'Пользователи',
            icon: 'user',
            children: [
                {
                    key: 'auth-staff',
                    title: 'Сотрудники',
                    path: '/auth/staff',          // список всех сотрудников
                    children: [
                        { key: 'staff-current', title: 'Действующие', path: '/auth/staff/current' },
                        { key: 'staff-create', title: 'Создать', path: '/auth/staff/create' },
                        { key: 'staff-archive', title: 'Архив', path: '/auth/staff/archive' },
                    ]
                },
                { key: 'auth-freelance', title: 'Фрилансеры', path: '/auth/freelance' },
                { key: 'auth-client', title: 'Клиенты', path: '/auth/client' },
                { key: 'auth-user', title: 'Пользователи', path: '/auth/user' },
                {
                    key: 'auth-role',
                    title: 'Доступы',
                    path: '/auth/role',
                    children : [
                        { key: 'role-create', title: 'Создать', path: '/auth/role/create' },
                    ],
                },
            ]
        },
        {
            key: 'content',
            title: 'Веб-сайт',
            icon: 'globe',
            children: [
                { key: 'content-page', title: 'Страницы', path: '/content/page' },
            ]
        },
        {
            key: 'storage',
            title: 'Библиотека',
            icon: 'photo-film',
            children: [
                { key: 'storage-media', title: 'Изображения', path: '/storage/media' },
                { key: 'orders-gallery', title: 'Галерея', path: '/storage/gallery' },
            ]
        }
    ]

    function getBreadcrumbs(currentPath: string) {
        const crumbs = []
        for (const section of navigationItems) {
            const found = section.children?.find(c => c.path === currentPath)
            if (found) {
                crumbs.push({ title: section.title, path: '' })
                crumbs.push({ title: found.title, path: currentPath })
                break
            }
        }
        return crumbs
    }

    return { navigationItems, getBreadcrumbs }
}