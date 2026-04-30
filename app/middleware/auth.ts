// middleware/auth.ts
export default defineNuxtRouteMiddleware(async (to) => {
  const token = useCookie('auth_token')
  const adminUser = useState<any>('adminUser')
  const loginPath = '/admin/login'
  const dashboardPath = '/admin'

  // KONDISI 1: User tidak punya token dan mencoba akses area admin
  if (!token.value && to.path.startsWith('/admin')) {
    // PENTING: Hanya redirect jika belum berada di loginPath
    if (to.path !== loginPath) {
      return navigateTo(loginPath)
    }
    // Jika sudah di loginPath, biarkan saja (stop middleware)
    return 
  }

  // KONDISI 2: Rehydration (Refresh F5)
  if (token.value && !adminUser.value) {
    try {
      const user = await $fetch('/api/auth/me')
      if (user) {
        adminUser.value = user
      } else {
        // Token tidak valid/expired
        token.value = null
        if (to.path !== loginPath) return navigateTo(loginPath)
      }
    } catch (e) {
      token.value = null
      if (to.path !== loginPath) return navigateTo(loginPath)
    }
  }

  // KONDISI 3: User sudah login tapi coba buka halaman login lagi
  if (token.value && to.path === loginPath) {
    return navigateTo(dashboardPath)
  }
})