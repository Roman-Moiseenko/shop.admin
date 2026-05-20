import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
    srcDir: 'app/',
    devServer: {port: 3000,},
    compatibilityDate: '2025-07-15',
    modules: [
        '@element-plus/nuxt',
        '@pinia/nuxt',
//        '@nuxt/fonts',
    ],


    ssr: false,
    experimental: {
        viteEnvironmentApi: true,
    },
    elementPlus: {
        importStyle: 'scss',
    },
    /*fonts: {
        defaults: {
            weights: [400],
            styles: ['normal', 'italic'],
            subsets: [
                'cyrillic-ext',
                'cyrillic',
                'greek-ext',
                'greek',
                'vietnamese',
                'latin-ext',
                'latin',
            ]
        },
    }, */
    vite: {
        plugins: [
            tailwindcss() // Активируем плагин Tailwind CSS v4 напрямую
        ],
        server: {
            allowedHosts: ["localhost", "127.0.0.1"],
        },
        css: {
            preprocessorOptions: {
                scss: {
                    quietDeps: true,
                },
            },
        },
    },
    devtools: { enabled: true },
    css: [
        '~/assets/css/main.css',
        '~/assets/css/dark.css',
        '~/assets/css/fonts.css',
        '~/assets/fontawesome/css/all.min.css',
        '~/assets/scss/main.scss',
        'element-plus/theme-chalk/dark/css-vars.css',
        '~/assets/css/theme.css',
    ],

    runtimeConfig: {
        public: {
            authGuard: 'api',
            apiBase: '/api',
            storageBase: '/api/storage/',
        }
    }
})