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

  return roles?.map((rol) => ({
    id: rol.rol_id,
    name: rol.rol_name
  }))
}
