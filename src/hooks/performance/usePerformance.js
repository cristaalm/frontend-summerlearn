import { inject, ref } from 'vue'
import { getPerformance } from '@/services/performance/performance'

export function usePerformance() {
  const performance = ref([])
  const loading = ref(false)
  const error = ref(null)
  const showToast = inject('showToast')

  const loadPerformance = async () => {
    loading.value = true
    try {
      performance.value = await getPerformance()
    } catch (e) {
      console.error(e)
      showToast({ message: 'A ocurrido un error, intentelo mas tarde', type: 'error' })
    } finally {
      loading.value = false
    }
  }

  return { performance, loading, error, loadPerformance }
}
