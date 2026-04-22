<template>
  <div class="max-w-6xl mx-auto space-y-8">
    <div>
      <h2 class="text-3xl font-black italic uppercase tracking-tighter">
        Client <span class="text-primary">Inquiries</span>
      </h2>
      <p class="text-slate-500 text-sm">Kelola pesan masuk dan prospek kolaborasi baru.</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <div class="lg:col-span-1 space-y-4">
        <div class="p-6 bg-white border border-slate-200 rounded-[2rem] shadow-sm">
          <p class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Filters</p>
          <div class="space-y-2">
            <button v-for="status in ['All', 'Unread', 'Archived']" :key="status"
              class="w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition-all"
              :class="status === 'All' ? 'bg-primary text-black' : 'text-slate-500 hover:bg-slate-50'"
            >
              {{ status }} Messages
            </button>
          </div>
        </div>
      </div>

      <div class="lg:col-span-3 space-y-4">
        <div v-for="msg in messages" :key="msg.id" 
          class="p-6 bg-white border border-slate-200 rounded-[2rem] hover:border-primary/50 transition-all cursor-pointer group relative overflow-hidden"
        >
          <div v-if="!msg.read" class="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>

          <div class="flex justify-between items-start mb-4">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-black text-slate-400">
                {{ msg.name.charAt(0) }}
              </div>
              <div>
                <h4 class="text-sm font-black uppercase italic tracking-tight text-slate-900">{{ msg.name }}</h4>
                <p class="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">{{ msg.email }}</p>
              </div>
            </div>
            <span class="text-[9px] font-bold text-slate-300 uppercase italic">{{ msg.date }}</span>
          </div>

          <div class="space-y-2">
            <h5 class="text-xs font-bold text-slate-700 uppercase">{{ msg.subject }}</h5>
            <p class="text-xs text-slate-500 leading-relaxed line-clamp-2 italic">
              "{{ msg.message }}"
            </p>
          </div>

          <div class="mt-6 pt-4 border-t border-slate-50 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div class="flex gap-4">
              <button class="text-[10px] font-black uppercase tracking-widest text-primary hover:underline">Read Full Message</button>
              <button class="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-red-500">Delete</button>
            </div>
            <Icon name="solar:forward-2-linear" class="w-4 h-4 text-primary" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({ layout: 'admin' })

const messages = ref([
  {
    id: 1,
    name: "Alex Johnson",
    email: "alex@enterprise.com",
    subject: "Bespoke Web Ecosystem Inquiry",
    message: "Kami sedang mencari partner untuk membangun ulang sistem internal kami menggunakan Nuxt 3 dan Laravel. Apakah studio Anda tersedia untuk meeting minggu depan?",
    date: "12 Apr 2026",
    read: false
  },
  {
    id: 2,
    name: "Sarah Miller",
    email: "sarah.design@studio.io",
    subject: "Collaboration for UI/UX Project",
    message: "Halo! Saya melihat portfolio Digital Excellent dan sangat tertarik dengan gaya High-Fidelity UI Anda. Ada peluang untuk kolaborasi?",
    date: "10 Apr 2026",
    read: true
  }
])
</script>