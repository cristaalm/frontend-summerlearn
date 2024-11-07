import { ref, inject } from 'vue'
import { activitiesSubscribed } from '@/services/subscriptions/activitiesSubscribed'

export function useActividadesSubscribed() {
  const actividadesSubscribed = ref([])
  const loadingActividadesSubscribed = ref(false)
  const errorActividadesSubscribed = ref(null)
  const firstLoad = ref(true)
  const showToast = inject('showToast')

  const loadActividadesSubscribed = async () => {
    if (loadingActividadesSubscribed.value) return
    if (firstLoad.value) {
      firstLoad.value = false
      loadingActividadesSubscribed.value = true
    }
    try {
      actividadesSubscribed.value = await activitiesSubscribed()
    } catch (e) {
      errorActividadesSubscribed.value = e
      console.error(e)
      showToast({ message: 'Error al cargar las actividades', type: 'error' })
    } finally {
      loadingActividadesSubscribed.value = false
    }
  }

  return {
    actividadesSubscribed,
    loadingActividadesSubscribed,
    errorActividadesSubscribed,
    loadActividadesSubscribed
  }
}
