<template>
    <div
        class="bg-white dark:bg-[#16191E] border border-slate-200 dark:border-white/10 rounded-xl overflow-hidden shadow-sm transition-colors">
        <div class="overflow-x-auto">
            <table class="w-full border-separate border-spacing-0">
                <thead>
                    <tr class="bg-slate-50/50 dark:bg-slate-900/50">
                        <th class="th-style text-center w-16">No</th>
                        <th class="th-style">Asset & Project Name</th>
                        <th class="th-style text-center">Category</th>
                        <th class="th-style text-center">Impact Metric</th>
                        <th class="th-style text-right">Action</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 dark:divide-slate-700">
                    <tr v-if="loading">
                        <td colspan="5"
                            class="p-10 text-center text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-600">
                            <div class="flex items-center justify-center gap-2">
                                <span class="animate-spin text-primary font-black text-base">◌</span>
                                Loading vault assets...
                            </div>
                        </td>
                    </tr>

                    <tr v-else-if="items.length === 0">
                        <td colspan="5"
                            class="p-10 text-center text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-600 italic">
                            No digital works currently vaulted.
                        </td>
                    </tr>

                    <tr v-else v-for="(project, index) in items" :key="project.id"
                        class="hover:bg-slate-50/80 dark:hover:bg-slate-900/40 transition-all duration-300 group">

                        <td class="p-6 text-center">
                            <span class="text-[11px] font-black text-dark dark:text-slate-600 tabular-nums">
                                {{ formatIndex((currentPage - 1) * itemsPerPage + index) }}
                            </span>
                        </td>

                        <td class="p-6">
                            <div class="flex items-center gap-5">
                                <div
                                    class="relative w-24 h-16 rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900 shadow-sm shrink-0">
                                    <img :src="project.image" :alt="project.title"
                                        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                                </div>
                                <div class="space-y-1.5">
                                    <div class="flex items-center gap-2">
                                        <Icon :name="project.icon || 'heroicons:cube'" class="w-4 h-4 text-primary" />
                                        <h3
                                            class="text-[13px] font-black uppercase italic tracking-tight text-slate-800 dark:text-slate-200">
                                            {{ project.title }}
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        </td>

                        <td class="p-6 text-center">
                            <span
                                class="inline-flex px-4 py-1.5 bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-300 rounded-xl text-[9px] font-black uppercase tracking-[0.1em]">
                                {{ project.project_details?.category || 'General' }}
                            </span>
                        </td>

                        <td class="p-6">
                            <div class="flex flex-col items-center">
                                <div
                                    class="px-3 py-1 bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 rounded-lg border border-green-100 dark:border-green-500/20 flex items-center gap-2 mb-1">
                                    <div class="w-1 h-1 bg-green-500 rounded-full"></div>
                                    <span class="text-[11px] font-black">{{ project.impact }}</span>
                                </div>
                                <span
                                    class="text-[8px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-tighter italic">
                                    {{ project.impact_label }}
                                </span>
                            </div>
                        </td>

                        <td class="p-6 pr-4 text-right">
                            <div class="flex justify-end gap-1">
                                <button @click="$emit('edit', project)" class="action-btn group/btn hover:bg-primary/5">
                                    <Icon name="solar:pen-new-square-bold"
                                        class="w-6 h-6 transition-colors duration-200 group-hover/btn:text-primary" />
                                </button>
                                <button @click="$emit('delete', project.id)"
                                    class="action-btn group/btn hover:bg-red-50 dark:hover:bg-red-500/10">
                                    <Icon name="solar:trash-bin-trash-bold"
                                        class="w-6 h-6 transition-colors duration-200 group-hover/btn:text-red-500" />
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div
            class="flex items-center justify-between p-6 border-t border-slate-100 dark:border-white/10 bg-slate-50/30 dark:bg-slate-900/20">
            <p class="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Showing <span class="font-bold text-slate-800 dark:text-white">{{ totalItems === 0 ? 0 : (currentPage -
                    1) * itemsPerPage + 1 }}</span>
                to <span class="font-bold text-slate-800 dark:text-white">{{ Math.min(currentPage * itemsPerPage,
                    totalItems) }}</span>
                of <span class="font-bold text-slate-800 dark:text-white">{{ totalItems }}</span> entries
            </p>

            <div class="flex items-center gap-2">
                <button @click="$emit('prev-page')" :disabled="currentPage === 1"
                    class="px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 text-[10px] font-black uppercase tracking-wider text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-800 disabled:opacity-40 transition-colors">
                    Prev
                </button>
                <button @click="$emit('next-page')" :disabled="currentPage === totalPages"
                    class="px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 text-[10px] font-black uppercase tracking-wider text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-800 disabled:opacity-40 transition-colors">
                    Next
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
defineProps<{
    items: any[]
    loading: boolean
    currentPage: number
    itemsPerPage: number
    totalPages: number
    totalItems: number
}>()

defineEmits(['edit', 'delete', 'prev-page', 'next-page'])

const formatIndex = (i: number) => (i + 1).toString().padStart(2, '0')
</script>

<style lang="postcss" scoped>
.th-style {
    @apply p-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-white/10 align-middle;
}

.action-btn {
    @apply p-2.5 text-slate-300 dark:text-slate-600 rounded-xl transition-all duration-200;
}
</style>