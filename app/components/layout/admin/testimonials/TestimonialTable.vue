<template>
  <div class="bg-white dark:bg-[#16191E] border border-slate-200 dark:border-white/10 rounded-xl overflow-hidden shadow-sm transition-colors duration-300">
    <div class="overflow-x-auto">
      <table class="w-full border-separate border-spacing-0">
        <thead>
          <tr class="bg-slate-50/50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-white/5">
            <th class="th-style text-center w-16">No</th>
            <th class="th-style pl-6">Client Info</th>
            <th class="th-style">Comment</th>
            <th class="th-style text-center w-40">Track Row</th>
            <th class="th-style text-center w-44">Action Management</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100 dark:divide-slate-800/60 text-slate-700 dark:text-slate-300">
          
          <tr v-if="loading">
            <td colspan="5" class="px-4 py-12 text-center text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-600">
              <div class="flex items-center justify-center gap-2">
                <span class="animate-spin text-primary font-black text-base">◌</span>
                Loading testimonial data...
              </div>
            </td>
          </tr>

          <tr v-else-if="items.length === 0">
            <td colspan="5" class="px-4 py-12 text-center text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-600 italic">
              No testimonials found. Try creating a new one.
            </td>
          </tr>

          <tr v-else v-for="(item, index) in items" :key="item.id" class="hover:bg-slate-50/60 dark:hover:bg-slate-900/40 transition-all duration-300 group">
            <td class="px-4 py-3 text-center border-b border-slate-100/80 dark:border-white/5">
              <span class="text-[11px] font-black text-slate-400 dark:text-slate-600 tabular-nums">
                {{ String(index + 1).padStart(2, '0') }}
              </span>
            </td>

            <td class="px-4 py-3 pl-6 border-b border-slate-100/80 dark:border-white/5">
              <div class="flex justify-start items-center gap-3">
                <div class="w-8 h-8 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0 border border-slate-200/60 dark:border-white/10 shadow-sm">
                  <img :src="item.avatar ?? '/avatardefault_92824.webp'" class="w-full h-full object-cover" :alt="item.name" />
                </div>
                <div class="truncate">
                  <h4 class="text-[13px] font-bold text-slate-800 dark:text-slate-200 tracking-tight uppercase leading-tight truncate">
                    {{ item.name }}
                  </h4>
                  <span class="text-[10px] text-slate-400 font-medium uppercase tracking-wider block mt-0.5">
                    {{ item.position }}
                  </span>
                </div>
              </div>
            </td>

            <td class="px-4 py-3 border-b border-slate-100/80 dark:border-white/5 max-w-xs md:max-w-md">
              <p class="text-slate-500 dark:text-slate-400 line-clamp-2 italic tracking-wide text-xs">
                "{{ item.comment }}"
              </p>
            </td>

            <td class="px-4 py-3 text-center border-b border-slate-100/80 dark:border-white/5">
              <span v-if="item.row_placement === 1" class="inline-flex px-2.5 py-1 rounded-xl text-[9px] font-black uppercase tracking-[0.1em] bg-primary/10 text-primary border border-primary/20 transition-all duration-300">
                TRACK 1
              </span>
              <span v-else class="inline-flex px-2.5 py-1 rounded-xl text-[9px] font-black uppercase tracking-[0.1em] bg-blue-500/10 text-blue-500 border border-blue-500/20 transition-all duration-300">
                TRACK 2
              </span>
            </td>

            <td class="px-4 py-3 border-b border-slate-100/80 dark:border-white/5">
              <div class="flex justify-center gap-1.5">
                <button @click="emit('edit', item)" class="action-btn group/btn hover:bg-primary/5" title="Edit Testimonial">
                  <Icon name="solar:pen-new-square-bold" class="w-6 h-6 transition-colors duration-200 group-hover/btn:text-primary" />
                </button>

                <button @click="emit('delete', item.id!, item.name)" class="action-btn group/btn hover:bg-red-50 dark:hover:bg-red-500/10" title="Delete Testimonial">
                  <Icon name="solar:trash-bin-trash-bold" class="w-6 h-6 transition-colors duration-200 group-hover/btn:text-red-500" />
                </button>
              </div>
            </td>
          </tr>

        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Testimonial } from '~~/types';

defineProps<{
  items: Testimonial[]
  loading: boolean
}>()
const emit = defineEmits(['edit', 'delete'])
</script>

<style lang="postcss" scoped>
.th-style {
    @apply p-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-white/10 align-middle;
}

.action-btn {
    @apply p-2.5 text-slate-300 dark:text-slate-600 rounded-xl transition-all duration-200;
}
</style>