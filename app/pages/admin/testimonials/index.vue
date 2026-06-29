<template>
    <div class="max-w-7xl mx-auto space-y-8 transition-colors duration-300">
        <div
            class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
                <h1 class="text-2xl md:text-3xl font-black uppercase tracking-tight">Testimonials</h1>
                <p class="text-xs md:text-sm text-neutral-500 dark:text-neutral-400">
                    Manage client social proof displaying on the main landing page.
                </p>
            </div>
            <BaseButton variant="primary" size="md" rounded="xl" icon="solar:add-circle-bold" iconPos="left"
                @click="openAddModal()">
                Add New Review
            </BaseButton>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div class="p-5 bg-white dark:bg-[#16191E] border border-slate-200 dark:border-white/5 rounded-xl">
                <span class="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Total Reviews</span>
                <h3 class="text-2xl font-black mt-1">{{ animatedTotal.toString().padStart(2, '0') }}</h3>
            </div>
            <div class="p-5 bg-white dark:bg-[#16191E] border border-slate-200 dark:border-white/5 rounded-xl">
                <span class="text-[10px] font-bold uppercase tracking-widest text-primary">Row 1 (Left Track)</span>
                <h3 class="text-2xl font-black mt-1 text-primary">{{ animatedRow1.toString().padStart(2, '0') }}</h3>
            </div>
            <div class="p-5 bg-white dark:bg-[#16191E] border border-slate-200 dark:border-white/5 rounded-xl">
                <span class="text-[10px] font-bold uppercase tracking-widest text-blue-500">Row 2 (Right Track)</span>
                <h3 class="text-2xl font-black mt-1 text-blue-500">{{ animatedRow2.toString().padStart(2, '0') }}</h3>
            </div>
        </div>

        <LayoutAdminTestimonialsTestimonialTable :items="testimonials" :loading="isLoading" @edit="openEditModal"
            @delete="deleteItem" />

        <LayoutAdminTestimonialsTestimonialModal :is-open="isAddModalOpen" :is-edit-mode="isEditMode"
            :is-submitting="isSubmitting" :form="form" :errors="errors" @close="closeAddModal"
            @submit="handleCreateTestimonial" />
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, resolveComponent, h } from 'vue';
import { toast } from 'vue-sonner';
import type { Testimonial, TestimonialInsert } from '~~/types';

const BaseButtonComponent = resolveComponent('BaseButton');

definePageMeta({
    layout: 'admin',
    middleware: 'auth'
});

useHead({
    title: 'Testimonials Management',
});

const isAddModalOpen = ref(false);
const isSubmitting = ref(false);
const isEditMode = ref(false);
const editingId = ref<number | null>(null);
const isLoading = ref<boolean>(false);
const testimonials = ref<Testimonial[]>([]);
const { animateValue } = useAnimatedCounter();

const animatedTotal = ref(0);
const animatedRow1 = ref(0);
const animatedRow2 = ref(0);

const form = ref<TestimonialInsert>({
    name: '',
    position: '',
    comment: '',
    row_placement: 1
});

const errors = ref({
    name: '',
    position: '',
    avatar: '',
    comment: ''
});

const clearErrors = () => {
    errors.value = { name: '', position: '', avatar: '', comment: '' };
};

const openAddModal = () => {
    isEditMode.value = false;
    clearErrors();
    form.value = { name: '', position: '', comment: '',  row_placement: 1 };
    isAddModalOpen.value = true;
};

const openEditModal = (item: Testimonial) => {
    isEditMode.value = true;
    clearErrors();
    editingId.value = item.id;
    const { id, created_at, ...rest } = item;
    form.value = {
        ...rest,
        row_placement: item.row_placement ?? 1
    };
    isAddModalOpen.value = true;
};

const closeAddModal = () => {
    isAddModalOpen.value = false;
    clearErrors();
};

const supabase = useSupabaseClient();
let realtimeChannel: any = null;

const loadData = async () => {
    console.log("--- loadData dipanggil, waktu:", new Date().toLocaleTimeString(), "---");

    // Deteksi jika dipanggil terlalu cepat (dalam hitungan milidetik)
    // Jika dalam 1 detik dipanggil lebih dari 3 kali, hentikan!
    isLoading.value = true;
    try {
        const data = await $fetch<Testimonial[]>('/api/testimonials');
        testimonials.value = data;
    } catch (error: any) {
        toast.error('Failed to fetch testimonials.');
    } finally {
        isLoading.value = false;
    }
};

const validateForm = (): boolean => {
    clearErrors();
    let isValid = true;

    if (!form.value.name.trim()) {
        errors.value.name = 'Client name is required.';
        isValid = false;
    }
    if (!form.value.position.trim()) {
        errors.value.position = 'Position or company name is required.';
        isValid = false;
    }
    if (!form.value.comment.trim()) {
        errors.value.comment = 'Testimonial comment cannot be left blank.';
        isValid = false;
    }

    return isValid;
};

const handleCreateTestimonial = async () => {
    if (!validateForm()) {
        toast.warning('Please review and correct the marked form fields.');
        return;
    }

    isSubmitting.value = true;
    const toastId = toast.loading(isEditMode.value ? 'Updating...' : 'Adding...');

    try {
        // Gunakan pola endpoint yang sama
        const method = isEditMode.value ? 'PUT' : 'POST';
        const endpoint = isEditMode.value ? `/api/testimonials/${editingId.value}` : '/api/testimonials';

        const response = await $fetch<any>(endpoint, {
            method: method,
            body: form.value,
            // PENTING: Kirim cookie agar server bisa validasi session Admin
            headers: useRequestHeaders(['cookie']) as Record<string, string>
        });

        // Cek flag success dari server
        if (response?.success) {
            toast.success(isEditMode.value ? 'Updated!' : 'Added!', { id: toastId });
            closeAddModal();
            await loadData();
        } else {
            throw new Error('Failed to save data');
        }

    } catch (error: any) {
        console.error('Operation failed:', error);
        const msg = error.data?.statusMessage || 'An error occurred.';
        toast.error(msg, { id: toastId });
    } finally {
        isSubmitting.value = false;
    }
};

const countRow = (rowNum: number) => {
    return testimonials.value.filter(item => item.row_placement === rowNum).length;
};

const deleteItem = (id: number, name: string) => {
    const toastId = toast.custom(() => {
        return h(
            'div',
            { class: 'p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-lg flex flex-col gap-4 w-[350px]' },
            [
                h('div', { class: 'flex items-start gap-3' }, [
                    h(resolveComponent('Icon'), {
                        name: 'heroicons:exclamation-triangle-20-solid',
                        class: 'w-5 h-5 text-amber-500 shrink-0 mt-0.5'
                    }),
                    h('div', { class: 'flex flex-col gap-1' }, [
                        h('h3', { class: 'text-sm font-semibold text-zinc-950 dark:text-zinc-50' }, 'Confirm Testimonial Deletion'),
                        h('p', { class: 'text-xs text-slate-500 dark:text-slate-400 leading-normal' }, `Are you sure you want to permanently delete testimonial from "${name}"?`)
                    ])
                ]),
                h('div', { class: 'flex justify-end gap-2' }, [
                    h(BaseButtonComponent, {
                        variant: 'ghost',
                        size: 'sm',
                        class: '!px-3 !py-1.5 !text-xs text-zinc-700 dark:text-zinc-300',
                        onClick: () => toast.dismiss(toastId)
                    }, () => 'Cancel'),
                    h(BaseButtonComponent, {
                        variant: 'dark',
                        size: 'sm',
                        class: '!px-3 !py-1.5 !text-xs !bg-red-600 hover:!bg-red-700 !text-white shadow-sm border-none',
                        onClick: () => {
                            executeDelete(id, name);
                            toast.dismiss(toastId);
                        }
                    }, () => 'Delete Now')
                ])
            ]
        );
    }, { duration: Infinity });
};

const executeDelete = async (id: number, name: string) => {
    try {
        await $fetch(`/api/testimonials/${id}`, { method: 'DELETE' });
        toast.success('Deleted successfully');
        loadData(); // Refresh data
    } catch (error) {
        toast.error('Delete failed');
    }
};

onMounted(async () => {
    await loadData();
    if (!import.meta.client) return;
    realtimeChannel = supabase
        .channel('dashboard:testimonials')
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'testimonials' }, () => { loadData(); })
        .subscribe();
});

onUnmounted(() => {
    if (realtimeChannel) supabase.removeChannel(realtimeChannel);
});

watch(testimonials, (newVal) => {
    const total = newVal.length;
    const row1 = newVal.filter(i => i.row_placement === 1).length;
    const row2 = newVal.filter(i => i.row_placement === 2).length;

    animateValue(0, total, 1000, (val) => animatedTotal.value = val);
    animateValue(0, row1, 1000, (val) => animatedRow1.value = val);
    animateValue(0, row2, 1000, (val) => animatedRow2.value = val);
}, { deep: true });
</script>