<template>
  <div class="max-w-7xl mx-auto space-y-10">
    <header>
      <div class="flex items-center gap-3 mb-2">
        <div class="w-8 h-[2px] bg-primary"></div>
        <span class="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Overview</span>
      </div>
      <h2 class="text-5xl font-black uppercase tracking-tighter italic text-white">System <span class="text-primary">Status</span></h2>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="col-span-2 p-8 bg-white/[0.02] rounded-[2.5rem] border border-white/5 h-96">
        </div>
      <div class="p-8 bg-white/[0.02] rounded-[2.5rem] border border-white/5 flex items-center justify-center">
        <p class="text-white/20 text-xs uppercase tracking-widest font-black">Active Nodes</p>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin'
})
</script>