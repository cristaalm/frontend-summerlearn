import { ref, inject } from 'vue'
import { deleteArea } from '@/services/areas/deleteAreas'

export function useDialogDelete({ areas }) {
  const dialogStatusDelete = ref(false)
  const areaToDelete = ref('')
  const showToast = inject('showToast')

  const openDeleteModal = (id) => {
    areaToDelete.value = id
    dialogStatusDelete.value = true
  }

  const confirmDeleteArea = async () => {
    try {
      const result = await deleteArea(areaToDelete.value)
      if (result) {
        // Remove the deleted activity from the list of activities
        areas.value = areas.value.filter((areas) => areas.id !== areaToDelete.value)

        // Scroll to the top of the window when the area is successfully deleted
        window.scrollTo({ top: 0, behavior: 'smooth' })

        setTimeout(() => {
          showToast({ message: 'Área eliminada exitosamente.', tipo: 'success' })
        }, 1000)
      } else {
        setTimeout(() => {
          showToast({
            message: 'Hay un programa relacionado, no se puede eliminar área.',
            tipo: 'warning'
          })
        }, 1000)
      }

      dialogStatusDelete.value = false
      areaToDelete.value = null
    } catch (error) {
      console.error('Error deleting area:', error)
      showToast({ message: 'Error al eliminar el área.', tipo: 'error' }) // Use showToast for error message
    }
  }

  const closeDeleteArea = () => {
    dialogStatusDelete.value = false // Close modal after deleting
  }

  return { dialogStatusDelete, openDeleteModal, confirmDeleteArea, closeDeleteArea }
}
