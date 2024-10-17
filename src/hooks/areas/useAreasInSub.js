import { ref } from 'vue'
import { getAreas } from '@/services/areas/areas'

export function useAreasInSubs() {
  const areasSub = ref([])
  const loadingSub = ref(false)
  const errorSub = ref(null)

  const loadAreasSub = async () => {
    loadingSub.value = true
    try {
      areasSub.value = await getAreas()
    } catch (e) {
      errorSub.value = e
    } finally {
      loadingSub.value = false
    }
  }

  return { areasSub, loadingSub, errorSub, loadAreasSub }
}
