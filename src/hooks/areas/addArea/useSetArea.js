import { ref, inject } from 'vue'
import { useRouter } from 'vue-router'
import { Baseurl } from '@/../global'

/**
 * Hook para agregar un área.
 *
 * @returns {Object} Retorna un objeto con las propiedades `setAreaLoading`, `setAreaError` y la función `addArea`.
 * @property {Ref<boolean>} setAreaLoading - Indica si la operación de agregar área está en curso.
 * @property {Ref<string>} setAreaError - Contiene el mensaje de error si ocurre un problema al agregar el área.
 * @property {Function} addArea - Función asíncrona para agregar un área.
 * @param {Object} area - Objeto que contiene la información del área a agregar.
 * @param {string} area.name - Nombre del área.
 * @param {string} area.user - Usuario asociado al área.
 */
export function useSetArea() {
  const router = useRouter()
  const setAreaLoading = ref(false)
  const setAreaError = ref('')
  const showToast = inject('showToast')

  const addArea = async ({ area }) => {
    setAreaLoading.value = true
    setAreaError.value = ''
    try {
      const response = await fetch(Baseurl + 'areas/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify({
          areas_name: area.name,
          areas_date: new Date().toISOString().split('T')[0], // obtener la fecha actual en formato YYYY-MM-DD
          areas_user: area.user,
          areas_status: true
        })
      })
      const data = await response.json()
      if (response.ok) {
        showToast({ message: 'Área creada con éxito', tipo: 'success', persistente: true })
        router.push({ name: 'areas' })
      } else {
        setAreaError.value = 'Hubo un problema con la solicitud'
      }
    } catch (e) {
      console.error('Error:', e)
      setAreaError.value = 'Hubo un problema con la solicitud'
    } finally {
      setAreaLoading.value = false
    }
  }

  return { setAreaLoading, setAreaError, addArea }
}
