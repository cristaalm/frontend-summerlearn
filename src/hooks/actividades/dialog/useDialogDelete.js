import { ref, inject } from 'vue'
import { deleteActividad } from '@/services/actividades/deleteActivities'

export function useDialogDelete({ actividades }) {
  const dialogStatusDelete = ref(false)
  const activityToDelete = ref('')
  const showToast = inject('showToast')

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
          showToast({ message: 'Actividad eliminada exitosamente.', tipo: 'success' }) // Use showToast for success message
        }, 1000)
      } else {
        setTimeout(() => {
          showToast({ message: 'Error al eliminar la actividad.', tipo: 'error' }) // Use showToast for error message
        }, 1000)
      }
      dialogStatusDelete.value = false
      activityToDelete.value = null
    } catch (error) {
      console.error('Error deleting activity:', error)
      showToast({ message: 'Error al eliminar la actividad.', tipo: 'error' }) // Use showToast for error message
    }
  }

  const closeDeleteActividad = async () => {
    dialogStatusDelete.value = false // Close modal after deleting
  }

  return { dialogStatusDelete, openDeleteModal, confirmDeleteActividad, closeDeleteActividad }
}
