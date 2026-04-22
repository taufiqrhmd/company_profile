// middleware/auth.ts
export default defineNuxtRouteMiddleware(async (to) => {
  const token = useCookie('auth_token')
  const adminUser = useState('adminUser')

  // Jika mencoba akses /admin tapi tidak punya token, lempar ke login
  if (!token.value && to.path.startsWith('/admin') && to.path !== '/admin/login') {
    return navigateTo('/admin/login')
  }

  // Jika sudah login tapi malah mau ke halaman login lagi, lempar ke dashboard
  if (token.value && !adminUser.value) {
    try {
      const supabase = useSupabaseClient()
      // Decode dengan aman
      const username = atob(token.value.replace('token-', ''))
      
      const { data, error } = await supabase
        .from('admin_accounts')
        .select('full_name')
        .eq('username', username)
        .single()
      
      if (data) {
        adminUser.value = data
      } else {
        // Jika token ada tapi user tidak ada di DB, hapus cookie dan tendang ke login
        token.value = null
        return navigateTo('/admin/login')
      }
    } catch (e) {
      // Jika atob gagal (token rusak)
      token.value = null
      return navigateTo('/admin/login')
    }
  }
})