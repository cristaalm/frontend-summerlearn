import { ref } from 'vue'
import { Baseurl } from '@/utils/global'

/**
 * Hook para agregar un objetivo.
 *
 * @returns {Object}
 * @property {Ref<boolean>} setSchedulesLoading - Indica si la operación de agregar actividad está en curso.
 * @property {Ref<string>} setSchedulesError - Contiene el mensaje de error si ocurre un problema.
 * @property {Ref<string>} setSchedulesSuccess - Contiene el mensaje de éxito si la operación se completa.
 * @property {Function} addSchedule - Función asíncrona para agregar una actividad.
 * @param {Object} schedule - Objeto que contiene la información para agregar.
 * @param {string} schedule.activity - Descripción asociada a la actividad.
 * @param {string} schedule.day - Día asociado a la actividad.
 * @param {string} schedule.hour - Horario asociado a la actividad.
 */

export function useSetSchedules() {
  const setSchedulesLoading = ref(false)
  const setSchedulesError = ref('')
  const setSchedulesSuccess = ref('')

  const addSchedule = async (schedule) => {
    setSchedulesLoading.value = true
    setSchedulesError.value = ''
    setSchedulesSuccess.value = '' // Resetea el mensaje de éxito
    try {
      const response = await fetch(Baseurl + 'days-activities/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify({
          days_activities_activity: schedule.activity,
          days_activities_days: schedule.day,
          days_activities_schedules: schedule.hour
        })
      })

      if (response.ok) {
        setSchedulesSuccess.value = 'El objetivo se registró correctamente.'
      } else {
        setSchedulesError.value = 'Hubo un problema con la solicitud'
      }
    } catch (e) {
      console.error('Error:', e)
      setSchedulesError.value = 'Hubo un problema con la solicitud'
    } finally {
      setSchedulesLoading.value = false
    }
  }

  return { setSchedulesLoading, setSchedulesError, setSchedulesSuccess, addSchedule }
}
