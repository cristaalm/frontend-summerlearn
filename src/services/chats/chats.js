import { Baseurl } from '@/utils/global'
import getId from '@/logic/getIdByToken'

export const getChats = async () => {
  const access_token = localStorage.getItem('access_token')
  const idUser = getId(access_token).user_id
  const response = await fetch(`${Baseurl}chats/?user=${idUser}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access_token}`
    }
  })

  const json = await response.json()
  const chats = json

  return (
    chats
      ?.map((chat) => ({
        id: chat.chat_id,
        date: chat.chat_date,
        user: chat.chat_user,
        lastMessage: chat.last_message
      }))
      .sort((a, b) => new Date(b.lastMessage.date) - new Date(a.lastMessage.date)) || []
  )
}
