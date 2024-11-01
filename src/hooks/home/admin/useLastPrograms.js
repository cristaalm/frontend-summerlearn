import { ref, inject } from 'vue'
import { getLastPrograms } from '@/services/home/admin/getLastPrograms'

export function useLastPrograms() {
  const lastPrograms = ref([])
  const loadingLastPrograms = ref(false)
  const errorLastPrograms = ref(false)
  const showToast = inject('showToast')
  // Inicializa graphicDonations con valores predeterminados

  const loadLastPrograms = async () => {
    errorLastPrograms.value = false
    loadingLastPrograms.value = true
    try {
      lastPrograms.value = await getLastPrograms()
    } catch (e) {
      errorLastPrograms.value = true
      showToast({ message: 'Error al cargar los programas', type: 'error' })
    } finally {
      loadingLastPrograms.value = false
    }
  }

  return { lastPrograms, loadingLastPrograms, loadLastPrograms, errorLastPrograms }
}
