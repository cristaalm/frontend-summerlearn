import { ref } from 'vue'
import { getAreas } from '@/services/areas/areas'

export function useAreas() {
  const areas = ref([])
  const loadingAreas = ref(false)
  const errorAreas = ref(null)

  const loadAreas = async () => {
    loadingAreas.value = true
    try {
      areas.value = await getAreas()
    } catch (e) {
      errorAreas.value = e
    } finally {
      loadingAreas.value = false
    }
  }

  return { areas, loadingAreas, errorAreas, loadAreas }
}
