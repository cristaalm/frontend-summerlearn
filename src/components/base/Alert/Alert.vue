<script lang="ts">
export default {
  inheritAttrs: false
}
</script>

<script setup lang="ts">
import DismissButton from './DismissButton.vue'
import Lucide from '@/components/base/Lucide'
import _ from 'lodash'
import { twMerge } from 'tailwind-merge'
import { TransitionRoot } from '@headlessui/vue'
import { computed, ref, type HTMLAttributes, useAttrs, watch } from 'vue'

type Variant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'pending'
  | 'danger'
  | 'dark'
  | 'outline-primary'
  | 'outline-secondary'
  | 'outline-success'
  | 'outline-warning'
  | 'outline-pending'
  | 'outline-danger'
  | 'outline-dark'
  | 'soft-primary'
  | 'soft-secondary'
  | 'soft-success'
  | 'soft-warning'
  | 'soft-pending'
  | 'soft-danger'
  | 'soft-dark'

interface AlertProps {
  dismissible?: boolean
  variant?: Variant
  message: string
}

const { dismissible, variant, message = '' } = defineProps<AlertProps>()

// Define los íconos para cada variante
const iconMap = {
  'primary': 'CheckCircle',  // Puedes ajustar estos íconos según tus preferencias
  'secondary': 'Info',
  'success': 'CheckCircle',
  'warning': 'AlertTriangle',
  'pending': 'Clock',
  'danger': 'AlertTriangle',
  'dark': 'Moon',
  'outline-primary': 'CheckCircle',
  'outline-danger': 'AlertTriangle',
  'outline-success': 'CheckCircle',
  'outline-warning': 'AlertTriangle',
  'outline-pending': 'Clock',
  'outline-dark': 'Moon',
  'soft-primary': 'CheckCircle',
  'soft-secondary': 'Info',
  'soft-success': 'CheckCircle',
  'soft-warning': 'AlertTriangle',
  'soft-pending': 'Clock',
  'soft-danger': 'AlertTriangle',
  'soft-dark': 'Moon'
}

// Computa el ícono basado en el `variant`
const computedIcon = computed(() => {
  return iconMap[variant] || 'Info' // Devuelve un ícono predeterminado si no hay coincidencia
})

const attrs = useAttrs()
const show = ref<boolean>(true)

// Main Colors
const primary = [
  'bg-primary border-primary text-white', // Default
  'dark:bg-darkmode-800 dark:border-transparent dark:text-slate-300' // Dark mode
]
const secondary = [
  'bg-secondary/70 border-secondary/70 text-slate-500', // Default
  'dark:border-darkmode-400 dark:bg-darkmode-400 dark:text-slate-300' // Dark mode
]
const success = [
  'bg-success border-success text-slate-900', // Default
  'dark:bg-success dark:border-transparent dark:text-slate-300' // Dark mode
]
const warning = [
  'bg-warning border-warning text-slate-900', // Default
  'dark:bg-warning dark:border-transparent dark:text-slate-300' // Dark mode
]
const pending = [
  'bg-pending border-pending text-white', // Default
  'dark:bg-pending dark:border-transparent dark:text-slate-300' // Dark mode
]
const danger = [
  'bg-danger border-danger text-white', // Default
  'dark:bg-danger dark:border-transparent dark:text-slate-300' // Dark mode
]
const dark = [
  'bg-dark border-dark text-white', // Default
  'dark:bg-darkmode-800 dark:border-transparent dark:text-slate-300' // Dark mode
]

// Outline
const outlinePrimary = [
  'border-primary text-primary bg-primary/10', // Default
  'dark:border-primary dark:bg-primary/10 dark:text-slate-400' // Dark mode
]
const outlineSecondary = [
  'border-secondary text-slate-900 bg-secondary', // Default
  'dark:border-darkmode-100 dark:text-slate-300 dark:bg-darkmode-500' // Dark mode
]
const outlineSuccess = [
  'border-success text-success bg-success/10', // Default
  'dark:border-success dark:bg-success/10 dark:text-slate-400' // Dark mode
]
const outlineWarning = [
  'border-warning text-warning bg-warning/10', // Default
  'dark:border-warning dark:bg-warning/10 dark:text-slate-400' // Dark mode
]
const outlinePending = [
  'border-pending text-pending bg-pending/10', // Default
  'dark:border-pending dark:bg-pending/10 dark:text-slate-400' // Dark mode
]
const outlineDanger = [
  'border-danger text-danger bg-danger/10', // Default
  'dark:border-danger dark:bg-danger/10 dark:text-slate-400' // Dark mode
]
const outlineDark = [
  'border-dark text-dark bg-dark/10', // Default
  'dark:border-darkmode-800 dark:text-slate-300' // Dark mode
]

// Soft Color
const softPrimary = [
  'bg-primary border-primary bg-opacity-20 border-opacity-5 text-primary', // Default
  'dark:border-opacity-100 dark:bg-opacity-20 dark:border-primary' // Dark mode
]
const softSecondary = [
  'bg-slate-300 border-secondary bg-opacity-10 text-slate-500', // Default
  'dark:bg-darkmode-100/20 dark:border-darkmode-100/30 dark:text-slate-300' // Dark mode
]
const softSuccess = [
  'bg-success border-success bg-opacity-20 border-opacity-5 text-success', // Default
  'dark:border-success dark:border-opacity-20' // Dark mode
]
const softWarning = [
  'bg-warning border-warning bg-opacity-20 border-opacity-5 text-warning', // Default
  'dark:border-warning dark:border-opacity-20' // Dark mode
]
const softPending = [
  'bg-pending border-pending bg-opacity-20 border-opacity-5 text-pending', // Default
  'dark:border-pending dark:border-opacity-20' // Dark mode
]
const softDanger = [
  'bg-danger border-danger bg-opacity-20 border-opacity-5 text-danger', // Default
  'dark:border-danger dark:border-opacity-20' // Dark mode
]
const softDark = [
  'bg-dark border-dark bg-opacity-20 border-opacity-5 text-dark', // Default
  'dark:bg-darkmode-800/30 dark:border-darkmode-800/60 dark:text-slate-300' // Dark mode
]


const computedClass = computed(() =>
  twMerge([
    'relative border rounded-md px-5 py-4',
    variant == 'primary' && primary,
    variant == 'secondary' && secondary,
    variant == 'success' && success,
    variant == 'warning' && warning,
    variant == 'pending' && pending,
    variant == 'danger' && danger,
    variant == 'dark' && dark,
    variant == 'outline-primary' && outlinePrimary,
    variant == 'outline-secondary' && outlineSecondary,
    variant == 'outline-success' && outlineSuccess,
    variant == 'outline-warning' && outlineWarning,
    variant == 'outline-pending' && outlinePending,
    variant == 'outline-danger' && outlineDanger,
    variant == 'outline-dark' && outlineDark,
    variant == 'soft-primary' && softPrimary,
    variant == 'soft-secondary' && softSecondary,
    variant == 'soft-success' && softSuccess,
    variant == 'soft-warning' && softWarning,
    variant == 'soft-pending' && softPending,
    variant == 'soft-danger' && softDanger,
    variant == 'soft-dark' && softDark,
    dismissible && 'pl-5 pr-16',
    typeof attrs.class === 'string' && attrs.class
  ])
)



// Dismiss the alert
const dismiss = () => {
  show.value = false
}
</script>

<template>
  <TransitionRoot as="template" :show="show" enter="transition-all ease-linear duration-150"
    enterFrom="invisible opacity-0 translate-y-1" enterTo="visible opacity-100 translate-y-0"
    leave="transition-all ease-linear duration-150" leaveFrom="visible opacity-100 translate-y-0"
    leaveTo="invisible opacity-0 translate-y-1">
    <div :class="`flex items-center ${computedClass}`">
      <Lucide :icon="computedIcon" class="stroke-[0.8] w-7 h-7 mr-2" />
      <div class="ml-1 mr-8">
        <span>{{ message }}</span>
      </div>
      <DismissButton type="button" class="btn-close" @click="dismiss" v-if="dismissible">
        <Lucide icon="X" class="w-5 h-5" />
      </DismissButton>
    </div>
  </TransitionRoot>
</template>