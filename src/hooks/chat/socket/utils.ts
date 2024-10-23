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

interface Contact {
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
  lastMessage: null
}

export function useUtilsSocket(chats: Ref<Chat[]>, contacts: Ref<Contact[]>) {
  const sortChats = () => {
    chats.value.sort((a, b) => {
      if (!a.lastMessage || !b.lastMessage) return 0
      const dateA = new Date(a.lastMessage.date)
      const dateB = new Date(b.lastMessage.date)
      return dateB.getTime() - dateA.getTime()
    })
  }

  const sortContacts = () => {
    contacts.value.sort((a, b) => {
      // Definir el orden específico para los roles
      const roleOrder: { [key: string]: number } = {
        Administrador: 1,
        Coordinador: 2,
        Voluntario: 3,
        Beneficiario: 4,
        Donador: 5
      }

      // Obtener los valores del rol de cada contacto
      const roleA = roleOrder[a.user.rol] || 999 // Asignar un valor alto si el rol no existe
      const roleB = roleOrder[b.user.rol] || 999

      // Primero, ordenar por rol
      if (roleA !== roleB) {
        return roleA - roleB
      }

      // Si los roles son iguales, ordenar alfabéticamente por nombre
      return a.user.name.localeCompare(b.user.name)
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

  return { sortChats, playNotificationSound, sortContacts }
}
