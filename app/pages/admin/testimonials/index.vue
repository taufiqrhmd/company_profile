<template>
    <div class="max-w-7xl mx-auto space-y-8 transition-colors duration-300">
        <div
            class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-6">
            <div>
                <h1 class="text-2xl md:text-3xl font-black uppercase tracking-tight">Testimonials</h1>
                <p class="text-xs md:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
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
                <h3 class="text-2xl font-black mt-1">{{ testimonials.length }}</h3>
            </div>
            <div class="p-5 bg-white dark:bg-[#16191E] border border-slate-200 dark:border-white/5 rounded-xl">
                <span class="text-[10px] font-bold uppercase tracking-widest text-primary">Row 1 (Left Track)</span>
                <h3 class="text-2xl font-black mt-1 text-primary">{{ countRow(1) }}</h3>
            </div>
            <div class="p-5 bg-white dark:bg-[#16191E] border border-slate-200 dark:border-white/5 rounded-xl">
                <span class="text-[10px] font-bold uppercase tracking-widest text-blue-500">Row 2 (Right Track)</span>
                <h3 class="text-2xl font-black mt-1 text-blue-500">{{ countRow(2) }}</h3>
            </div>
        </div>

        <LayoutAdminTestimonialsTestimonialTable :items="testimonials" :loading="isLoading" @edit="openEditModal"
            @delete="deleteItem" />

        <LayoutAdminTestimonialsTestimonialModal :is-open="isAddModalOpen" :is-edit-mode="isEditMode" :is-submitting="isSubmitting"
            :form="form" :errors="errors" @close="closeAddModal" @submit="handleCreateTestimonial" />
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, resolveComponent, h } from 'vue';
import { toast } from 'vue-sonner';

const BaseButtonComponent = resolveComponent('BaseButton');

definePageMeta({
    layout: 'admin',
    middleware: 'auth'
});

useHead({
    title: 'Testimonials Management',
});

interface TestimonialDB {
    id?: number;
    name: string;
    position: string;
    comment: string;
    avatar: string | null;
    row_placement: number | null;
}

const isAddModalOpen = ref(false);
const isSubmitting = ref(false);
const isEditMode = ref(false);
const editingId = ref<number | null>(null);
const isLoading = ref<boolean>(false);

const form = ref<TestimonialDB>({
    name: '',
    position: '',
    comment: '',
    avatar: '',
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
    form.value = { name: '', position: '', comment: '', avatar: '', row_placement: 1 };
    isAddModalOpen.value = true;
};

const openEditModal = (item: TestimonialDB) => {
    isEditMode.value = true;
    clearErrors();
    editingId.value = item.id || null;
    form.value = { ...item };
    isAddModalOpen.value = true;
};

const closeAddModal = () => {
    isAddModalOpen.value = false;
    clearErrors();
};

const supabase = useSupabaseClient();
const testimonials = ref<TestimonialDB[]>([]);
let realtimeChannel: any = null;

const loadData = async () => {
    isLoading.value = true;
    try {
        const { data, error } = await supabase
            .from('testimonials')
            .select('id, name, position, comment, avatar, row_placement')
            .order('id', { ascending: false });

        if (error) throw error;
        if (data) testimonials.value = data;
    } catch (error: any) {
        console.error('Failed to load dashboard testimonials:', error.message);
        toast.error('Failed to fetch testimonials data.');
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
    if (form.value.avatar && form.value.avatar.trim() !== '') {
        const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;
        if (!urlPattern.test(form.value.avatar)) {
            errors.value.avatar = 'Please enter a valid URL structure (e.g., https://...)';
            isValid = false;
        }
    }

    return isValid;
};

const handleCreateTestimonial = async () => {
    if (!validateForm()) {
        toast.warning('Please review and correct the marked form fields.');
        return;
    }

    isSubmitting.value = true;
    const processingMsg = isEditMode.value ? 'Updating testimonial...' : 'Adding new testimonial...';
    const toastId = toast.loading(processingMsg);

    const { id, ...payload } = form.value;

    try {
        if (isEditMode.value && editingId.value) {
            const { error } = await supabase
                .from('testimonials')
                .update({
                    name: payload.name,
                    position: payload.position,
                    comment: payload.comment,
                    avatar: payload.avatar || null,
                    row_placement: payload.row_placement
                })
                .eq('id', editingId.value);

            if (error) throw error;
            toast.success('Testimonial updated successfully!', { id: toastId });
        } else {
            const { error } = await supabase
                .from('testimonials')
                .insert([payload]);

            if (error) throw error;
            toast.success('New testimonial added successfully!', { id: toastId });
        }
        closeAddModal();
    } catch (e: any) {
        console.error('Operation failed:', e);
        toast.error(e.message || 'An error occurred while saving.', { id: toastId });
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
    const toastId = toast.loading(`Deleting testimonial from ${name}...`);
    try {
        const { error } = await supabase.from('testimonials').delete().eq('id', id);
        if (error) throw error;
        toast.success('Testimonial deleted successfully from the system.', { id: toastId });
    } catch (error: any) {
        console.error('Delete testimonial failed:', error);
        toast.error(error.message || 'Failed to delete the testimonial.', { id: toastId });
    }
};

onMounted(async () => {
    await loadData();
    if (!import.meta.client) return;
    realtimeChannel = supabase
        .channel('dashboard:testimonials')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'testimonials' }, () => { loadData(); })
        .subscribe();
});

onUnmounted(() => {
    if (realtimeChannel) supabase.removeChannel(realtimeChannel);
});
</script>