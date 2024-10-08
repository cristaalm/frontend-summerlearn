import { ref } from 'vue'

export function useToast() {
  const toastMessages = ref([])

  // Function to show the toast
  const showToast = ({ message, tipo = 'info' }) => {
    // Agrega el nuevo mensaje con su tipo
    toastMessages.value.push({ message, tipo })

    // Remueve el mensaje después de 3 segundos
    setTimeout(() => {
      toastMessages.value.shift() // Elimina el primer mensaje en la lista
    }, 3000)
  }

  return { toastMessages, showToast }
}
