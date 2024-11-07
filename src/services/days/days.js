import { Baseurl } from '@/utils/global'

export const getDays = async (actividadId) => {
  try {
    const response = await fetch(`${Baseurl}days/get-days/?id_activity=${actividadId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      }
    })

    if (!response.ok) {
      throw new Error('Failed to fetch available days')
    }

    const json = await response.json()
    const days = json.available_days || []

    // Sort and map the days
    return days
      .sort((a, b) => a.day_id - b.day_id)
      .map((day) => ({
        id: day.day_id,
        description: day.day_description
      }))
  } catch (error) {
    console.error('Error fetching days:', error)
    return []
  }
}
