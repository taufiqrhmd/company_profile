<template>
  <div class="flex h-screen bg-[#0A0A0A] text-white overflow-hidden selection:bg-primary/30">
    <aside class="w-64 border-r border-white/5 bg-black/50 backdrop-blur-xl p-6 hidden lg:flex flex-col">
      <div class="mb-10 text-xl font-black tracking-tighter">
        DIGITAL EXCELLENT<span class="text-primary">.</span>
      </div>
      <nav class="flex-1 space-y-2">
        <div class="p-3 bg-primary/10 text-primary rounded-xl text-xs font-bold uppercase tracking-widest">Dashboard</div>
      </nav>
    </aside>

    <main class="flex-1 flex flex-col min-w-0">
      <header class="h-20 border-b border-white/5 flex items-center justify-between px-8 bg-black/20">
        <div class="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">Command Center</div>
      </header>

      <div class="flex-1 p-8 overflow-y-auto custom-scrollbar">
        <slot />
      </div>
    </main>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(212, 163, 46, 0.2); /* Warna primary transparan */
  border-radius: 10px;
}
</style>