import { ref, inject } from 'vue'
import { getLastActivities } from '@/services/home/coord/getLastActivities'

export function useLastActivities() {
  const lastActivities = ref([])
  const loadingLastActivities = ref(false)
  const firstLoad = ref(true)
  const errorLastActivities = ref(null)
  const showToast = inject('showToast')

  const loadLastActivities = async () => {
    if (loadingLastActivities.value) return
    if (firstLoad.value) {
      loadingLastActivities.value = true
      firstLoad.value = false
    }
    try {
      lastActivities.value = await getLastActivities()
    } catch (e) {
      errorLastActivities.value = e
      showToast({ message: 'Error al cargar las actividades', type: 'error' })
    } finally {
      if (!lastActivities.value.length) {
        errorLastActivities.value = 'No se han podido cargar las actividades'
      }
      loadingLastActivities.value = false
    }
  }

  return { lastActivities, loadingLastActivities, loadLastActivities, errorLastActivities }
}
