import { Baseurl } from '@/utils/global'
import getIdByToken from '@/logic/getIdByToken'

export const getBills = async () => {
  const token = localStorage.getItem('access_token')

  // Verificamos si el token existe
  if (!token) {
    throw new Error('Token not found')
  }

  // Obtenemos el id y el rol del usuario
  const { user_id: id, rol: role } = getIdByToken(token)

  let gasto = ''
  if (role == 1) {
    gasto = 'bills/'
  } else {
    gasto = `bills/?user_id=${id}`
  }

  const response = await fetch(`${Baseurl}${gasto}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })

  const json = await response.json()
  const bills = json

  return bills
    ?.map((bill) => ({
      id: bill.bills_id,
      concept: bill.bills_concept,
      date: bill.bills_date,
      amount: bill.bills_amount,
      donation: bill.bills_donations
    }))
    .sort((a, b) => b.id - a.id)
}
