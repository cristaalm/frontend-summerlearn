import { Baseurl } from '@/utils/global'

export const getUsers = async () => {
  const response = await fetch(`${Baseurl}subscription-children/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`
    }
  })
  const json = await response.json()
  const subscriptions = json

  users.sort((a, b) => a.id - b.id) // Ordenar por id ASC

  return subscriptions?.map((subscription) => ({
    id: subscription.id,
    activity: subscription.activity,
    child: subscription.child
  }))
}
