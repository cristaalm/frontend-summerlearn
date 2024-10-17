import { Baseurl } from '@/utils/global'

export const confirmSubVolunteer = async (userId, actividadId) => {
  const access_token = localStorage.getItem('access_token')
  try {
    const response = await fetch(`${Baseurl}subscription-volunteer/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`
      },
      body: JSON.stringify({
        subscriptions_volunteer_activity: actividadId,
        subscriptions_volunteer_user: userId
      })
    })

    if (response.status === 201 || response.status === 204 || response.status === 200) {
      // 201 Created, 204 No Content, or 200 OK indicate success
      return true // Successfully completed
    } else {
      const errorResponse = await response.json()
      console.error('Error during volunteer subscription:', errorResponse)
      return false // Failed to subscribe
    }
  } catch (error) {
    console.error('Error during volunteer subscription:', error)
    return false // Exception occurred
  }
}
