import { Baseurl } from '@/utils/global'

export const changeStatus = async (userIdSub, statusId) => {
  try {
    const response = await fetch(`${Baseurl}users/update-status/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      },
      body: JSON.stringify({
        id: userIdSub,
        id_status: statusId
      })
    })

    if (response.status === 204 || response.status === 200) {
      return true // Successful update
    } else {
      const errorResponse = await response.json()
      console.error('Error al actualizar el estado:', errorResponse)
      return false
    }
  } catch (error) {
    console.error('Error al actualizar el estado:', error)
    return false
  }
}

export const deleteUser = async (userIdSub) => {
  try {
    const response = await fetch(`${Baseurl}users/${userIdSub}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      }
    })

    if (response.status === 204 || response.status === 200) {
      return true // Successful deletion
    } else {
      const errorResponse = await response.json()
      console.error('Error al eliminar el usuario:', errorResponse)
      return false
    }
  } catch (error) {
    console.error('Error al eliminar el usuario:', error)
    return false
  }
}
