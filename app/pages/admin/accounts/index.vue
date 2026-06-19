<template>
  <div class="max-w-7xl mx-auto space-y-8 transition-colors duration-300">

    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
      <div class="space-y-1">
        <h1 class="text-3xl font-black uppercase tracking-tighter text-slate-900 dark:text-white">
          Manage Accounts
        </h1>
        <p class="text-slate-500 dark:text-slate-400 text-sm">
          Add, edit, or remove administrator and editor accounts with ease. Control access levels and maintain security
          for your team.
        </p>
      </div>

      <BaseButton variant="primary" size="md" rounded="xl" icon="solar:add-circle-bold" iconPos="left"
        @click="openAddModal">
        Create New Account
      </BaseButton>
    </div>

    <LayoutAdminAccountsAccountTable :accounts="accounts" :is-loading="isLoading" :current-admin-id="currentAdminId"
      @edit="openEditModal" @delete="handleDelete" />

    <LayoutAdminAccountsAccountModal v-model="showModal" :is-edit-mode="isEditMode" :is-submitting="isSubmitting"
      :form-data="form" @submit="handleSubmit" />

  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, computed, resolveComponent, h } from 'vue'
import { toast } from 'vue-sonner'

// Resolver untuk component dinamis di react h() toast kustom
const BaseButtonComponent = resolveComponent('BaseButton')

definePageMeta({
  layout: 'admin',
  middleware: ['auth']
})

useHead({
  title: 'Accounts Management',
})

interface Account {
  id: string
  created_at: string
  username: string
  full_name: string
  role: 'super_admin' | 'editor'
}

const accounts = ref<Account[]>([])
const isLoading = ref<boolean>(false)
const isSubmitting = ref<boolean>(false)
const showModal = ref<boolean>(false)
const isEditMode = ref<boolean>(false)
const targetAccountId = ref<string | null>(null)

const adminUser = useState<any>('adminUser')
const currentAdminId = computed(() => adminUser.value?.id || '')

// State mentah untuk dikirim ke child prop modal data
const form = reactive({
  full_name: '',
  username: '',
  role: 'editor',
  password: '',
})

const openAddModal = () => {
  isEditMode.value = false
  targetAccountId.value = null
  form.full_name = ''
  form.username = ''
  form.role = 'editor'
  form.password = ''
  showModal.value = true
}

const openEditModal = (account: Account) => {
  isEditMode.value = true
  targetAccountId.value = account.id
  form.full_name = account.full_name
  form.username = account.username
  form.role = account.role
  showModal.value = true
}

const fetchAccounts = async () => {
  isLoading.value = true
  try {
    const response = await $fetch<any>('/api/admin_accounts', {
      method: 'GET',
      headers: useRequestHeaders(['cookie']) as Record<string, string>
    })
    if (response?.success) {
      accounts.value = response.data || []
    }
  } catch (error: any) {
    console.error('Fetch accounts failed:', error)
    toast.error('Failed to fetch accounts.')
  } finally {
    isLoading.value = false
  }
}

const handleSubmit = async (localFormPayload: any) => {
  isSubmitting.value = true
  const processingMsg = isEditMode.value ? 'Updating account data...' : 'Processing account registration...'
  const toastId = toast.loading(processingMsg)

  // 1. Buat salinan payload agar bisa kita modifikasi
  const payload = { ...localFormPayload };
  
  // 2. Jika edit mode dan password kosong, jangan kirim field password agar tidak di-update
  if (isEditMode.value && (!payload.password || payload.password.trim() === '')) {
    delete payload.password;
  }

  try {
    const method = isEditMode.value ? 'PUT' : 'POST'
    const endpoint = isEditMode.value ? `/api/admin_accounts?id=${targetAccountId.value}` : '/api/admin_accounts'

    const response = await $fetch<any>(endpoint, {
      method: method,
      body: payload, 
      headers: useRequestHeaders(['cookie']) as Record<string, string>
    })

    if (response?.success) {
      const successMsg = isEditMode.value ? 'Account updated successfully!' : 'New account registered successfully!'
      toast.success(successMsg, { id: toastId })
      showModal.value = false
      await fetchAccounts()
    }
  } catch (error: any) {
    console.error('Operation failed:', error)
    const msg = error.data?.message || 'An error occurred on the server.'
    toast.error(msg, { id: toastId })
  } finally {
    isSubmitting.value = false
  }
}

const handleDelete = (account: Account) => {
  if (account.id === currentAdminId.value) {
    toast.error('You are not allowed to delete your own active account!')
    return
  }

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
            h('h3', { class: 'text-sm font-semibold text-zinc-950 dark:text-zinc-50' }, 'Confirm Account Deletion'),
            h('p', { class: 'text-xs text-slate-500 dark:text-slate-400 leading-normal' }, `Are you sure you want to permanently delete "${account.full_name}"?`)
          ])
        ]),
        h('div', { class: 'flex justify-end gap-2' }, [
          h(
            BaseButtonComponent,
            {
              variant: 'ghost',
              size: 'sm',
              class: '!px-3 !py-1.5 !text-xs text-zinc-700 dark:text-zinc-300',
              onClick: () => toast.dismiss(toastId)
            },
            () => 'Cancel'
          ),
          h(
            BaseButtonComponent,
            {
              variant: 'dark',
              size: 'sm',
              class: '!px-3 !py-1.5 !text-xs !bg-red-600 hover:!bg-red-700 !text-white shadow-sm border-none',
              onClick: () => {
                executeDelete(account.id, account.full_name);
                toast.dismiss(toastId);
              }
            },
            () => 'Delete Now'
          )
        ])
      ]
    )
  }, { duration: Infinity })
}

const executeDelete = async (id: string, name: string) => {
  const toastId = toast.loading(`Deleting account ${name}...`)
  try {
    const response = await $fetch<any>(`/api/admin_accounts?id=${id}`, {
      method: 'DELETE',
      headers: useRequestHeaders(['cookie']) as Record<string, string>
    })

    if (response?.success) {
      toast.success('Account deleted successfully from the system.', { id: toastId })
      await fetchAccounts()
    }
  } catch (error: any) {
    console.error('Delete account failed:', error)
    const msg = error.data?.message || 'Failed to delete the account.'
    toast.error(msg, { id: toastId })
  }
}

onMounted(async () => {
  await fetchAccounts()
})
</script>