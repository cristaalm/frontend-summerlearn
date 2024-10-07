import { ref } from 'vue'
import { deleteProgram } from '@/services/programs/deleteProgram'

export function useDialogDelete({ showToast, programs }) {
  const dialogStatusDelete = ref(false)
  const programToDelete = ref('')

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
          showToast('Actividad eliminada exitosamente.') // Use showToast for success message
        }, 1000)
      } else {
        setTimeout(() => {
          showToast('Error al eliminar la actividad.') // Use showToast for error message
        }, 1000)
      }
      dialogStatusDelete.value = false
      programToDelete.value = null
    } catch (error) {
      console.error('Error deleting activity:', error)
      showToast('Error al eliminar la actividad.') // Use showToast for error message
    }
  }

  const closeDeleteProgram = async () => {
    dialogStatusDelete.value = false // Close modal after deleting
  }

  return { dialogStatusDelete, openDeleteModal, confirmDeleteProgram, closeDeleteProgram }
}
