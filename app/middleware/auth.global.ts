export default defineNuxtRouteMiddleware(async (to) => {
    const auth = useAuthStore()

    // Guest guard for login page
    if (to.path === '/login') {
        if (auth.logged) return navigateTo('/')
        return
    }

    // Auth guard for all other pages
    if (!auth.logged) return navigateTo('/login')

    // If we have token but user not loaded yet (cold start)
    if (!auth.user?.ulid) {
        try {
            await auth.fetchUser()
        } catch {
            auth.reset()
            return navigateTo('/login')
        }
    }
})