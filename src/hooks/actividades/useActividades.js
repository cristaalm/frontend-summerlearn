import { ref } from 'vue'
import { getActividades } from '@/services/actividades/actividades'

export function useActividades() {
  const actividades = ref([])
  const loadingActivities = ref(false)
  const errorActivities = ref(null)
  const firstLoad = ref(true)

  const loadActivities = async () => {
    if (loadingActivities.value) return
    if (firstLoad.value) {
      firstLoad.value = false
      loadingActivities.value = true
    }
    try {
      actividades.value = await getActividades()
    } catch (e) {
      errorActivities.value = e
    } finally {
      loadingActivities.value = false
    }
  }

  return { actividades, loadingActivities, errorActivities, loadActivities }
}
