export default defineNuxtPlugin(async () => {
    const auth = useAuthStore()
    // Загружаем пользователя только если есть токен, но пользователь ещё не загружен
    if (auth.logged && !auth.user?.ulid) {
        try {
            await auth.fetchUser()
        } catch {
            auth.reset()
        }
    }
})