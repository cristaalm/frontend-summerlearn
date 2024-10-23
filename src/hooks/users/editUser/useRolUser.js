import { inject, ref } from 'vue'
import { Baseurl } from '@/utils/global'
import { set } from 'nprogress'

export function useRolUser() {
  const showToast = inject('showToast')
  const loadingEditRol = ref(false)
  const successEditRol = ref(false)
  const errorEditRol = ref(false)
  const updateRol = async ({ user, newRol, setModalEditUser }) => {
    loadingEditRol.value = true

    //? ############# Fetching Data #############

    try {
      console.log(user)
      const response = await fetch(Baseurl + 'users/' + user.id + '/', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify({
          users_rol: newRol.value
        })
      })
      if (!response.ok) {
        errorEditRol.value = true
        successEditRol.value = false
        showToast({ message: 'Error al actualizar el rol del usuario.', tipo: 'error' })
      } else {
        successEditRol.value = true
        user.rol = newRol.value
        setModalEditUser({ open: false })
        showToast({ message: 'Rol del usuario actualizado exitosamente.', tipo: 'success' })
      }
    } catch (e) {
      console.error('Error:', e)
      errorEditRol.value = true
      successEditRol.value = false
      showToast({ message: 'Error al actualizar el rol del usuario.', tipo: 'error' })
    } finally {
      loadingEditRol.value = false
    }
  }
  return { updateRol, loadingEditRol, successEditRol, errorEditRol }
}
