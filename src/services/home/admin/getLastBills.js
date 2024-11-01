import { Baseurl } from '@/utils/global'

export const getLastBills = async () => {
  const response = await fetch(`${Baseurl}bills/last-bills/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`
    }
  })
  const json = await response.json()
  const bills = json

  return bills || []
}
