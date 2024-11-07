import { ref, inject } from 'vue'
import { deleteProgram } from '@/services/programs/deleteProgram'

export function useDialogDelete({ programs }) {
  const dialogStatusDelete = ref(false)
  const programToDelete = ref('')
  const showToast = inject('showToast')

  const openDeleteModal = (id) => {
    programToDelete.value = id
    dialogStatusDelete.value = true
  }

  const confirmDeleteProgram = async () => {
    try {
      const result = await deleteProgram({ id: programToDelete.value })
      if (result) {
        // Remove the deleted activity from the list of activities
        programs.value = programs.value.filter(
          (actividad) => actividad.id !== programToDelete.value
        )
        setTimeout(() => {
          showToast({ message: 'Actividad eliminada exitosamente.', type: 'success' }) // Use showToast for success message
        }, 1000)
      } else {
        setTimeout(() => {
          showToast({ message: 'Error al eliminar la actividad.', type: 'error' }) // Use showToast for error message
        }, 1000)
      }
      dialogStatusDelete.value = false
      programToDelete.value = null
    } catch (error) {
      console.error('Error deleting activity:', error)
      showToast({ message: 'Error al eliminar la actividad.', type: 'error' }) // Use showToast for error message
    }
  }

  const closeDeleteProgram = async () => {
    dialogStatusDelete.value = false // Close modal after deleting
  }

  return { dialogStatusDelete, openDeleteModal, confirmDeleteProgram, closeDeleteProgram }
}
