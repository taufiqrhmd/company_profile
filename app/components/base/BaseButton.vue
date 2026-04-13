<template>
  <button
    :type="type"
    :disabled="loading || disabled"
    :class="[
      'relative group overflow-hidden transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed',
      'font-black uppercase tracking-tighter flex items-center justify-center gap-2',
      variantClasses[variant],
      sizeClasses[size],
      roundedClasses[rounded]
    ]"
    @click="$emit('click', $event)"
  >
    <span 
      v-if="variant !== 'link'"
      class="absolute inset-0 w-full h-full bg-white/10 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out"
    ></span>

    <Icon 
      v-if="loading" 
      name="line-md:loading-twotone-loop" 
      class="w-5 h-5 animate-spin" 
    />

    <Icon v-if="icon && !loading && iconPos === 'left'" :name="icon" :class="iconSize" />

    <span class="relative z-10">
      <slot />
    </span>

    <Icon v-if="icon && !loading && iconPos === 'right'" :name="icon" :class="iconSize" />
  </button>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'dark' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  rounded?: 'none' | 'md' | 'xl' | 'full';
  type?: 'button' | 'submit' | 'reset';
  icon?: string;
  iconPos?: 'left' | 'right';
  loading?: boolean;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  rounded: 'xl',
  type: 'button',
  iconPos: 'right',
  loading: false,
  disabled: false
});

defineEmits(['click']);

const variantClasses = {
  primary: 'bg-primary text-dark hover:shadow-[0_0_20px_rgba(212,163,46,0.4)]',
  dark: 'bg-dark dark:bg-white text-soft dark:text-dark hover:bg-primary dark:hover:bg-primary hover:text-white',
  outline: 'border-2 border-dark/10 dark:border-white/20 text-dark dark:text-soft hover:border-primary hover:text-primary',
  ghost: 'bg-transparent text-dark dark:text-soft hover:bg-dark/5 dark:hover:bg-white/5',
  link: 'bg-transparent text-primary hover:underline px-0 py-0 italic'
};

const sizeClasses = {
  sm: 'px-4 py-2 text-[10px]',
  md: 'px-6 py-3 text-xs',
  lg: 'px-8 py-4 text-sm',
  xl: 'px-10 py-5 text-base'
};

const roundedClasses = {
  none: 'rounded-none',
  md: 'rounded-lg',
  xl: 'rounded-2xl',
  full: 'rounded-full'
};

const iconSize = computed(() => {
  return props.size === 'sm' ? 'w-3 h-3' : 'w-5 h-5';
});
</script>