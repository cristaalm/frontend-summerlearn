import { ref, inject } from 'vue'
import { getLastPrograms } from '@/services/home/admin/getLastPrograms'

export function useLastPrograms() {
  const lastPrograms = ref([])
  const loadingLastPrograms = ref(false)
  const firstLoad = ref(true)
  const errorLastPrograms = ref(null)
  const showToast = inject('showToast')

  const loadLastPrograms = async () => {
    if (loadingLastPrograms.value) return
    if (firstLoad.value) {
      loadingLastPrograms.value = true
      firstLoad.value = false
    }
    try {
      lastPrograms.value = await getLastPrograms()
    } catch (e) {
      errorLastPrograms.value = e
      showToast({ message: 'Error al cargar los programas', type: 'error' })
    } finally {
      if (!lastPrograms.value.length) {
        errorLastPrograms.value = 'No se han podido cargar los programas'
      }
      loadingLastPrograms.value = false
    }
  }

  return { lastPrograms, loadingLastPrograms, loadLastPrograms, errorLastPrograms }
}
