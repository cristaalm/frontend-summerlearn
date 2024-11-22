import { Baseurl } from '@/utils/global'
import getIdByToken from '@/logic/getIdByToken'

export const getPhoto = async () => {
  const access_token = localStorage.getItem('access_token')
  const id = getIdByToken(access_token).user_id

  // Enviar el ID como parámetro en la URL
  const response = await fetch(`${Baseurl}users/get-photo/?id=${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access_token}`
    }
  })

  // Procesar la respuesta como JSON
  const json = await response.json()
  return json.photo
}
