<template>
  <div ref="container" :class="[
    'right-22 p-4 rounded shadow-lg transition-opacity duration-300',
    toastTypeClass,
    moveClass, // Clase para controlar el movimiento
    animationClass // Clase dinámica de animación de entrada/salida
  ]">
    <p>{{ message.message }}</p>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'

const props = defineProps({
  message: {
    type: Object,
    required: true
  },
  duration: {
    type: Number,
    default: 3000
  }
})

const container = ref(null)
const animationClass = ref('')
const moveClass = ref('transition-all duration-500 ease-in-out')

onMounted(() => {
  setTimeout(() => {
    moveClass.value = 'transition-all duration-500 ease-in-out'
  }, 10)

  animationClass.value = 'animate-toast-enter'

  // Iniciar animación de salida después de la duración establecida
  setTimeout(() => {
    animationClass.value = 'animate-toast-leave'

    // Esperar a que la animación de salida se complete antes de ocultar el mensaje
    const animationDuration = 500 // Duración de la animación de salida en milisegundos
    setTimeout(() => {
      nextTick(() => {
        container.value.remove()
      })
    }, animationDuration)
  }, props.duration)
})

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
