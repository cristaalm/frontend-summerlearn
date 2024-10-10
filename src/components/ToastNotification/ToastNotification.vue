<template>
  <div
    class="fixed top-0 right-0 sm:right-5 p-4 transition-opacity w-screen sm:w-fit duration-300 z-[2147483647] flex flex-col gap-3">
    <!-- Usamos transition-group para controlar las animaciones -->
    <transition-group name="toast" tag="div" class="flex flex-col gap-3">
      <div v-for="(toast, index) in toastMessages" :key="toast.id" ref="container" :class="[
        'right-22 p-4 rounded shadow-lg transition-opacity duration-300 flex items-center gap-2 min-w-[350px] w-full sm:w-fit',
        getToastTypeClass(toast.tipo),  // Aplicar la clase basada en el tipo de mensaje
        toast.moveClass
      ]">
        <!-- Ícono dinámico según el tipo de mensaje -->
        <component :is="getIconComponent(toast.tipo)" class="w-6 h-6" />

        <!-- Mensaje -->
        <p>{{ toast.message }}</p>

        <!-- Botón de cierre si el mensaje es persistente -->
        <button v-if="toast.persistente" @click="removeToast(toast.id)"
          class="ml-auto text-2xl font-bold text-gray-600 hover:text-gray-900">
          <component :is="X" class="w-6 h-6" />
        </button>
      </div>
    </transition-group>
  </div>

  <slot></slot>
</template>

<script setup>
import { ref, nextTick, provide } from 'vue'

// Importamos los iconos de Lucide
import { Info, AlertCircle, CheckCircle, AlertTriangle, X } from 'lucide-vue-next'

const toastMessages = ref([])

// Función para generar un ID único para cada mensaje
const generateId = () => '_' + Math.random().toString(36).substr(2, 9)

// Función para mostrar el toast
const showToast = ({ message, tipo = 'info', duration = 3000, persistente = false }) => {
  const toast = {
    id: generateId(),  // ID único para que el DOM mantenga su estabilidad
    message,
    tipo,
    persistente, // Propiedad para saber si es persistente
    moveClass: 'transition-all duration-500 ease-in-out',
  }

  // Agregar el nuevo mensaje al array
  toastMessages.value.push(toast)

  // Eliminar automáticamente si no es persistente
  if (!persistente) {
    setTimeout(() => {
      const index = toastMessages.value.findIndex(t => t.id === toast.id)
      if (index !== -1) {
        toastMessages.value.splice(index, 1) // Eliminar el mensaje
      }
    }, duration)
  }
}

// Función para eliminar manualmente un mensaje
const removeToast = (id) => {
  const index = toastMessages.value.findIndex(t => t.id === id)
  if (index !== -1) {
    toastMessages.value.splice(index, 1)
  }
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

// Función para seleccionar el ícono según el tipo de mensaje
const getIconComponent = (tipo) => {
  switch (tipo) {
    case 'error':
      return AlertCircle // Icono para error
    case 'warning':
      return AlertTriangle // Icono para advertencia
    case 'success':
      return CheckCircle // Icono para éxito
    case 'info':
    default:
      return Info // Icono para información
  }
}
</script>

<style scoped>
/* Clases de transición */
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(-10px);
  /* Desplazar un poco hacia abajo para el efecto de entrada/salida */
}

.toast-enter-active,
.toast-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
  /* Duración y transición */
}

.toast-leave-active {
  /* Para evitar que los elementos ocupen espacio mientras salen */
}
</style>
