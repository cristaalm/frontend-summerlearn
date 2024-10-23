import { Ref } from 'vue'

interface Chat {
  id: string
  date: string
  seenChat: boolean
  user: {
    id: number
    name: string
    email: string
    rol: string
    userPhoto: string
  }
  lastMessage: {
    content: string
    date: string
    id: string
    typing?: boolean
  }
}

export function useUtilsSocket(chats: Ref<Chat[]>) {
  const sortChats = () => {
    chats.value.sort((a, b) => {
      if (!a.lastMessage || !b.lastMessage) return 0
      const dateA = new Date(a.lastMessage.date)
      const dateB = new Date(b.lastMessage.date)
      return dateB.getTime() - dateA.getTime()
    })
  }

  let userHasInteracted = false // Variable para rastrear la interacción del usuario

  // Evento para detectar interacción del usuario
  const enableAudioPlayback = () => {
    userHasInteracted = true // El usuario ha interactuado
    document.removeEventListener('click', enableAudioPlayback) // Remover el listener después de la interacción
  }

  // Añadir el evento una vez al cargar la página
  document.addEventListener('click', enableAudioPlayback)

  const playNotificationSound = () => {
    if (userHasInteracted) {
      // Solo se permite si el usuario ha interactuado
      const audio = new Audio('/notification_message.mp3')
      audio.play().catch((error) => {
        console.error('Error reproduciendo el sonido:', error)
      })
    } else {
      console.warn('El usuario no ha interactuado con la página, el sonido no puede reproducirse.')
    }
  }

  return { sortChats, playNotificationSound }
}
