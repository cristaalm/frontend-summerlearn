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
    isOnline: boolean
  }
  lastMessage: {
    content: string
    date: string
    id: string
    typing?: boolean
  }
}

export function useEvents(
  socket: Ref<WebSocket | null>,
  access_token: string | null,
  refresh_token: string | null,
  newMessage: Ref<string>,
  loadingSendMessage: Ref<boolean>,
  chats: Ref<Chat[]>
) {
  const sendMessage = (recipient_id: number) => {
    if (socket.value && socket.value.readyState === WebSocket.OPEN) {
      socket.value.send(
        JSON.stringify({
          type: 'send_message',
          token: access_token,
          refresh_token: refresh_token,
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
    if (socket.value && socket.value.readyState === WebSocket.OPEN) {
      socket.value.send(
        JSON.stringify({
          type: 'typing',
          token: access_token,
          refresh_token: refresh_token,
          content: {
            recipient_id: recipient_id,
            isTyping: isTyping
          }
        })
      )
    }
  }

  const changeSeen = (recipient_id: number, chat_id: string) => {
    const chatIndex = chats.value.findIndex((chat) => chat.id === chat_id)
    if (socket.value && socket.value.readyState === WebSocket.OPEN) {
      if (chats.value[chatIndex].seenChat) return
      socket.value.send(
        JSON.stringify({
          type: 'seen',
          token: access_token,
          refresh_token: refresh_token,
          content: {
            recipient_id: recipient_id
          }
        })
      )
    }
    chats.value[chatIndex].seenChat = true
  }

  return { sendMessage, isTyping, changeSeen }
}
