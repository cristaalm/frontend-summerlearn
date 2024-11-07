import { ref, inject } from 'vue'
// import { addObjective } from '@/services/actividades/addObjective'

export function useDialogSchedules({ actividades }) {
  const dialogStatusSchedules = ref(false)
  const dialogStatusSchedulesView = ref(false)
  const activityId = ref('')
  const showToast = inject('showToast')

  const openSchedulesModal = (id) => {
    activityId.value = id
    dialogStatusSchedules.value = true
    dialogStatusSchedulesView.value = false
  }

  const openSchedulesModalView = (id) => {
    activityId.value = id
    dialogStatusSchedulesView.value = true
  }

  const closeSchedulesModal = async () => {
    dialogStatusSchedules.value = false
    dialogStatusSchedulesView.value = true
  }
  const closeSchedulesModalView = async () => {
    dialogStatusSchedulesView.value = false
  }

  return {
    dialogStatusSchedules,
    dialogStatusSchedulesView,
    openSchedulesModal,
    openSchedulesModalView,
    closeSchedulesModal,
    closeSchedulesModalView
  }
}
