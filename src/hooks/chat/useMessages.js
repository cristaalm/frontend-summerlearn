import { ref, inject } from 'vue'
import { getMessages } from '@/services/chats/messages'

export function useMessages(idChat) {
  const messages = ref([])
  const loadingMessages = ref(false)
  const errorMessages = ref(null)
  const showToast = inject('showToast')

  const loadMessages = async () => {
    loadingMessages.value = true
    try {
      messages.value = await getMessages(idChat)
    } catch (e) {
      errorMessages.value = e
      showToast({ message: 'Ocurrio un error al cargar los mensajes', tipo: 'error' })
    } finally {
      loadingMessages.value = false
    }
  }

  return { messages, loadingMessages, errorMessages, loadMessages }
}
