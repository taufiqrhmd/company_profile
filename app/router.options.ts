// app/router.options.ts
import type { RouterConfig } from '@nuxt/schema'

export default <RouterConfig> {
  scrollBehavior(to, from, savedPosition) {
    // Jika ada posisi yang disimpan (saat klik 'back' di browser)
    if (savedPosition) {
      return savedPosition
    }

    // Jika navigasi ke halaman yang sama (misal klik hash #section)
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    }

    // Default: Reset ke atas setiap pindah halaman
    return { top: 0, left: 0 }
  }
}