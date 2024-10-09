import { Baseurl } from '@/../global'
import getIdByToken from '@/logic/getIdByToken'
import { first } from 'lodash'

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

  const user_info = {
    id: user.id,
    photo: user.users_photo,
    firstName: user.first_name,
    lastName: user.last_name,
    birthdate: user.users_birthdate,
    phone: user.users_phone,
    email: user.email,
    rol: user.users_rol,
    status: user.users_status ?? 0
  }

  // comprobamos que los datos no estén vacíos
  for (const key in user_info) {
    if (user_info[key] === null || user_info[key] === undefined) {
      return null
    }
  }

  return user_info
}
