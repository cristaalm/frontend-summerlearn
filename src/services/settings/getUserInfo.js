import { Baseurl } from '@/../global'
import getIdByToken from '@/logic/getIdByToken'

export const getUser = async () => {
  const token_access = localStorage.getItem('access_token')
  const idUser = await getIdByToken(token_access).user_id
  const response = await fetch(`${Baseurl}users/${idUser}/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`
    }
  })

  const user = await response.json()

  return {
    id: user.id,
    photo: user.users_photo,
    name: user.name,
    birthdate: user.users_birthdate,
    phone: user.users_phone,
    email: user.email,
    rol: user.users_rol,
    status: user.users_status ?? 0
  }
}
