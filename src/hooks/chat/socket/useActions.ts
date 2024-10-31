import { Ref } from 'vue'

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

export function useActions({
  chats,
  loadingChats,
  sortChats,
  sortContacts,
  messages,
  contacts,
  loadingContacts,
  loadingMessages,
  playNotificationSound,
  loadingSendMessage,
  access_token,
  showToast
}: {
  chats: Ref<Chat[]>
  loadingChats: Ref<boolean>
  sortChats: () => void
  sortContacts: () => void
  messages: Ref<Message[]>
  contacts: Ref<Contact[]>
  loadingContacts: Ref<boolean>
  loadingMessages: Ref<boolean>
  playNotificationSound: () => void
  loadingSendMessage: Ref<boolean>
  access_token: string | null
  showToast?: (params: ToastParams) => void
}) {
  const init_chats = (data: any) => {
    chats.value = data.content
    loadingChats.value = false
    sortChats()
  }

  const init_messages = (data: any) => {
    messages.value = data.content
    loadingMessages.value = false
  }

  const message_received = (data: any) => {
    // Resivimos si el chat ya existe
    if (chats.value.find((chat) => chat.id === data.content.chat.id)) {
      // si existe el chat lo actualizamos
      const chatIndex = chats.value.findIndex((chat) => chat.id === data.content.chat.id)
      chats.value[chatIndex].lastMessage = data.content.chat.lastMessage
      chats.value[chatIndex].seenChat = data.content.chat.seenChat
      data.content.chat = data.content.chat.id
      messages.value.push(data.content)
    } else {
      // si no existe el chat lo agregamos
      chats.value.push(data.content.chat)
      data.content.chat = data.content.chat.id
      messages.value.push(data.content)
    }
    sortChats()
    // Reproduce el sonido de notificación
    playNotificationSound()
  }

  const message_sent = (data: any) => {
    // resivimos nuestro mensaje enviado en tiempo real
    loadingSendMessage.value = false
    const chatIndex = chats.value.findIndex((chat) => chat.id === data.content.chat.id)
    chats.value[chatIndex].lastMessage = data.content.chat.lastMessage
    data.content.chat = data.content.chat.id
    messages.value.push(data.content)
    sortChats()
  }

  const typing = (data: any) => {
    const chatIndex = chats.value.findIndex((chat) => chat.id === data.content.id)
    chats.value[chatIndex].lastMessage.typing = data.content.isTyping
  }

  const token_refreshed = (data: any) => {
    localStorage.setItem('access_token', data.content.new_access_token)
    access_token = data.content.new_access_token
  }

  const critical_error = (data: any) => {
    showToast?.({ message: data.content.error, type: 'error' })
  }

  const init_contacts = (data: any) => {
    contacts.value = data.content
    loadingContacts.value = false
    sortContacts()
  }

  return {
    init_chats,
    init_messages,
    message_received,
    message_sent,
    typing,
    token_refreshed,
    critical_error,
    init_contacts
  }
}
