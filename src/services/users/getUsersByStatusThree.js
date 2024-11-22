import { Baseurl } from '@/utils/global'

export const getUsers = async () => {
  const response = await fetch(`${Baseurl}users/by-status/?id_status=3`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`
    }
  })
  const json = await response.json()
  const users = json

  users.sort((a, b) => b.id - a.id) // Ordenar por id ASC

  return users?.map((user) => ({
    id: user.id,
    name: user.name,
    photo: user.users_photo,
    email: user.email,
    rol: user.users_rol__rol_name,
    status: user.users_status__status_name
  }))
}
