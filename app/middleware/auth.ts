// middleware/auth.ts
// middleware/auth.ts
export default defineNuxtRouteMiddleware(async (to) => {
  const token = useCookie('auth_token')
  const adminUser = useState<any>('adminUser')
  const loginPath = '/admin/login'

  // 1. Proteksi Halaman Admin
  if (to.path.startsWith('/admin')) {
    // Jika tidak ada token & state kosong, lempar ke login
    if (!token.value && !adminUser.value) {
      if (to.path !== loginPath) return navigateTo(loginPath)
      return
    }

    // 2. Proses Rehydration (Ambil data user dari token)
    if (token.value && !adminUser.value) {
      try {
        // Gunakan $fetch dengan header agar cookie terkirim (jika SSR)
        const user = await $fetch('/api/auth/me', {
          headers: useRequestHeaders(['cookie']) as Record<string, string>
        })

        if (user) {
          adminUser.value = user
        } else {
          // Token ada tapi user tidak ditemukan di DB
          token.value = null
          if (to.path !== loginPath) return navigateTo(loginPath)
        }
      } catch (e) {
        // ERROR KRUSIAL: Jika fetch gagal, JANGAN hapus token dulu.
        // Bisa jadi karena masalah koneksi. Cukup log saja.
        console.error("Gagal validasi token:", e)
        
        // Opsional: Jika error adalah 401 (Unauthorized), baru hapus
        // token.value = null 
      }
    }
  }

  // 3. Mencegah user yang sudah login masuk ke halaman login lagi
  if ((token.value || adminUser.value) && to.path === loginPath) {
    return navigateTo('/admin')
  }
})