import { inject, ref } from 'vue'
import { getPerformance } from '@/services/performance/performance'

export function usePerformance() {
  const performance = ref([])
  const loadingPerformance = ref(false)
  const errorPerformance = ref(null)
  const firstLoad = ref(true)
  const showToast = inject('showToast')

  const loadPerformance = async () => {
    if (loadingPerformance.value) return
    if (firstLoad.value) {
      loadingPerformance.value = true
      firstLoad.value = false
    }
    try {
      performance.value = await getPerformance()
    } catch (e) {
      console.error(e)
      errorPerformance.value = e
      showToast({ message: 'A ocurrido un error, intentelo más tarde', type: 'error' })
    } finally {
      loadingPerformance.value = false
    }
  }

  return { performance, loadingPerformance, errorPerformance, loadPerformance }
}
