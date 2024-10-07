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
          showToast('Objetivo eliminado exitosamente.') // Use showToast for success message
        }, 1000)
      } else {
        setTimeout(() => {
          showToast('Error al eliminar la objectivo.') // Use showToast for error message
        }, 1000)
      }
      dialogStatusDeleteObjective.value = false
      activityToDelete.value = null
    } catch (error) {
      console.error('Error deleting activity:', error)
      showToast('Error al eliminar la objective.') // Use showToast for error message
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
