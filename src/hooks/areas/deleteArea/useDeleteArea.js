import { inject, ref } from 'vue'
import { Baseurl } from '@/utils/global'

export function useDeleteArea() {
  const showToast = inject('showToast')
  const loadingDeleteArea = ref(false)

  const deleteArea = async ({ area, areas, setModalDeleteArea }) => {
    loadingDeleteArea.value = true
    try {
      const response = await fetch(`${Baseurl}areas/${area.id}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      if (response.status === 204 || response.status === 200) {
        // Asegúrate de que areas.value está definido
        if (areas && areas.value) {
          const areaIndex = areas.value.findIndex((a) => a.id === area.id)
          if (areaIndex !== -1) {
            areas.value.splice(areaIndex, 1)
          }
        }
        setTimeout(() => {
          showToast({ message: 'Área eliminada exitosamente.', type: 'success' })
        }, 1000)
        setModalDeleteArea({ open: false })
      } else {
        setTimeout(() => {
          showToast({
            message: 'Hay un programa relacionado, no se puede eliminar área.',
            type: 'warning'
          })
        }, 1000)
        setModalDeleteArea({ open: false })
      }
    } catch (error) {
      console.error('Error deleting area:', error)
      showToast({ message: 'Error al eliminar el área.', type: 'error' })
    } finally {
      loadingDeleteArea.value = false
    }
  }

  return { deleteArea, loadingDeleteArea }
}
