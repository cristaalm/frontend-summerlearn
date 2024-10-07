import { Baseurl } from '@/../global'

export const deleteProgram = async ({ id }) => {
  try {
    const response = await fetch(`${Baseurl}programs/${id}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      }
    })

    if (response.status === 204 || response.status === 200) {
      // 204 No Content is common for successful DELETE
      console.log('Programa eliminado con éxito')
      return true // Successfully deleted
    } else {
      const errorResponse = await response.json()
      console.error('Error al eliminar el programa:', errorResponse)
      return false // Failed to delete
    }
  } catch (error) {
    console.error('Error al eliminar el programa:', error)
    return false // Exception occurred
  }
}
