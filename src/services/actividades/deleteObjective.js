import { Baseurl } from '@/utils/global'

export const deleteObjective = async (objetivoId) => {
  try {
    const response = await fetch(`${Baseurl}objectives/${objetivoId}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      }
    })

    if (response.status === 204 || response.status === 200) {
      return true
    } else {
      const errorResponse = await response.json()
      console.error('Error al eliminar el objetivo:', errorResponse)
      return false
    }
  } catch (error) {
    console.error('Error al eliminar el objetivo:', error)
    return false
  }
}
