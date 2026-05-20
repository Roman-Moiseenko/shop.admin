export default defineNuxtRouteMiddleware((to, from) => {
    const auth = useAuthStore()
    if (to.path !== '/login' && !auth.logged) {
        return navigateTo('/v1/auth/login')
    }
})