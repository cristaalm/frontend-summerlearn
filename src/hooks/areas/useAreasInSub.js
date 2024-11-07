import { ref, inject } from 'vue'
import { getAreas } from '@/services/areas/areas'

export function useAreasInSubs() {
  const areasSub = ref([])
  const loadingSub = ref(false)
  const errorSub = ref(null)
  const firstLoad = ref(true)
  const showToast = inject('showToast')

  const loadAreasSub = async () => {
    if (loadingSub.value) return
    if (firstLoad.value) {
      firstLoad.value = false
      loadingSub.value = true
    }
    try {
      areasSub.value = await getAreas()
    } catch (e) {
      errorSub.value = e
      console.error(e)
      showToast({ message: 'Error al cargar las áreas', type: 'error' })
    } finally {
      loadingSub.value = false
    }
  }

  return { areasSub, loadingSub, errorSub, loadAreasSub }
}
