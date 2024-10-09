import { ref } from 'vue'
import { Baseurl } from '@/../global'

/**
 * Hook para agregar un objetivo.
 *
 * @returns {Object} Retorna un objeto con las propiedades `setObjectiveLoading`, `setObjectiveError`, `setObjectiveSuccess`, y la función `addObjective`.
 * @property {Ref<boolean>} setObjectiveLoading - Indica si la operación de agregar actividad está en curso.
 * @property {Ref<string>} setObjectiveError - Contiene el mensaje de error si ocurre un problema.
 * @property {Ref<string>} setObjectiveSuccess - Contiene el mensaje de éxito si la operación se completa.
 * @property {Function} addObjective - Función asíncrona para agregar una actividad.
 * @param {Object} objective - Objeto que contiene la información para agregar.
 * @param {string} objective.description - Descripción asociada a la actividad.
 * @param {string} objective.id - ID asociado a la actividad.
 */

export function useSetObjectives() {
  const setObjectiveLoading = ref(false)
  const setObjectiveError = ref('')
  const setObjectiveSuccess = ref('')

  const addObjective = async ({ objective }) => {
    setObjectiveLoading.value = true
    setObjectiveError.value = ''
    setObjectiveSuccess.value = '' // Resetea el mensaje de éxito
    try {
      const response = await fetch(Baseurl + 'objectives/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify({
          objectives_activity: objective.id,
          objectives_description: objective.description
        })
      })

      if (response.ok) {
        setObjectiveSuccess.value = 'El objetivo se registró correctamente.'
      } else {
        setObjectiveError.value = 'Hubo un problema con la solicitud'
      }
    } catch (e) {
      console.error('Error:', e)
      setObjectiveError.value = 'Hubo un problema con la solicitud'
    } finally {
      setObjectiveLoading.value = false
    }
  }

  return { setObjectiveLoading, setObjectiveError, setObjectiveSuccess, addObjective }
}
