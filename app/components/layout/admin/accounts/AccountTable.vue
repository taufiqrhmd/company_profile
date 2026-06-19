<template>
    <div
        class="bg-white dark:bg-[#16191E] border border-slate-200 dark:border-white/10 rounded-xl overflow-hidden shadow-sm transition-colors duration-300">
        <div class="overflow-x-auto">
            <table class="w-full border-separate border-spacing-0">
                <thead>
                    <tr class="bg-slate-50/50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-white/5">
                        <th class="th-style text-center w-12 px-4 py-3.5">No</th>
                        <th class="th-style text-center px-4 py-3.5">Full Name</th>
                        <th class="th-style text-center w-40 px-4 py-3.5">Username</th>
                        <th class="th-style text-center w-48 px-4 py-3.5">Access Rights / Role</th>
                        <th class="th-style text-center w-44 px-4 py-3.5">Action Management</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 dark:divide-slate-800/60 text-slate-700 dark:text-slate-300">
                    <tr v-if="isLoading">
                        <td colspan="5"
                            class="px-4 py-10 text-center text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-600">
                            <div class="flex items-center justify-center gap-2">
                                <span class="animate-spin text-primary font-black text-base">◌</span>
                                Loading account data...
                            </div>
                        </td>
                    </tr>

                    <tr v-else-if="accounts.length === 0">
                        <td colspan="5"
                            class="px-4 py-10 text-center text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-600 italic">
                            No additional account data available.
                        </td>
                    </tr>

                    <tr v-else v-for="(user, index) in accounts" :key="user.id"
                        class="hover:bg-slate-50/60 dark:hover:bg-slate-900/40 transition-all duration-300 group">
                        <td class="px-4 py-3 text-center border-b border-slate-100/80 dark:border-white/5">
                            <span class="text-[11px] font-black text-dark dark:text-slate-600 tabular-nums">
                                {{ String(index + 1).padStart(2, '0') }}
                            </span>
                        </td>

                        <td class="px-4 py-3 text-left border-b border-slate-100/80 dark:border-white/5">
                            <div class="flex justify-start items-center gap-3">
                                <div
                                    class="w-8 h-8 shrink-0 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-soft flex items-center justify-center font-black text-xs border border-slate-200/60 dark:border-white/10 uppercase shadow-sm group-hover:bg-primary transition-colors duration-300">
                                    {{ user.full_name?.charAt(0) || 'A' }}
                                </div>
                                <span
                                    class="text-[13px] font-bold text-slate-800 dark:text-slate-200 tracking-tight uppercase truncate">
                                    {{ user.full_name }}
                                </span>
                            </div>
                        </td>

                        <td
                            class="px-4 py-3 text-slate-400 dark:text-slate-500 font-mono text-xs border-b border-slate-100/80 dark:border-white/5 text-center">
                            @{{ user.username }}
                        </td>

                        <td class="px-4 py-3 text-center border-b border-slate-100/80 dark:border-white/5">
                            <span
                                :class="user.role === 'super_admin'
                                    ? 'bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-100 dark:border-purple-500/20'
                                    : 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-500/20'"
                                class="inline-flex px-2.5 py-1 rounded-xl text-[9px] font-black uppercase tracking-[0.1em] border transition-all duration-300">
                                {{ user.role === 'super_admin' ? 'Super Admin' : 'Editor / Creator' }}
                            </span>
                        </td>

                        <td class="px-4 py-3 border-b border-slate-100/80 dark:border-white/5">
                            <div class="flex justify-center gap-1.5">
                                <template v-if="user.id !== currentAdminId">
                                    <button @click="$emit('edit', user)"
                                        class="w-8 h-8 flex items-center justify-center rounded-xl text-slate-400 dark:text-slate-500 hover:text-primary hover:bg-amber-50 dark:hover:bg-amber-500/10 border border-transparent hover:border-amber-100 dark:hover:border-amber-500/20 transition-all duration-300"
                                        title="Edit Akun Anggota">
                                        <Icon name="solar:pen-new-square-bold" class="w-6 h-6" />
                                    </button>

                                    <button @click="$emit('delete', user)"
                                        class="w-8 h-8 flex items-center justify-center rounded-xl text-slate-400 dark:text-slate-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 border border-transparent hover:border-red-100 dark:hover:border-red-500/20 transition-all duration-300"
                                        title="Hapus Akun">
                                        <Icon name="solar:trash-bin-trash-bold" class="w-6 h-6" />
                                    </button>
                                </template>

                                <div v-else
                                    class="flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 dark:bg-slate-900 text-slate-400 dark:text-slate-500 border border-slate-100 dark:border-white/5 rounded-xl text-[9px] font-black uppercase tracking-wider italic select-none">
                                    <div class="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                                    Active Session
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script lang="ts" setup>
interface Account {
    id: string
    created_at: string
    username: string
    full_name: string
    role: 'super_admin' | 'editor'
}

defineProps<{
    accounts: Account[]
    isLoading: boolean
    currentAdminId: string
}>()

defineEmits<{
    (e: 'edit', account: Account): void
    (e: 'delete', account: Account): void
}>()
</script>

<style lang="postcss" scoped>
.th-style {
    @apply p-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-white/10 align-middle;
}
</style>