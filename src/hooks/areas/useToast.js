import { ref } from 'vue'

export function useToast() {
  const toastMessages = ref([])

  // Function to show the toast
  const showToast = (message) => {
    toastMessages.value.push(message)

    // Remueve el mensaje después de 3 segundos
    setTimeout(() => {
      toastMessages.value.shift() // Elimina el primer mensaje en la lista
    }, 3000)
  }

  return { toastMessages, showToast }
}
