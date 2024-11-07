import { Baseurl } from '@/utils/global'

export const getLastDonations = async () => {
  const response = await fetch(`${Baseurl}donations/last-donations/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`
    }
  })
  const json = await response.json()
  const donations = json

  return donations || []
}
