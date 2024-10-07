import { Baseurl } from '@/../global'

export const getUsers = async () => {
  const response = await fetch(`${Baseurl}users/show-by-status/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`
    }
  })
  const json = await response.json()
  const users = json

  // Ordenar por id DESC
  users.sort((a, b) => b.id - a.id)

  return users?.map((user) => ({
    id: user.id,
    photo: user.users_photo,
    name: user.name,
    birthdate: user.users_birthdate,
    phone: user.users_phone,
    email: user.email,
    rol: user.users_rol,
    status: user.users_status ?? 0
  }))
}
