import { Baseurl } from '@/utils/global'
import getId from '@/logic/getIdByToken'

export const getMessages = async (idChat) => {
  const access_token = localStorage.getItem('access_token')
  const response = await fetch(`${Baseurl}messages/?chat=${idChat}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access_token}`
    }
  })

  const json = await response.json()
  const messages = json

  return (
    messages
      ?.map((message) => ({
        id: message.messages_id,
        date: message.messages_date,
        content: message.messages_content,
        chat: message.messages_chat,
        user: message.messages_user
      }))
      .sort((a, b) => new Date(b.date) - new Date(a.date)) || []
  )
}
