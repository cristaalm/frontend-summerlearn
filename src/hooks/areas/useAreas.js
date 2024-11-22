import { ref, inject } from 'vue'
import { getAreas } from '@/services/areas/areas'

export function useAreas() {
  const areas = ref([])
  const loadingAreas = ref(false)
  const errorAreas = ref(null)
  const firstLoad = ref(true)
  const showToast = inject('showToast')

  const loadAreas = async () => {
    if (loadingAreas.value) return
    if (firstLoad.value) {
      loadingAreas.value = true
      firstLoad.value = false
    }
    try {
      areas.value = await getAreas()
    } catch (e) {
      errorAreas.value = e
      showToast({ message: 'Error al cargar las áreas', type: 'error' })
    } finally {
      loadingAreas.value = false
    }
  }

  return { areas, loadingAreas, errorAreas, loadAreas }
}
