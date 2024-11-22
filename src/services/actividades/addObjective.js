import { Baseurl } from '@/utils/global'

export const addObjective = async (actividadId) => {
  try {
    const response = await fetch(`${Baseurl}objectives/${actividadId}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      }
    })

    if (response.status === 204 || response.status === 200) {
      // 204 No Content is common for successful DELETE
      return true // Successfully deleted
    } else {
      const errorResponse = await response.json()
      console.error('Error al crear objectivo:', errorResponse)
      return false // Failed to delete
    }
  } catch (error) {
    console.error('Error al crear objectivo:', error)
    return false // Exception occurred
  }
}
