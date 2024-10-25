import { inject, ref } from 'vue'
import { Baseurl } from '@/utils/global'

export function useArea() {
  const showToast = inject('showToast')
  const loadingEditArea = ref(false)
  const successEditArea = ref(false)
  const errorEditArea = ref(false)
  const updateArea = async ({ area, newArea, setModalEditArea }) => {
    loadingEditArea.value = true

    //? ############# Fetching Data #############

    try {
      const response = await fetch(Baseurl + 'areas/' + area.id + '/', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify({
          areas_name: newArea.value.name,
          areas_user: newArea.value.user
        })
      })
      if (!response.ok) {
        errorEditArea.value = true
        successEditArea.value = false
        showToast({ message: 'Error al actualizar el rol del usuario.', tipo: 'error' })
        return
      }

      const data = await response.json()

      successEditArea.value = true
      area.name = data.areas_name
      area.user.id = data.areas_user.id
      area.user.name = data.areas_user.name
      setModalEditArea({ open: false })
      showToast({ message: 'Rol del usuario actualizado exitosamente.', tipo: 'success' })
    } catch (e) {
      console.error('Error:', e)
      errorEditArea.value = true
      successEditArea.value = false
      showToast({ message: 'Error al actualizar el rol del usuario.', tipo: 'error' })
    } finally {
      loadingEditArea.value = false
    }
  }
  return { updateArea, loadingEditArea, successEditArea, errorEditArea }
}
