export default defineNuxtRouteMiddleware(async (to) => {
  const token = useCookie('auth_token')
  const adminUser = useState<any>('adminUser')
  const supabase = useSupabaseClient()

  // 1. Proteksi Halaman: Jika akses /admin tapi tidak ada token
  if (!token.value && to.path.startsWith('/admin') && to.path !== '/admin/login') {
    return navigateTo('/admin/login')
  }

  // 2. REHYDRATION LOGIC: Jika ada token tapi state adminUser kosong (kasus Reload F5)
  if (token.value && !adminUser.value) {
    try {
      // Ambil kembali username dari base64 token
      const base64Content = token.value.replace('token-', '')
      const username = atob(base64Content)

      // Tarik ulang data user dari database
      const { data, error } = await supabase
        .from('admin_accounts')
        .select('username, full_name, role')
        .eq('username', username)
        .single()

      if (data) {
        // Isi kembali state global agar Sidebar & Header langsung muncul datanya
        adminUser.value = data
      } else {
        // Jika data tidak ditemukan (token tidak valid), bersihkan semuanya
        token.value = null
        return navigateTo('/admin/login')
      }
    } catch (e) {
      // Jika terjadi error saat decode base64 atau fetch
      token.value = null
      return navigateTo('/admin/login')
    }
  }

  // 3. Jika sudah login tapi mencoba akses halaman login lagi
  if (token.value && to.path === '/admin/login') {
    return navigateTo('/admin')
  }
})