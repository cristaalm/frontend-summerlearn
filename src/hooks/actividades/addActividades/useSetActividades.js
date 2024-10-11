import { ref, inject } from 'vue'
import { useRouter } from 'vue-router'
import { Baseurl } from '@/utils/global'

/**
 * Hook para agregar una actividad.
 *
 * @returns {Object} Retorna un objeto con las propiedades `setActividadesLoading`, `setActividadesError` y la función `addActividades`.
 * @property {Ref<boolean>} setActividadesLoading - Indica si la operación de agregar actividad está en curso.
 * @property {Ref<string>} setActividadesError - Contiene el mensaje de error si ocurre un problema.
 * @property {Function} addActividades - Función asíncrona para agregar una actividad.
 * @param {Object} actividad - Objeto que contiene la información para agregar.
 * @param {string} actividad.name - Nombre de la actividad.
 * @param {string} actividad.description - Descripción asociada a la actividad.
 * @param {string} actividad.responsible - Responsable asociado a la actividad.
 * @param {string} actividad.program - Programa asociado a la actividad.
 */

export function useSetActividades() {
  const router = useRouter()
  const setActividadesLoading = ref(false)
  const setActividadesError = ref('')
  const showToast = inject('showToast')

  const addActividades = async ({ actividad }) => {
    setActividadesLoading.value = true
    setActividadesError.value = ''
    try {
      const response = await fetch(Baseurl + 'activities/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify({
          activities_name: actividad.name,
          activities_description: actividad.description,
          activities_date: new Date().toISOString().split('T')[0], // obtener la fecha actual en formato YYYY-MM-DD
          activities_status: true,
          activities_user: actividad.responsible,
          activities_program: actividad.program
        })
      })

      if (response.ok) {
        showToast({ message: 'Actividad creada con éxito', tipo: 'success', persistente: true })
        router.push({ name: 'activities' })
      } else {
        setActividadesError.value = 'Hubo un problema con la solicitud'
      }
    } catch (e) {
      console.error('Error:', e)
      setActividadesError.value = 'Hubo un problema con la solicitud'
    } finally {
      setActividadesLoading.value = false
    }
  }

  return { setActividadesLoading, setActividadesError, addActividades }
}
