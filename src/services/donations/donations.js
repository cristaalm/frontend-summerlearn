import { Baseurl } from '@/utils/global'
import getIdByToken from '@/logic/getIdByToken'

export const getDonations = async () => {
  const token = localStorage.getItem('access_token')

  // Verificamos si el token existe
  if (!token) {
    throw new Error('Token not found')
  }

  // Obtenemos el id y el rol del usuario
  const { user_id: id, rol: role } = getIdByToken(token)

  let donacion = ''
  if (role == 1) {
    donacion = 'donations/'
  } else {
    donacion = `donations/?user_id=${id}`
  }

  const response = await fetch(`${Baseurl}${donacion}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })

  if (!response.ok) {
    throw new Error('Failed to fetch donations')
  }

  const json = await response.json()

  return (
    json
      ?.map((donation) => ({
        id: donation.donations_id,
        concept: donation.donations_concept,
        quanty: donation.donations_quantity,
        spent: donation.donations_spent,
        date: donation.donations_date,
        user: donation.donations_user
      }))
      .sort((a, b) => b.id - a.id) || []
  )
}
