import { ref, inject } from 'vue'
import { getChats } from '@/services/chats/chats'

export function useChats() {
  const chats = ref([])
  const loadingChats = ref(false)
  const errorChats = ref(null)
  const showToast = inject('showToast')

  const loadChats = async () => {
    loadingChats.value = true
    try {
      chats.value = await getChats()
    } catch (e) {
      errorChats.value = e
      showToast({ message: 'Ocurrio un error al cargar los chats', tipo: 'error' })
    } finally {
      loadingChats.value = false
    }
  }

  return { chats, loadingChats, errorChats, loadChats }
}
