import { ref, inject, watch } from 'vue'

export function useWebSocket({
  scrollToBottom,
  channelName
}: {
  scrollToBottom: () => void
  channelName?: string
}) {
  const showToast =
    inject<
      (params: { message: string; tipo?: string; duration?: number; persistente?: boolean }) => void
    >('showToast') // Inyectamos el Toast
  // Array de mensajes
  const messages = ref<
    { id: number; content: string; error: boolean; date: string; messageId: number }[]
  >([])
  const newMessage = ref('')
  let socket: WebSocket | null = null
  let currentChannelName = ref(channelName) // Trackeamos el canal actual

  const connectWebSocket = () => {
    if (socket) {
      socket.close() // Cerramos la conexión si ya existe
    }

    if (currentChannelName.value) {
      socket = new WebSocket(`ws://localhost:8000/ws/chat/${currentChannelName.value}/`)
      setupSocketEvents() // Configuramos eventos después de conectarnos
    }
  }

  const setupSocketEvents = () => {
    if (!socket) return

    // Escuchamos los nuevos mensajes
    socket.onmessage = function (event) {
      const data = JSON.parse(event.data)
      if (data.type === 'success') {
        addMessage({
          id: data.content.user_id,
          date: data.content.date,
          content: data.content.message,
          error: false,
          messageId: data.content.message_id
        })
      }
      if (data.type === 'error') {
        // @ts-ignore
        showToast({ message: data.content.error, tipo: 'error' })
        addMessage({
          id: data.content.user_id,
          date: data.content.date,
          content: data.content.message,
          error: true,
          messageId: data.content.message_id
        })
      }
      if (data.type === 'critical_error') {
        // @ts-ignore
        showToast({ message: data.content.error, tipo: 'error' })
        console.error(data.content.console)
      }
    }

    // Manejo de errores
    socket.onerror = function (error) {
      console.error('WebSocket error:', error)
    }

    // Reconexión automática en caso de desconexión
    socket.onclose = function (event) {
      console.log('WebSocket cerrado, intentando reconectar...')
      setTimeout(() => connectWebSocket(), 1000) // Intenta reconectar después de 1 segundo
    }
  }

  const addMessage = ({
    content,
    error = false,
    id,
    date,
    messageId
  }: {
    content: string
    error: boolean
    id: number
    date: string
    messageId: number
  }) => {
    const message = { id, date, content, error, messageId }
    messages.value.push(message)
    scrollToBottom()
  }

  const sendMessage = () => {
    if (socket) {
      socket.send(
        JSON.stringify({
          message: newMessage.value,
          date: new Date().toISOString(),
          token: localStorage.getItem('access_token')
        })
      )
      newMessage.value = '' // Limpiamos el campo de mensaje
    }
  }

  const mountedSocket = () => {
    connectWebSocket()

    // Detecta cambios en el channelName para reconectar
    watch(currentChannelName, (newChannel) => {
      if (newChannel) {
        connectWebSocket()
      }
    })
  }

  const unmountedSocket = () => {
    if (socket) {
      socket.close() // Cerramos la conexión cuando se desmonta
    }
  }

  return {
    messages,
    newMessage,
    mountedSocket,
    unmountedSocket,
    sendMessage,
    currentChannelName // Agregamos esta variable para actualizar el canal
  }
}
