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
  const showToast = inject<(params: ToastParams) => void>('showToast')
  const socket = ref<WebSocket | null>(null)
  const socketGlobal = ref<WebSocket | null>(null)
  const messages = ref<Message[]>([])
  const chats = ref<Chat[]>([])
  const contacts = ref<Contact[]>([])
  const newMessage = ref('')
  const loadingChats = ref(false)
  const loadingMessages = ref(false)
  const loadingContacts = ref(false)
  const loadingSendMessage = ref(false)
  let pingInterval: NodeJS.Timeout | null = null
  let access_token = localStorage.getItem('access_token')
  const refresh_token = localStorage.getItem('refresh_token')

  const manualClose = ref(false)
  const manualCloseGlobal = ref(false)

  const { sendMessage, isTyping, changeSeen } = useEvents(
    socket,
    access_token,
    refresh_token,
    newMessage,
    loadingSendMessage,
    chats
  )

  const { sortChats, playNotificationSound, sortContacts } = useUtilsSocket(chats, contacts)

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

  const connectUserSocket = () => {
    if (socket.value) {
      socket.value.close()
      socket.value = null
    }

    if (!access_token) {
      showToast?.({ message: 'Credenciales inválidas', type: 'error' })
      return
    }

    const idUser = getIdByToken(access_token).user_id
    if (!idUser) {
      showToast?.({ message: 'Credenciales inválidas', type: 'error' })
      return
    }

    socket.value = new WebSocket(`${Baseurl2}ws/chat/${idUser}/`)
    setupUserSocketEvents()
  }

  const connectGlobalSocket = () => {
    if (socketGlobal.value) {
      socketGlobal.value.close()
      socketGlobal.value = null
    }

    socketGlobal.value = new WebSocket(`${Baseurl2}ws/chat/general/`)
    setupGlobalSocketEvents()
  }

  const mountedSocket = () => {
    connectUserSocket()
    connectGlobalSocket()
    startPing()
  }

  const unmountedSocket = () => {
    if (socket.value) {
      manualClose.value = true
      socket.value.close()
    }
    if (socketGlobal.value) {
      manualCloseGlobal.value = true
      socketGlobal.value.close()
    }
    stopPing()
  }

  const startPing = () => {
    pingInterval = setInterval(() => {
      if (socket.value && socket.value.readyState === WebSocket.OPEN) {
        socket.value.send(
          JSON.stringify({ type: 'ping', token: access_token, refresh_token: refresh_token })
        )
      }
    }, 30000)
  }

  const stopPing = () => {
    if (pingInterval) {
      clearInterval(pingInterval)
    }
  }

  const setupUserSocketEvents = () => {
    if (!socket.value) return

    socket.value.onopen = () => {
      socket.value!.send(
        JSON.stringify({ type: 'start_chats', token: access_token, refresh_token: refresh_token })
      )
      loadingChats.value = true
      socket.value!.send(
        JSON.stringify({
          type: 'start_messages',
          token: access_token,
          refresh_token: refresh_token
        })
      )
      loadingMessages.value = true
      socket.value!.send(
        JSON.stringify({
          type: 'start_contacts',
          token: access_token,
          refresh_token: refresh_token
        })
      )
      loadingContacts.value = true
    }

    socket.value.onmessage = (event) => {
      const data = JSON.parse(event.data)
      handleUserSocketMessage(data)
    }

    socket.value.onerror = (error) => {
      console.error('WebSocket error (usuario):', error)
    }

    socket.value.onclose = () => {
      stopPing()
      if (!manualClose.value) setTimeout(connectUserSocket, 1000)
      manualClose.value = false
    }
  }

  const handleUserSocketMessage = (data: any) => {
    if (data.type === 'init_chats') init_chats(data)
    else if (data.type === 'init_messages') init_messages(data)
    else if (data.type == 'init_contacts') init_contacts(data)
    else if (data.type === 'message_received') message_received(data)
    else if (data.type === 'message_sent') message_sent(data)
    else if (data.type === 'typing') typing(data)
    else if (data.type === 'token_refreshed') token_refreshed(data)
    else if (data.type === 'critical_error') critical_error(data)
  }

  const setupGlobalSocketEvents = () => {
    if (!socketGlobal.value) return

    socketGlobal.value.onmessage = (event) => {
      const data = JSON.parse(event.data)
      if (data.type === 'status') {
        const user_id = getIdByToken(access_token).user_id
        if (data.content.id !== user_id) {
          const chat_id =
            user_id < data.content.id
              ? `${user_id}_${data.content.id}`
              : `${data.content.id}_${user_id}`
          updateOnlineStatus(chat_id, data.content.status)
        }
      }
    }

    socketGlobal.value.onerror = (error) => {
      console.error('WebSocket error (global):', error)
    }

    socketGlobal.value.onclose = () => {
      if (!manualCloseGlobal.value) setTimeout(connectGlobalSocket, 1000)
      manualCloseGlobal.value = false
    }
  }

  const updateOnlineStatus = (chat_id: string, status: boolean) => {
    const contactIndex = contacts.value.findIndex((contact) => contact.id === chat_id)
    const chatIndex = chats.value.findIndex((chat) => chat.id === chat_id)
    if (contactIndex !== -1) contacts.value[contactIndex].user.isOnline = status
    if (chatIndex !== -1) chats.value[chatIndex].user.isOnline = status
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
