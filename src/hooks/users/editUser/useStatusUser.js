import { Baseurl } from '@/../global'

export function useStatusUser({ showToast }) {
  const updateStatus = async ({ user }) => {
    //? ############# Copy Object #############

    const userRef = { ...user }
    user.status = 0 // con esto estoy indica que esta cargando

    //? ############# Change Status #############

    userRef.status = userRef.status == 1 ? 2 : 1

    //? ############# Fetching Data #############

    try {
      const response = await fetch(Baseurl + 'users/' + userRef.id + '/', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify({
          users_status: userRef.status
        })
      })
      if (!response.ok) {
        userRef.status = userRef.status === 2 ? 1 : 2
        showToast('Error al actualizar el estado del usuario.')
      }
      showToast('Estado del usuario actualizado exitosamente.')
    } catch (e) {
      console.error('Error:', e)
      userRef.status = userRef.status === 2 ? 1 : 2
      showToast('Error al actualizar el estado del usuario.')
    }

    return userRef
  }
  return { updateStatus }
}
