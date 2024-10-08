import { ref } from 'vue'
import { deleteObjective } from '@/services/actividades/deleteObjective'

export function useDialogDeleteObjective({ showToast, objectives }) {
  const dialogStatusDeleteObjective = ref(false)
  const activityToDelete = ref('')

  const openDeleteModalObjective = (id) => {
    activityToDelete.value = id
    dialogStatusDeleteObjective.value = true
  }

  const confirmDeleteObjective = async () => {
    try {
      const result = await deleteObjective(activityToDelete.value)
      if (result) {
        // Remove the deleted activity from the list of activities
        objectives.value = objectives.value.filter(
          (objective) => objective.id !== activityToDelete.value
        )
        setTimeout(() => {
          showToast({ message: 'Objetivo eliminado exitosamente.', tipo: 'success' }) // Use showToast for success message
        }, 1000)
      } else {
        setTimeout(() => {
          showToast({ message: 'Error al eliminar la objectivo.', tipo: 'error' }) // Use showToast for error message
        }, 1000)
      }
      dialogStatusDeleteObjective.value = false
      activityToDelete.value = null
    } catch (error) {
      console.error('Error deleting activity:', error)
      showToast({ message: 'Error al eliminar la objective.', tipo: 'error' }) // Use showToast for error message
    }
  }

  const closeDeleteObjective = async () => {
    dialogStatusDeleteObjective.value = false // Close modal after deleting
  }

  return {
    dialogStatusDeleteObjective,
    openDeleteModalObjective,
    confirmDeleteObjective,
    closeDeleteObjective
  }
}
