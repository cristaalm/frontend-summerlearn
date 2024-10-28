import { ref, inject } from 'vue'
// @ts-ignore
import getIdByToken from '@/logic/getIdByToken'
// @ts-ignore
import { Baseurl2 } from '@/utils/global'
import { useEvents, useUtilsSocket, useActions } from './socket/'

interface ToastParams {
  message: string
  tipo?: string
  duration?: number
  persistente?: boolean
}

interface Message {
  id: string
  message: string
  date: string
  user: number
  chat: string
}

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
    isOnline: boolean
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
    isOnline: boolean
  }
  lastMessage: null
}

export function useWebSocket() {
  const showToast = inject<(params: ToastParams) => void>('showToast') // Inyectamos el Toast
  const socket = ref<WebSocket | null>(null) // Variable reactiva para almacenar el socket
  const socketGlobal = ref<WebSocket | null>(null) // Variable reactiva para almacenar el socket global
  const messages = ref<Message[]>([]) // Variable reactiva para almacenar los mensajes
  const chats = ref<Chat[]>([]) // Variable reactiva para almacenar los chats
  const contacts = ref<Contact[]>([]) // Variable reactiva para almacenar los contactos
  const newMessage = ref('') // Variable reactiva para almacenar el nuevo mensaje
  const loadingChats = ref(false) // Variable reactiva para mostrar el estado de carga de los chats
  const loadingMessages = ref(false) // Variable reactiva para mostrar el estado de carga de los mensajes
  const loadingContacts = ref(false) // Variable reactiva para mostrar el estado de carga de los contactos
  const loadingSendMessage = ref(false) // Variable reactiva para mostrar el estado de carga al enviar un mensaje
  let pingInterval: NodeJS.Timeout | null = null // Variable para almacenar el intervalo de pings
  let access_token = localStorage.getItem('access_token') // Obtenemos el token de acceso
  const refresh_token = localStorage.getItem('refresh_token') // Obtenemos el token de refresco

  const manualClose = ref(false)

  // ? ################## EVENTOS INDIVIDUALES ################## ? //

  const { sendMessage, isTyping, changeSeen } = useEvents(
    socket,
    access_token,
    refresh_token,
    newMessage,
    loadingSendMessage,
    chats
  )

  // ? ################## UTILIDADES ################## ? //

  const { sortChats, playNotificationSound, sortContacts } = useUtilsSocket(chats, contacts)

  // ? ################## ACCIONES DE RESPUESTA ################## ? //

  const {
    init_chats,
    init_messages,
    message_received,
    message_sent,
    typing,
    token_refreshed,
    critical_error,
    init_contacts
  } = useActions({
    chats,
    loadingChats,
    sortChats,
    sortContacts,
    messages,
    contacts,
    loadingMessages,
    loadingContacts,
    playNotificationSound,
    loadingSendMessage,
    access_token,
    showToast
  })
  // ? ################## SOCKET FUNCTIONS ################## ? //

  const connectWebSocket = () => {
    // Función para conectar el WebSocket
    if (socket && socket.value) {
      socket.value.close()
      socket.value = null
    }

    loadingChats.value = true
    loadingContacts.value = true
    loadingMessages.value = true

    if (!access_token) {
      showToast?.({ message: 'Credenciales invalidas', tipo: 'error' })
      return
    }

    const idUser = getIdByToken(access_token).user_id

    if (!idUser) {
      showToast?.({ message: 'Credenciales invalidas', tipo: 'error' })
      return
    }

    socketGlobal.value = new WebSocket(`${Baseurl2}ws/chat/general/`)
    socket.value = new WebSocket(`${Baseurl2}ws/chat/${idUser}/`)
    setupSocketEvents() // Configuramos eventos después de conectarnos

    // Iniciar el envío de pings cada 30 segundos
    pingInterval = setInterval(() => {
      if (socket.value && socket.value.readyState === WebSocket.OPEN) {
        socket.value.send(
          JSON.stringify({
            type: 'ping',
            token: access_token,
            refresh_token: refresh_token
          })
        ) // Enviar un mensaje de ping
      }
    }, 30000) // 30 segundos
  }

  const mountedSocket = () => {
    connectWebSocket()
  }

  const unmountedSocket = () => {
    if (socket.value) {
      manualClose.value = true
      socket.value.close() // Cerramos la conexión cuando se desmonta
    }
    if (pingInterval !== null) {
      clearInterval(pingInterval) // Detenemos el intervalo de pings al cerrar el socket
    }
  }

  // ? ################## SOCKET EVENTS ################## ? //

  const setupSocketEvents = () => {
    if (!socket.value || !socketGlobal.value) return

    socket.value.onopen = () => {
      socket.value!.send(
        JSON.stringify({
          type: 'start_chats',
          token: access_token,
          refresh_token: refresh_token,
          content: {}
        })
      )

      socket.value!.send(
        JSON.stringify({
          type: 'start_messages',
          token: access_token,
          refresh_token: refresh_token,
          content: {}
        })
      )

      socket.value!.send(
        JSON.stringify({
          type: 'start_contacts',
          token: access_token,
          refresh_token: refresh_token,
          content: {}
        })
      )
    }

    socketGlobal.value.onmessage = function (event) {
      const data = JSON.parse(event.data)
      if (data.type === 'status') {
        const user_id = getIdByToken(access_token).user_id

        if (data.content.id == user_id) return
        const chat_id =
          user_id < data.content.id
            ? `${user_id}_${data.content.id}`
            : `${data.content.id}_${user_id}`
        const contactIndex = contacts.value.findIndex((contact) => contact.id === chat_id)
        const chatIndex = chats.value.findIndex((chat) => chat.id === chat_id)

        if (contactIndex !== -1) {
          contacts.value[contactIndex].user.isOnline = data.content.status
        }
        if (chatIndex !== -1) {
          chats.value[chatIndex].user.isOnline = data.content.status
        }
      }
    }

    socket.value.onmessage = function (event) {
      const data = JSON.parse(event.data)
      if (data.type === 'init_chats') {
        init_chats(data)
      }
      if (data.type === 'init_messages') {
        init_messages(data)
      }
      if (data.type == 'init_contacts') {
        init_contacts(data)
      }
      if (data.type === 'message_received') {
        message_received(data)
      }
      if (data.type === 'message_sent') {
        message_sent(data)
      }
      if (data.type === 'typing') {
        typing(data)
      }
      if (data.type === 'token_refreshed') {
        token_refreshed(data)
      }
      if (data.type === 'critical_error') {
        critical_error(data)
      }
    }

    socket.value.onerror = function (error) {
      console.error('WebSocket error:', error)
    }

    // Reconexión automática en caso de desconexión
    socket.value.onclose = function (event) {
      console.log('WebSocket cerrado, intentando reconectar...')
      if (pingInterval !== null) {
        clearInterval(pingInterval) // Detenemos el intervalo de pings al cerrar el socket
      }
      if (!manualClose.value) {
        setTimeout(() => connectWebSocket(), 1000) // Intenta reconectar después de 1 segundo
      }
      manualClose.value = false
    }
  }

  return {
    mountedSocket,
    unmountedSocket,
    messages,
    chats,
    contacts,
    loadingChats,
    loadingContacts,
    loadingMessages,
    loadingSendMessage,
    newMessage,
    sendMessage,
    isTyping,
    changeSeen
  }
}
