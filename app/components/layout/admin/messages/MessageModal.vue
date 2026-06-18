<template>
  <Transition name="fade">
    <div v-if="isOpen && message"
      class="fixed inset-0 z-[99] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">

      <div
        class="bg-white dark:bg-[#16191E] w-full max-w-2xl rounded-[2.5rem] border border-slate-200 dark:border-white/10 overflow-hidden shadow-2xl">
        <!-- Header -->
        <div class="p-8 border-b border-slate-50 dark:border-white/5 flex justify-between items-start">
          <div>
            <p class="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-2">Inquiry Detail</p>
            <h3 class="text-xl font-black text-slate-900 dark:text-white uppercase italic">{{ message.subject }}</h3>
          </div>
          <button @click="$emit('close')"
            class="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-full transition-colors">
            <Icon name="solar:close-circle-linear" class="w-6 h-6 text-slate-400" />
          </button>
        </div>

        <!-- Body -->
        <div class="p-8 space-y-6">
          <div class="flex items-center gap-4">
            <div
              class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black text-lg">
              {{ message.name.charAt(0) }}
            </div>
            <div>
              <p class="font-bold text-slate-900 dark:text-white">{{ message.name }}</p>
              <p class="text-xs text-slate-500">{{ message.email }}</p>
            </div>
            <div class="ml-auto text-right">
              <p class="text-[10px] font-bold text-slate-400 uppercase tracking-normal">Received on</p>
              <p class="text-xs font-medium text-slate-900 dark:text-slate-300">{{ formatDate(message.created_at) }}</p>
            </div>
          </div>

          <div class="bg-slate-50 dark:bg-white/5 p-6 rounded-3xl border border-slate-100 dark:border-white/5">
            <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-wrap italic">
              "{{ message.message }}"
            </p>
          </div>
        </div>

        <!-- Footer Actions -->
        <div
          class="p-6 bg-slate-50/50 dark:bg-white/[0.02] flex flex-col sm:flex-row gap-4 justify-between items-center border-t border-slate-100 dark:border-white/5">
          <!-- Aksi Destruktif (Hapus) -->
          <button @click="$emit('delete', message.id)"
            class="group flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-all duration-300">
            <Icon name="solar:trash-bin-trash-bold" class="w-4 h-4 text-rose-500 group-hover:shake" />
            <span class="text-[10px] font-black uppercase tracking-widest text-rose-500">
              Delete Message
            </span>
          </button>

          <!-- Aksi Navigasi & Utama -->
          <div class="flex items-center gap-3 w-full sm:w-auto">
            <button @click="$emit('close')"
              class="flex-1 sm:flex-none px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5 transition-all">
              Close
            </button>

            <a :href="`mailto:${message.email}?subject=Re: ${message.subject}`"
              class="flex-1 sm:flex-none flex items-center justify-center gap-2 px-8 py-3 bg-primary text-black rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0 transition-all">
              <Icon name="solar:letter-opened-bold" class="w-4 h-4" />
              Reply via Email
            </a>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
// Props untuk menerima data dari parent

defineProps<{
  isOpen: boolean
  message: any | null // Ganti 'any' dengan interface Inquiry Anda
}>()

// Emit untuk mengirim event ke parent
const emit = defineEmits(['close', 'delete'])

const formatDate = (dateStr: string): string => {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric'
  })
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>