import { ref, inject } from 'vue'
import { getLastDonations } from '@/services/home/admin/getLastDonations'

export function useLastDonations() {
  const lastDonations = ref([])
  const loadingLastDonations = ref(false)
  const firstLoad = ref(true)
  const errorLastDonations = ref(false)
  const showToast = inject('showToast')
  // Inicializa graphicDonations con valores predeterminados

  const loadLastDonations = async () => {
    if (loadLastDonations.value) return
    if (firstLoad.value) {
      firstLoad.value = false
      loadingLastDonations.value = true
    }
    try {
      lastDonations.value = await getLastDonations()
    } catch (e) {
      errorLastDonations.value = true
      showToast({ message: 'Error al cargar los programas', type: 'error' })
    } finally {
      loadingLastDonations.value = false
    }
  }

  return { lastDonations, loadingLastDonations, loadLastDonations, errorLastDonations }
}
