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

    // 2. Proses Rehydration (Ambil data user dari token jika belum ada di state)
    if (token.value && !adminUser.value) {
      try {
        const user = await $fetch('/api/auth/me', {
          headers: useRequestHeaders(['cookie']) as Record<string, string>
        })

        if (user) {
          adminUser.value = user
        } else {
          token.value = null
          if (to.path !== loginPath) return navigateTo(loginPath)
          return
        }
      } catch (e: any) {
        console.error("Gagal validasi token:", e)
        // Jika server mengembalikan 401/403, bersihkan token karena sudah expired/invalid
        if (e.statusCode === 401 || e.statusCode === 403) {
          token.value = null
          if (to.path !== loginPath) return navigateTo(loginPath)
          return
        }
      }
    }

    // ─── 2.5 TAMBAHKAN PROTEKSI ROLE DI SINI ───
    // Pastikan pengecekan ini berjalan SETELAH proses rehydration di atas selesai
    if (to.path === '/admin/accounts') {
      const userRole = adminUser.value?.role
      
      if (userRole !== 'super_admin') {
        // Jika bukan super_admin (misal 'editor'), kunci akses dan lempar ke dashboard utama
        return navigateTo('/admin')
      }
    }
  }

  // 3. Mencegah user yang sudah login masuk ke halaman login lagi
  if ((token.value || adminUser.value) && to.path === loginPath) {
    return navigateTo('/admin')
  }
})