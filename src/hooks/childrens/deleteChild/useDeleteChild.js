import { inject, ref } from 'vue'
import { Baseurl } from '@/utils/global'

export function useDeleteChild() {
  const showToast = inject('showToast')
  const loadingDeleteChild = ref(false)

  const deleteChild = async ({ child, children, setModalDeleteChild }) => {
    loadingDeleteChild.value = true
    try {
      const response = await fetch(`${Baseurl}childrens/${child.id}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      if (response.status === 204 || response.status === 200) {
        // Asegúrate de que children.value está definido
        if (children && children.value) {
          const areaIndex = children.value.findIndex((a) => a.id === child.id)
          if (areaIndex !== -1) {
            children.value.splice(areaIndex, 1)
          }
        }
        setTimeout(() => {
          showToast({ message: 'Registro del niño eliminado exitosamente.', type: 'success' })
        }, 1000)
        setModalDeleteChild({ open: false })
      } else {
        setTimeout(() => {
          showToast({
            message: 'Hay información relacionada, no se puede eliminar el registro del niño.',
            type: 'warning'
          })
        }, 1000)
        setModalDeleteChild({ open: false })
      }
    } catch (error) {
      console.error('Error deleting area:', error)
      showToast({ message: 'Error al eliminar el registro del niño.', type: 'error' })
    } finally {
      loadingDeleteChild.value = false
    }
  }

  return { deleteChild, loadingDeleteChild }
}
