// path: src/components/ToastNotification/toast.js

import { ref } from 'vue'

export function useToast() {
  const toastMessages = ref([])

  // Función para mostrar el toast
  const showToast = ({ message, tipo = 'info' }) => {
    // Agrega el nuevo mensaje con su tipo
    toastMessages.value.push({ message, tipo })
  }

  return { toastMessages, showToast }
}
