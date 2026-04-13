// middleware/auth.ts
export default defineNuxtRouteMiddleware((to, from) => {
  const token = useCookie('auth_token')

  // Jika mencoba akses /admin tapi tidak punya token, lempar ke login
  if (!token.value && to.path.startsWith('/admin') && to.path !== '/admin/login') {
    return navigateTo('/admin/login')
  }

  // Jika sudah login tapi malah mau ke halaman login lagi, lempar ke dashboard
  if (token.value && to.path === '/admin/login') {
    return navigateTo('/admin')
  }
})