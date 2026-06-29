import { useDebounceFn } from '@vueuse/core'

export default defineNuxtPlugin((nuxtApp) => {
  const route = useRoute()

  // Gunakan useDebounceFn dari @vueuse/core agar tidak menumpuk hit 
  // saat user melakukan navigasi cepat
  const trackVisit = useDebounceFn(async (path: string) => {
    try {
      await $fetch('/api/analytics/track-visit', {
        method: 'POST',
        body: {
          path,
          referrer: document.referrer || 'direct'
        }
      })
    } catch (e) {
      // Silent error agar tidak mengganggu UI user
    }
  }, 1000)

  // Pantau perubahan route
  watch(() => route.path, (newPath) => {
    // Hanya track jika bukan halaman admin
    if (!newPath.startsWith('/admin')) {
      trackVisit(newPath)
    }
  }, { immediate: true })
})