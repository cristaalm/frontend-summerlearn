import { Baseurl } from '@/../global'

export const deleteActividad = async (actividadId) => {
  try {
    const response = await fetch(`${Baseurl}activities/${actividadId}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      }
    })

    if (response.status === 204 || response.status === 200) {
      // 204 No Content is common for successful DELETE
      console.log('Actividad eliminada con éxito')
      return true // Successfully deleted
    } else {
      const errorResponse = await response.json()
      console.error('Error al eliminar la actividad:', errorResponse)
      return false // Failed to delete
    }
  } catch (error) {
    console.error('Error al eliminar la actividad:', error)
    return false // Exception occurred
  }
}
