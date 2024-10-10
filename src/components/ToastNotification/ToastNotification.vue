<template>
  <div class="fixed top-0 right-5 p-4 transition-opacity duration-300 z-[2147483647] flex flex-col gap-3">
    <div v-for="(toast, index) in toastMessages" :key="index" ref="container" :class="[
      'right-22 p-4 rounded shadow-lg transition-opacity duration-300',
      getToastTypeClass(toast.tipo),  // Aplicar la clase basada en el tipo de mensaje
      toast.moveClass,
      toast.animationClass
    ]">
      <p>{{ toast.message }}</p>
    </div>
  </div>

  <slot></slot>
</template>

<script setup>
import { ref, nextTick, provide } from 'vue'

const toastMessages = ref([])

// Función para mostrar el toast
const showToast = ({ message, tipo = 'info', duration = 3000 }) => {
  const toast = {
    message,
    tipo,
    moveClass: 'transition-all duration-500 ease-in-out',
    animationClass: 'animate-toast-enter'
  }

  // Agregar el nuevo mensaje al array
  toastMessages.value.push(toast)

  // Animar la salida después de la duración definida
  setTimeout(() => {
    toast.animationClass = 'animate-toast-leave'

    const animationDuration = 500 // Duración de la animación de salida

    // Eliminar el mensaje después de que la animación de salida se complete
    setTimeout(() => {
      nextTick(() => {
        const index = toastMessages.value.indexOf(toast)
        if (index !== -1) {
          toastMessages.value.splice(index, 1)  // Eliminar el mensaje
        }
      })
    }, animationDuration)
  }, duration)
}

provide('showToast', showToast)

// Función para determinar la clase según el tipo de mensaje
const getToastTypeClass = (tipo) => {
  switch (tipo) {
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
}
</script>
