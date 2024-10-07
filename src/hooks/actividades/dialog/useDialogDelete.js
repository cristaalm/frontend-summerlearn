import { ref } from 'vue'
import { deleteActividad } from '@/services/actividades/deleteActivities'

export function useDialogDelete({ showToast, actividades }) {
  const dialogStatusDelete = ref(false)
  const activityToDelete = ref('')

  const openDeleteModal = (id) => {
    activityToDelete.value = id
    dialogStatusDelete.value = true
  }

  const confirmDeleteActividad = async () => {
    try {
      const result = await deleteActividad(activityToDelete.value)
      if (result) {
        // Remove the deleted activity from the list of activities
        actividades.value = actividades.value.filter(
          (actividad) => actividad.id !== activityToDelete.value
        )
        setTimeout(() => {
          showToast('Actividad eliminada exitosamente.') // Use showToast for success message
        }, 1000)
      } else {
        setTimeout(() => {
          showToast('Error al eliminar la actividad.') // Use showToast for error message
        }, 1000)
      }
      dialogStatusDelete.value = false
      activityToDelete.value = null
    } catch (error) {
      console.error('Error deleting activity:', error)
      showToast('Error al eliminar la actividad.') // Use showToast for error message
    }
  }

  const closeDeleteActividad = async () => {
    dialogStatusDelete.value = false // Close modal after deleting
  }

  return { dialogStatusDelete, openDeleteModal, confirmDeleteActividad, closeDeleteActividad }
}
