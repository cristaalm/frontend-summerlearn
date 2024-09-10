import { Baseurl } from '@/../global'

export const getUsers = async () => {
  const response = await fetch(`${Baseurl}users/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    }
  })
  const json = await response.json()
  const users = json

  return users?.map((user) => ({
    id: user.id,
    photo: user.users_photo,
    name: user.name,
    birthdate: user.users_birthdate,
    phone: user.users_phone,
    email: user.users_mail,
    rol: user.users_rol,
    status: user.users_status
  }))
}
