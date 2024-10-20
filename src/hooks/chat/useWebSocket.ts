import { ref, inject, watch, Ref } from 'vue'
// @ts-ignore
import getIdByToken from '@/logic/getIdByToken'

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

export function useWebSocket() {
  const showToast = inject<(params: ToastParams) => void>('showToast') // Inyectamos el Toast
  let socket: WebSocket | null = null
  const messages = ref<Message[]>([])
  const chats = ref<Chat[]>([])
  const newMessage = ref('')
  const state = ref('start')
  const loadingChats = ref(false)
  const loadingMessages = ref(false)
  const loadingSendMessage = ref(false)
  let pingInterval: NodeJS.Timeout | null = null // Variable para almacenar el intervalo de pings

  const connectWebSocket = () => {
    if (socket) {
      socket.close()
      socket = null
    }

    loadingChats.value = true
    loadingMessages.value = true

    const access_token: string | null = localStorage.getItem('access_token')

    if (!access_token) {
      showToast?.({ message: 'Credenciales invalidas', tipo: 'error' })
      return
    }

    const idUser = getIdByToken(access_token).user_id

    if (!idUser) {
      showToast?.({ message: 'Credenciales invalidas', tipo: 'error' })
      return
    }

    socket = new WebSocket(`ws://localhost:8000/ws/chat/${idUser}/?token=${access_token}`)
    setupSocketEvents() // Configuramos eventos después de conectarnos

    // Iniciar el envío de pings cada 30 segundos
    pingInterval = setInterval(() => {
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({ type: 'ping' })) // Enviar un mensaje de ping
      }
    }, 30000) // 30 segundos
  }

  const sendMessage = (recipient_id: number) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(
        JSON.stringify({
          type: 'send_message',
          content: {
            message: newMessage.value,
            recipient_id: recipient_id,
            date: new Date().toISOString()
          }
        })
      )
      loadingSendMessage.value = true
      newMessage.value = '' // Limpiamos el campo de mensaje
    }
  }

  const isTyping = (recipient_id: number, isTyping: boolean) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(
        JSON.stringify({
          type: 'typing',
          content: {
            recipient_id: recipient_id,
            isTyping: isTyping
          }
        })
      )
    }
  }

  const setupSocketEvents = () => {
    if (!socket) return

    socket.onopen = () => {
      socket!.send(
        JSON.stringify({
          type: 'start',
          content: {}
        })
      )
    }

    socket.onmessage = function (event) {
      const data = JSON.parse(event.data)
      if (data.type === 'init_chats') {
        // resivimos los chats de la base de datos
        chats.value = data.content
        loadingChats.value = false
      }
      if (data.type === 'init_messages') {
        // resivimos los mensajes de la base de datos
        messages.value = data.content
        loadingMessages.value = false
      }
      if (data.type === 'message_received') {
        // Resivimos si el chat ya existe
        if (chats.value.find((chat) => chat.id === data.content.chat.chat_id)) {
          // si existe el chat lo actualizamos
          const chatIndex = chats.value.findIndex((chat) => chat.id === data.content.chat.chat_id)
          chats.value[chatIndex].lastMessage = data.content.chat.lastMessage
          data.content.chat = data.content.chat.chat_id
          messages.value.push(data.content)
        } else {
          // si no existe el chat lo agregamos
          chats.value.push(data.content.chat)
          data.content.chat = data.content.chat.chat_id
          messages.value.push(data.content)
        }
        sortChats()
      }
      if (data.type === 'message_sent') {
        // resivimos nuestro mensaje enviado en tiempo real
        loadingSendMessage.value = false
        const chatIndex = chats.value.findIndex((chat) => chat.id === data.content.chat.chat_id)
        chats.value[chatIndex].lastMessage = data.content.chat.lastMessage
        data.content.chat = data.content.chat.chat_id
        messages.value.push(data.content)
        sortChats()
      }
      if (data.type === 'typing') {
        const chatIndex = chats.value.findIndex((chat) => chat.id === data.content.id)
        chats.value[chatIndex].lastMessage.typing = data.content.isTyping
      }
      if (data.type === 'critical_error') {
        showToast?.({ message: data.content.error, tipo: 'error' })
      }
    }

    const sortChats = () => {
      chats.value.sort((a, b) => {
        console.log(a)
        console.log(b)
        const dateA = new Date(a.lastMessage.date)
        const dateB = new Date(b.lastMessage.date)
        return dateB.getTime() - dateA.getTime()
      })
    }

    socket.onerror = function (error) {
      console.error('WebSocket error:', error)
    }

    // Reconexión automática en caso de desconexión
    socket.onclose = function (event) {
      console.log('WebSocket cerrado, intentando reconectar...')
      if (pingInterval !== null) {
        clearInterval(pingInterval) // Detenemos el intervalo de pings al cerrar el socket
      }
      setTimeout(() => connectWebSocket(), 1000) // Intenta reconectar después de 1 segundo
    }
  }

  const mountedSocket = () => {
    connectWebSocket()
  }

  const unmountedSocket = () => {
    if (socket) {
      socket.close() // Cerramos la conexión cuando se desmonta
    }
    if (pingInterval !== null) {
      clearInterval(pingInterval) // Detenemos el intervalo de pings al cerrar el socket
    }
  }

  return {
    mountedSocket,
    unmountedSocket,
    messages,
    chats,
    loadingChats,
    loadingMessages,
    loadingSendMessage,
    newMessage,
    sendMessage,
    isTyping
  }
}
