import { Baseurl } from '@/utils/global'
export const getTour = async (id) => {
  const response = await fetch(`${Baseurl}users/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`
    }
  })

  // Comprobamos si la respuesta fue exitosa
  if (!response.ok) {
    throw new Error('Error al obtener el tour')
  }

  const json = await response.json()

  return json
}
