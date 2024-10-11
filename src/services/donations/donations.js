import { Baseurl } from '@/utils/global'

export const getDonations = async () => {
  const response = await fetch(`${Baseurl}donations/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`
    }
  })

  const json = await response.json()
  const donation = json

  return (
    donation
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
