import { Baseurl } from '@/utils/global'

export const deleteArea = async (areasId) => {
  try {
    const response = await fetch(`${Baseurl}areas/${areasId}/`, {
      method: 'DELETE',
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
      console.error('Hay un programa relacionado, no se puede eliminar', errorResponse)
      return false // Failed to delete
    }
  } catch (error) {
    console.error('Hay un programa relacionado, no se puede eliminar', error)
    return false // Exception occurred
  }
}
