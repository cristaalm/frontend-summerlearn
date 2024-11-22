import { Baseurl } from '@/utils/global'

export const getUsers = async () => {
  const response = await fetch(`${Baseurl}users/by-id-rol/?id_rol=2`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`
    }
  })
  const json = await response.json()
  const users = json

  users.sort((a, b) => a.id - b.id) // Ordenar por id ASC

  return users?.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email
  }))
}
