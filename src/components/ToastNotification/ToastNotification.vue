<template>
  <div
    v-if="isVisible"
    :style="{ top: `${topOffset}px`, zIndex: 1000 }"
    :class="['fixed right-22 p-4 rounded shadow-lg transition-opacity duration-300', toastTypeClass]"
  >
    <p>{{ message.message }}</p>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'

const props = defineProps({
  message: {
    type: Object,
    required: true
  },
  duration: {
    type: Number,
    default: 3000
  },
  index: Number
})

const isVisible = ref(false)

// Muestra y oculta el mensaje cuando cambia
watch(
  () => props.message,
  (newMessage) => {
    if (newMessage) {
      isVisible.value = true
      setTimeout(() => {
        isVisible.value = false
      }, props.duration)
    }
  },
  { immediate: true }
)

// Aumenta el espacio entre mensajes para evitar superposición
const topOffset = computed(() => props.index * 80 + 110)

// Determina la clase de estilo según el tipo de toast
const toastTypeClass = computed(() => {
  switch (props.message.tipo) {
    case 'error':
      return 'bg-red-100 text-red-800'
    case 'warning':
      return 'bg-yellow-100 text-yellow-800'
    case 'success':
      return 'bg-green-100 text-green-800'
    case 'info':
    default:
      return 'bg-blue-100 text-blue-800'
  }
})
</script>

<style scoped>
.fixed {
  position: fixed;
}
</style>
