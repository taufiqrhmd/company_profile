export default defineEventHandler((event) => {
  // Menghapus cookie dari sisi server
  deleteCookie(event, 'auth_token', {
    path: '/' // Pastikan path sesuai dengan saat setCookie di login
  })

  return { 
    success: true,
    message: 'Token deleted' 
  }
})