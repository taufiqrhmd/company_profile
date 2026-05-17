<template>
  <div class="max-w-6xl mx-auto space-y-8">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
        <h2
          class="text-3xl font-black text-slate-900 dark:text-white tracking-tighter uppercase transition-colors">
          Client Inquiries
        </h2>
        <p class="text-slate-500 dark:text-slate-400 text-sm mt-1 transition-colors">Manage incoming messages and collaboration leads.</p>
      </div>
      <div
        class="px-4 py-2 bg-white dark:bg-[#16191E] border border-slate-200 dark:border-white/5 rounded-lg text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 transition-colors">
        Total: <span class="text-primary">{{ messages.length }} Messages</span>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <!-- Sidebar Filters -->
      <div class="lg:col-span-1 space-y-4">
        <div
          class="p-6 bg-white dark:bg-[#16191E] border border-slate-200 dark:border-white/5 rounded-xl shadow-sm transition-colors">
          <p class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Filters</p>
          <div class="space-y-2">
            <button v-for="status in ['All', 'Unread', 'Archived']" :key="status" @click="currentFilter = status"
              class="w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition-all" :class="currentFilter === status
                ? 'bg-primary text-black shadow-lg shadow-primary/20'
                : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5'">
              {{ status }} Messages
            </button>
          </div>
        </div>
      </div>

      <!-- Messages List -->
      <div class="lg:col-span-3 space-y-4">
        <!-- Loading State -->
        <div v-if="loading" class="flex flex-col items-center justify-center py-20 space-y-4">
          <Icon name="solar:refresh-linear" class="w-8 h-8 animate-spin text-primary" />
          <p class="text-[10px] font-bold uppercase tracking-widest text-slate-400">Fetching Messages...</p>
        </div>

        <!-- Empty State -->
        <div v-else-if="messages.length === 0"
          class="text-center py-20 bg-white dark:bg-[#16191E] rounded-[2rem] border border-dashed border-slate-200 dark:border-white/10 transition-colors">
          <Icon name="solar:letter-unread-linear" class="w-12 h-12 text-slate-200 dark:text-slate-800 mb-4" />
          <p class="text-xs text-slate-400 italic font-medium">No messages found in "{{ currentFilter }}" category.</p>
        </div>

        <!-- List -->
        <div v-else v-for="msg in messages" :key="msg.id"
          class="p-6 bg-white dark:bg-[#16191E] border border-slate-200 dark:border-white/5 rounded-xl hover:border-primary/50 dark:hover:border-primary/50 transition-all cursor-pointer group relative overflow-hidden"
          @click="openMessage(msg)">
          <!-- Unread Indicator Line -->
          <div v-if="msg.status === 'unread'"
            class="absolute left-0 top-0 bottom-0 w-1 bg-primary shadow-[0_0_10px_rgba(212,163,46,0.5)]"></div>

          <div class="flex justify-between items-start mb-4">
            <div class="flex items-center gap-3">
              <div
                class="w-10 h-10 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center font-black text-slate-400 dark:text-slate-500 border border-transparent dark:border-white/5 uppercase transition-colors">
                {{ msg.name.charAt(0) }}
              </div>
              <div>
                <h4
                  class="text-sm font-black uppercase italic tracking-tight text-slate-900 dark:text-white transition-colors">
                  {{ msg.name }}
                  <span v-if="msg.status === 'unread'"
                    class="ml-2 inline-block w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></span>
                </h4>
                <p
                  class="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-tighter transition-colors">
                  {{ msg.email }}</p>
              </div>
            </div>
            <span class="text-[9px] font-bold text-slate-300 dark:text-slate-600 uppercase italic transition-colors">
              {{ formatDate(msg.created_at) }}
            </span>
          </div>

          <div
            class="space-y-2 pl-2 border-l-2 border-transparent group-hover:border-slate-100 dark:group-hover:border-white/5 transition-all">
            <h5 class="text-xs font-bold text-slate-700 dark:text-slate-200 uppercase transition-colors">{{ msg.subject
            }}</h5>
            <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2 italic transition-colors">
              "{{ msg.message }}"
            </p>
          </div>

          <!-- Hover Actions -->
          <div
            class="mt-6 pt-4 border-t border-slate-50 dark:border-white/5 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
            <div class="flex gap-4">
              <button @click.stop="openMessage(msg)"
                class="text-[10px] font-black uppercase tracking-widest text-primary hover:underline underline-offset-4 transition-all">
                Read Full
              </button>
              <button @click.stop="updateStatus(msg.id, 'archived')"
                class="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-amber-500 transition-colors">
                Archive
              </button>
              <button @click.stop="confirmDelete(msg.id)"
                class="text-[10px] font-black uppercase tracking-widest text-rose-500 hover:text-rose-600 transition-colors">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <LayoutAdminMessageModal :is-open="isModalOpen" :message="selectedMessage" @close="isModalOpen = false"
      @delete="handleDeleteFromModal" />
  </div>
</template>

<script lang="ts" setup>
import { toast } from 'vue-sonner'
// Definisikan ulang interface di sini atau import jika dipisah
interface Inquiry {
  id: string
  name: string
  email: string
  subject: string
  message: string
  status: 'unread' | 'read' | 'archived'
  created_at: string
}

const supabase = useSupabaseClient()
const isModalOpen = ref(false)

definePageMeta({
  layout: 'admin',
  middleware: ['auth']
})

const { messages, loading, fetchMessages, updateStatus, deleteMessage } = useInquiries()
const currentFilter = ref<string>('All')
const selectedMessage = ref<Inquiry | null>(null)

const formatDate = (dateStr: string): string => {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })
}

const openMessage = async (msg: Inquiry) => {
  selectedMessage.value = msg
  isModalOpen.value = true

  if (msg.status === 'unread') {
    await updateStatus(msg.id, 'read')
  }
}

const handleDeleteFromModal = (id: string) => {
  // Langsung arahkan ke fungsi master konfirmasi
  confirmDelete(id);
};

let inquiriesChannel: any = null
const subscribeRealtime = () => {
  if (inquiriesChannel) supabase.removeChannel(inquiriesChannel)

  inquiriesChannel = supabase
    .channel('inquiries_realtime')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'inquiries' }, () => {
      fetchMessages(currentFilter.value)
    })
    .subscribe()
}

onUnmounted(() => {
  if (inquiriesChannel) supabase.removeChannel(inquiriesChannel)
})

onMounted(async () => {
  await fetchMessages(currentFilter.value)
  subscribeRealtime()
})

watch(currentFilter, (newFilter) => {
  fetchMessages(newFilter)
})

const confirmDelete = (id: string) => {
  toast("Are you sure you want to delete this?", {
    description: "This action cannot be undone.",
    action: {
      label: "Hapus",
      onClick: async () => {
        try {
          await deleteMessage(id); // Fungsi dari composable
          isModalOpen.value = false; // Tutup modal jika sedang terbuka
          toast.success("Message deleted successfully");
        } catch (error) {
          toast.error("Failed to delete message");
        }
      },
    },
    cancel: {
      label: "Batal",
    },
  });
};
</script>