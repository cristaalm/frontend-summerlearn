import { Baseurl } from '@/../global'

export const getRoles = async () => {
  const response = await fetch(`${Baseurl}rol/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`
    }
  })

  const json = await response.json()
  const roles = json

  // Ordenar por id ASC
  roles.sort((a, b) => a.rol_id - b.rol_id)

  return roles?.map((rol) => ({
    id: rol.rol_id,
    name: rol.rol_name
  }))
}
