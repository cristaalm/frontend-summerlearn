import { ref } from 'vue'
// import { addObjective } from '../../../services/actividades/addObjective'
import { addObjective } from '@/services/actividades/addObjective'

export function useDialogObjective({ showToast, actividades }) {
  const dialogStatusObjective = ref(false)
  const dialogStatusObjectiveAdd = ref(false)
  const objectiveToAdd = ref('')

  const openObjectiveModal = (id) => {
    objectiveToAdd.value = id
    dialogStatusObjective.value = true
  }

  const openObjectiveModalAdd = (id) => {
    // objectiveToAdd.value = id
    dialogStatusObjective.value = false
    dialogStatusObjectiveAdd.value = true
  }

  const confirmAddObjective = async () => {
    try {
      const result = await addObjective(objectiveToAdd.value)
      if (result) {
        // Remove the deleted activity from the list of activities
        actividades.value = actividades.value.filter(
          (actividad) => actividad.id !== objectiveToAdd.value
        )
        setTimeout(() => {
          showToast('Objetivo agregado exitosamente.') // Use showToast for success message
        }, 1000)
      } else {
        setTimeout(() => {
          showToast('Error al agregar objectivo a la actividad.') // Use showToast for error message
        }, 1000)
      }
      dialogStatusObjective.value = false
      objectiveToAdd.value = null
    } catch (error) {
      console.error('Error deleting activity:', error)
      showToast('Error al eliminar la actividad.') // Use showToast for error message
    }
  }

  const closeAddObjective = async () => {
    dialogStatusObjective.value = false
  }

  const closeAddObjectiveCreate = async () => {
    dialogStatusObjectiveAdd.value = false
    dialogStatusObjective.value = true
  }

  return {
    dialogStatusObjective,
    dialogStatusObjectiveAdd,
    openObjectiveModal,
    openObjectiveModalAdd,
    confirmAddObjective,
    closeAddObjective,
    closeAddObjectiveCreate
  }
}
