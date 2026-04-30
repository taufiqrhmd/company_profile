<template>
  <div v-if="modelValue" class="fixed inset-0 z-[10000] flex items-center justify-center p-4">
    <!-- Backdrop -->
    <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" @click="$emit('update:modelValue', false)"></div>
    
    <!-- Modal Content -->
    <div class="relative bg-white w-full max-w-md rounded-[2rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
      <div class="p-8">
        <div class="flex justify-between items-center mb-8">
          <h3 class="text-xl font-black uppercase tracking-tighter text-slate-900">Account Settings</h3>
          <button @click="$emit('update:modelValue', false)" class="text-slate-400 hover:text-slate-900 transition-colors">
            <Icon name="solar:close-circle-bold" class="w-7 h-7" />
          </button>
        </div>

        <form @submit.prevent="handleUpdate" class="space-y-6">
          <div class="space-y-1">
            <label class="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Full Name</label>
            <input v-model="form.full_name" type="text" class="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm font-bold" />
          </div>

          <div class="space-y-1">
            <label class="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Role</label>
            <input :value="user?.role?.replace('_', ' ')" disabled type="text" class="w-full px-4 py-3 rounded-xl bg-slate-100 border border-slate-200 text-slate-400 text-sm font-bold uppercase" />
          </div>

          <div class="pt-4 border-t border-slate-100">
            <div class="space-y-1">
              <label class="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">New Password (Optional)</label>
              <input v-model="form.password" type="password" placeholder="••••••••" class="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm font-bold" />
            </div>
          </div>

          <button type="submit" class="w-full py-4 bg-slate-900 text-white rounded-xl font-black uppercase tracking-widest text-[11px] hover:bg-primary transition-colors duration-300 shadow-lg shadow-slate-200">
            Update Profile
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps(['modelValue', 'user'])
defineEmits(['update:modelValue'])

const form = ref({
  full_name: props.user?.full_name || '',
  password: ''
})

const handleUpdate = () => {
  // Logic update profile (gunakan bcryptjs untuk password di server-side)
  console.log('Updating...', form.value)
}
</script>