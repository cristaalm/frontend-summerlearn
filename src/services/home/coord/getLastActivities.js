import { Baseurl } from '@/utils/global'

export const getLastActivities = async () => {
  const response = await fetch(`${Baseurl}activities/last-activities/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`
    }
  })
  const json = await response.json()
  const activities = json

  return activities || []
}
