import { ref, inject } from 'vue'
import { useRouter } from 'vue-router'
import { Baseurl } from '@/utils/global'

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
          activities_date: actividad.date.split('/').reverse().join('-'),
          activities_status: true,
          activities_user: actividad.responsible,
          activities_program: actividad.program
        })
      })

      if (response.ok) {
        showToast({ message: 'Actividad creada con éxito', type: 'success', persistente: true })
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
