export const useInquiries = () => {
  const messages = ref<any[]>([])
  const loading = ref(false)

  const fetchMessages = async (statusFilter: string = 'All') => {
    loading.value = true
    try {
      // Mengarah ke server/api/inquiries/index.get.ts
      const data = await $fetch('/api/inquiries', {
        params: { status: statusFilter }
      })
      messages.value = (data as any[]) || []
    } catch (e) {
      console.error('Fetch Error:', e)
    } finally {
      loading.value = false
    }
  }

  const updateStatus = async (id: string, status: string) => {
    try {
      // Pastikan Anda juga membuat server/api/inquiries/update.post.ts 
      // atau gunakan endpoint yang sesuai untuk proses update
      await $fetch('/api/inquiries/update', {
        method: 'POST',
        body: { id, status }
      })
      
      const msg = messages.value.find(m => m.id === id)
      if (msg) msg.status = status
    } catch (e) {
      console.error('Update Error:', e)
    }
  }

  return { messages, loading, fetchMessages, updateStatus }
}