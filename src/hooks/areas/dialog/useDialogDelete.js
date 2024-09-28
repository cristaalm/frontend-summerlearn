import { ref } from 'vue'
import { deleteArea } from '../../../services/areas/deleteAreas'

export function useDialogDelete({ showToast, areas }) {
  const dialogStatusDelete = ref(false)
  const areaToDelete = ref('')

  const openDeleteModal = (id) => {
    areaToDelete.value = id
    dialogStatusDelete.value = true
  }

  const confirmDeleteArea = async () => {
    try {
      const result = await deleteArea(areaToDelete.value)
      console.log(result) // Verifica si el resultado es lo que esperas
      if (result) {
        // Remove the deleted activity from the list of activities
        areas.value = areas.value.filter((areas) => areas.id !== areaToDelete.value)

        // Scroll to the top of the window when the area is successfully deleted
        window.scrollTo({ top: 0, behavior: 'smooth' })

        setTimeout(() => {
          showToast('Área eliminada exitosamente.')
        }, 1000)
      } else {
        setTimeout(() => {
          showToast('Hay un programa relacionado, no se puede eliminar área.')
        }, 1000)
      }

      dialogStatusDelete.value = false
      areaToDelete.value = null
    } catch (error) {
      console.error('Error deleting area:', error)
      showToast('Error al eliminar el área.') // Use showToast for error message
    }
  }

  const closedeleteArea = async () => {
    dialogStatusDelete.value = false // Close modal after deleting
  }

  return { dialogStatusDelete, openDeleteModal, confirmDeleteArea, closedeleteArea }
}
