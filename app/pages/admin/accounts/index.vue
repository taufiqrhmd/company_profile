<template>
  <div class="max-w-7xl mx-auto space-y-8 transition-colors duration-300">

    <div
      class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 ">
      <div class="space-y-1">
        <h1 class="text-3xl font-black uppercase tracking-tighter text-slate-900 dark:text-white">
          Manage Accounts
        </h1>
        <p class="text-slate-500 dark:text-slate-400 text-sm">
          Add, edit, or remove administrator and editor accounts with ease. Control access levels and maintain security
          for your team.
        </p>
      </div>
      <button @click="openAddModal"
        class="bg-primary text-white px-6 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest hover:scale-105 transition-transform shadow-lg shadow-primary/20">
        Create New Account
      </button>
    </div>

    <div class="bg-white dark:bg-[#16191E] border border-slate-200 dark:border-white/10 rounded-xl overflow-hidden shadow-sm transition-colors duration-300">
      <div class="overflow-x-auto">
        <table class="w-full border-separate border-spacing-0 text-left table-auto">
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
                <span
                  class="text-[11px] font-black text-slate-300 dark:text-slate-600 group-hover:text-primary transition-colors tabular-nums">
                  {{ String(index + 1).padStart(2, '0') }}
                </span>
              </td>

              <td class="px-4 py-3 text-left border-b border-slate-100/80 dark:border-white/5">
                <div class="flex justify-start items-center gap-3">
                  <div
                    class="w-8 h-8 shrink-0 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-primary flex items-center justify-center font-black text-xs border border-slate-200/60 dark:border-white/10 uppercase shadow-sm group-hover:border-primary/30 transition-colors duration-300">
                    {{ user.full_name?.charAt(0) || 'A' }}
                  </div>
                  <span
                    class="text-[13px] font-bold text-slate-800 dark:text-slate-200 tracking-tight uppercase group-hover:text-primary transition-colors duration-300 truncate">
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
                    <button @click="openEditModal(user)"
                      class="w-8 h-8 flex items-center justify-center rounded-xl text-slate-400 dark:text-slate-500 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-500/10 border border-transparent hover:border-amber-100 dark:hover:border-amber-500/20 transition-all duration-300"
                      title="Edit Akun Anggota">
                      <Icon name="solar:pen-bold" class="w-4 h-4" />
                    </button>

                    <button @click="handleDelete(user.id, user.full_name)"
                      class="w-8 h-8 flex items-center justify-center rounded-xl text-slate-400 dark:text-slate-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 border border-transparent hover:border-red-100 dark:hover:border-red-500/20 transition-all duration-300"
                      title="Hapus Akun">
                      <Icon name="solar:trash-bin-trash-bold" class="w-4 h-4" />
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

    <Teleport to="body">
      <Transition name="fade">
        <div v-if="showModal"
          class="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-sm p-4">
          <div
            class="bg-white dark:bg-[#16191E] w-full max-w-md rounded-xl shadow-2xl overflow-hidden flex flex-col border border-transparent dark:border-white/5 animate-in fade-in zoom-in-95 duration-200">

            <div class="p-6 pb-4 flex justify-between items-center border-b border-slate-100 dark:border-white/5">
              <h3 class="text-xl font-black uppercase tracking-tighter text-slate-800 dark:text-white">
                {{ isEditMode ? 'Update Account Access' : 'Register New Account' }}
              </h3>
              <button @click="closeModal"
                class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                <Icon name="solar:close-circle-bold" class="w-7 h-7" />
              </button>
            </div>

            <form @submit.prevent="handleSubmit" class="p-6 space-y-5">
              <div class="space-y-2">
                <label
                  class="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider pl-1">Full
                  Name</label>
                <input v-model="form.full_name" type="text" placeholder="Example: Alex Chandra"
                  class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition duration-300 placeholder:text-slate-400/70"
                  required />
              </div>

              <div class="space-y-2">
                <label
                  class="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider pl-1">Username
                  (For Login)</label>
                <input v-model="form.username" type="text" placeholder="Example: alexchandra"
                  class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition duration-300 font-mono placeholder:text-slate-400/70"
                  required />
              </div>

              <div class="space-y-2">
                <label
                  class="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider pl-1">
                  {{ isEditMode ? 'Change Password (Leave blank if not changing)' : 'Temporary Password' }}
                </label>
                <input v-model="form.password" type="password"
                  :placeholder="isEditMode ? 'Fill only if you want to reset the staff password' : 'At least 6 characters'"
                  class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition duration-300 placeholder:text-slate-400/70"
                  :required="!isEditMode" />
              </div>

              <div class="space-y-2">
                <label
                  class="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider pl-1">Right
                  System Access</label>
                <div class="relative">
                  <select v-model="form.role"
                    class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition duration-300 appearance-none cursor-pointer">
                    <option value="editor">Editor / Creator (Landing Content Control)</option>
                    <option value="super_admin">Super Admin (Full Control & Accounts)</option>
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                    <Icon name="solar:alt-arrow-down-linear" class="w-4 h-4" />
                  </div>
                </div>
              </div>

              <div class="pt-4 flex items-center justify-end gap-3 border-t border-slate-100 dark:border-white/5">
                <button type="button" @click="closeModal"
                  class="px-5 py-2.5 text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 hover:bg-slate-50 dark:hover:bg-white/5 rounded-xl transition-all duration-300">
                  Cancel
                </button>
                <button type="submit" :disabled="isSubmitting"
                  class="px-5 py-2.5 text-[10px] font-black uppercase tracking-wider text-black bg-primary hover:bg-slate-800 hover:text-white disabled:opacity-50 rounded-xl shadow-md transition-all duration-300">
                  {{ isSubmitting ? 'Saving...' : (isEditMode ? 'Save Changes' : 'Register Account') }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Transition>
    </Teleport>

  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import { toast } from 'vue-sonner'

// Set Meta Page (Gunakan global middleware auth yang terpusat)
definePageMeta({
  layout: 'admin',
  middleware: ['auth']
})

useHead({
  title: 'Accounts Management',
})

// Interfaces
interface Account {
  id: string
  created_at: string
  username: string
  full_name: string
  role: 'super_admin' | 'editor'
}

// State Management
const accounts = ref<Account[]>([])
const isLoading = ref<boolean>(false)
const isSubmitting = ref<boolean>(false)
const showModal = ref<boolean>(false)

const isEditMode = ref<boolean>(false)
const targetAccountId = ref<string | null>(null)

// Tarik data Admin Aktif dari state global Nuxt untuk mencegah hapus diri sendiri
const adminUser = useState<any>('adminUser')
const currentAdminId = computed(() => adminUser.value?.id || '')
const IconComponent = resolveComponent('Icon')

// Form State
const form = reactive({
  full_name: '',
  username: '',
  password: '',
  role: 'editor'
})

// Reset Form Data
const resetForm = () => {
  form.full_name = ''
  form.username = ''
  form.password = ''
  form.role = 'editor'
  isEditMode.value = false
  targetAccountId.value = null
}

// Open & Close Modal Controller
const openAddModal = () => {
  isEditMode.value = false
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  resetForm()
}

const openEditModal = (account: Account) => {
  isEditMode.value = true
  targetAccountId.value = account.id
  form.full_name = account.full_name
  form.username = account.username
  form.role = account.role
  form.password = '' // Kosongkan password agar tidak terekspos, diisi jika mau ganti saja
  showModal.value = true
}

// FETCH DATA: Mengambil list seluruh akun dari backend
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

// SUBMIT DATA: Mendaftarkan administrator/editor baru
const handleSubmit = async () => {
  // Jika registrasi baru, password wajib diisi
  if (!form.full_name || !form.username || (!isEditMode.value && !form.password)) {
    toast.warning('Please complete the required form fields.')
    return
  }

  isSubmitting.value = true
  const processingMsg = isEditMode.value ? 'Updating account data...' : 'Processing account registration...'
  const toastId = toast.loading(processingMsg)

  try {
    // Tentukan metode HTTP dan URL endpoint
    const method = isEditMode.value ? 'PUT' : 'POST'
    const endpoint = isEditMode.value ? `/api/admin_accounts?id=${targetAccountId.value}` : '/api/admin_accounts'

    const response = await $fetch<any>(endpoint, {
      method: method,
      body: form,
      headers: useRequestHeaders(['cookie']) as Record<string, string>
    })

    if (response?.success) {
      const successMsg = isEditMode.value ? 'Account updated successfully!' : 'New account registered successfully!'
      toast.success(successMsg, { id: toastId })
      closeModal()
      await fetchAccounts() // Refresh data grid tabel
    }
  } catch (error: any) {
    console.error('Operation failed:', error)
    const msg = error.data?.message || 'An error occurred on the server.'
    toast.error(msg, { id: toastId })
  } finally {
    isSubmitting.value = false
  }
}

// DELETE DATA: Menghapus akses akun tertentu
const handleDelete = (id: string, name: string) => {
  if (id === currentAdminId.value) {
    toast.error('You are not allowed to delete your own active account!')
    return
  }

  // Panggil custom toast, tangkap parameter 't' bawaan Vue Sonner untuk menutup dirinya sendiri
  const toastId = toast.custom(() => {
    return h(
      'div',
      { 
        class: 'p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-lg flex flex-col gap-4 w-[350px]' 
      },
      [
        // Bagian Atas: Ikon dari Component + Konten Teks
        h('div', { class: 'flex items-start gap-3' }, [
          
          // 2. Menggunakan komponen Icon Anda sendiri
          h(IconComponent, {
            name: 'heroicons:exclamation-triangle-20-solid', // Sesuaikan dengan nama ikon di project Anda
            class: 'w-5 h-5 text-amber-500 shrink-0 mt-0.5'
          }),

          // Wadah Teks
          h('div', { class: 'flex flex-col gap-1' }, [
            h('h3', { class: 'text-sm font-semibold text-zinc-950 dark:text-zinc-50' }, 'Confirm Account Deletion'),
            h('p', { class: 'text-xs text-slate-500 dark:text-slate-400 leading-normal' }, `Are you sure you want to permanently delete "${name}"?`)
          ])
        ]),
        
        // Bagian Bawah: Tombol Aksi
        h('div', { class: 'flex justify-end gap-2' }, [
          h(
            'button',
            {
              class: 'px-3 py-1.5 text-xs font-medium rounded-md text-zinc-700 bg-zinc-100 hover:bg-zinc-200 dark:text-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 transition-colors',
              onClick: () => {
                console.log('Deletion cancelled');
                toast.dismiss(toastId);
              }
            },
            'Cancel'
          ),
          h(
            'button',
            {
              class: 'px-3 py-1.5 text-xs font-medium rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors shadow-sm',
              onClick: () => {
                executeDelete(id, name);
                toast.dismiss(toastId);
              }
            },
            'Delete Now'
          )
        ])
      ]
    )
  }, {
    duration: Infinity // Wajib Infinity agar dialog konfirmasi tidak hilang mendadak dalam 5 detik
  })
}

// Fungsi terpisah untuk mengeksekusi aksi ke API Server
const executeDelete = async (id: string, name: string) => {
  const toastId = toast.loading(`Deleting account ${name}...`)
  
  try {
    const response = await $fetch<any>(`/api/admin_accounts?id=${id}`, {
      method: 'DELETE',
      headers: useRequestHeaders(['cookie']) as Record<string, string>
    })

    if (response?.success) {
      toast.success('Account deleted successfully from the system.', { id: toastId })
      await fetchAccounts() // Refresh data grid tabel kamu
    }
  } catch (error: any) {
    console.error('Delete account failed:', error)
    const msg = error.data?.message || 'Failed to delete the account.'
    toast.error(msg, { id: toastId })
  }
}

// Lifecycle Hooks
onMounted(async () => {
  await fetchAccounts()
})
</script>

<style lang="postcss" scoped>
/* Transisi Halus Efek Fade untuk Modal Teleport */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.th-style {
  @apply p-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-white/10 align-middle;
}
</style>