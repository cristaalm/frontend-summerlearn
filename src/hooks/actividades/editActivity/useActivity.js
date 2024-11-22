import { inject, ref } from 'vue'
import { Baseurl } from '@/utils/global'

export function useActivity() {
  const showToast = inject('showToast')
  const loadingEditActivity = ref(false)
  const successEditActivity = ref(false)
  const errorEditActivity = ref(false)
  const updateActivity = async ({ activity, newActivity, setModalEditActivity }) => {
    loadingEditActivity.value = true

    //? ############# Fetching Data #############

    try {
      const response = await fetch(Baseurl + 'activities/' + activity.id + '/', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify({
          activities_name: newActivity.value.name,
          activities_user: newActivity.value.responsible,
          activities_description: newActivity.value.description,
          activities_program: newActivity.value.program,
          activities_date: newActivity.value.date.split('/').reverse().join('-')
        })
      })
      if (!response.ok) {
        errorEditActivity.value = true
        successEditActivity.value = false
        showToast({ message: 'Error al actualizar el actividad.', type: 'error' })
        return
      }

      const data = await response.json()

      // Aseguramos que activities_user sea un objeto
      if (typeof activity.activities_user !== 'object') {
        activity.activities_user = {}
      }
      successEditActivity.value = true
      activity.name = data.activities_name
      activity.activities_user = data.activities_user.id
      activity.description = data.activities_description
      activity.program_id = data.activities_program.id
      activity.program_name = data.activities_program.name

      const dateParts = data.activities_date.split('-')
      const formattedDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`

      activity.date = formattedDate

      setModalEditActivity({ open: false })
      showToast({ message: 'Actividad actualizada exitosamente.', type: 'success' })
    } catch (e) {
      console.error('Error:', e)
      errorEditActivity.value = true
      successEditActivity.value = false
      showToast({ message: 'Error al actualizar el actividad.', type: 'error' })
    } finally {
      loadingEditActivity.value = false
    }
  }
  return { updateActivity, loadingEditActivity, successEditActivity, errorEditActivity }
}
