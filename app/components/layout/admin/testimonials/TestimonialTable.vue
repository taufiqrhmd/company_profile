<script setup lang="ts">
interface TestimonialDB {
  id?: number;
  name: string;
  position: string;
  comment: string;
  avatar: string | null;
  row_placement: number | null;
}

defineProps<{
  items: TestimonialDB[]
  loading: boolean
}>()

const emit = defineEmits<{
  (e: 'edit', item: TestimonialDB): void
  (e: 'delete', id: number, name: string): void
}>()
</script>

<template>
  <div class="bg-white dark:bg-[#16191E] border border-slate-200 dark:border-white/10 rounded-xl overflow-hidden shadow-sm transition-colors duration-300">
    <div class="overflow-x-auto">
      <table class="w-full border-separate border-spacing-0 text-left table-auto">
        <thead>
          <tr class="bg-slate-50/50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-white/5 text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            <th class="px-4 py-3.5 text-center w-12">No</th>
            <th class="px-4 py-3.5 pl-6">Client Info</th>
            <th class="px-4 py-3.5">Comment</th>
            <th class="px-4 py-3.5 text-center w-40">Track Row</th>
            <th class="px-4 py-3.5 text-center w-44">Action Management</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100 dark:divide-slate-800/60 text-slate-700 dark:text-slate-300 text-sm">
          
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
                  <img :src="item.avatar ?? 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200'" class="w-full h-full object-cover" :alt="item.name" />
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
                <button @click="emit('edit', item)" class="w-8 h-8 flex items-center justify-center rounded-xl text-slate-400 dark:text-slate-500 hover:text-primary hover:bg-amber-50 dark:hover:bg-amber-500/10 border border-transparent hover:border-amber-100 dark:hover:border-amber-500/20 transition-all duration-300" title="Edit Testimonial">
                  <Icon name="solar:pen-bold" class="w-4 h-4" />
                </button>

                <button @click="emit('delete', item.id!, item.name)" class="w-8 h-8 flex items-center justify-center rounded-xl text-slate-400 dark:text-slate-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 border border-transparent hover:border-red-100 dark:hover:border-red-500/20 transition-all duration-300" title="Delete Testimonial">
                  <Icon name="solar:trash-bin-trash-bold" class="w-4 h-4" />
                </button>
              </div>
            </td>
          </tr>

        </tbody>
      </table>
    </div>
  </div>
</template>