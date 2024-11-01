import { ref, inject } from 'vue'
import { getLastBills } from '@/services/home/admin/getLastBills'

export function useLastBills() {
  const lastBills = ref([])
  const loadingLastBills = ref(false)
  const errorLastBills = ref(false)
  const firstLoad = ref(true)
  const showToast = inject('showToast')
  // Inicializa graphicDonations con valores predeterminados

  const loadLastBills = async () => {
    if (loadLastBills.value) return
    if (firstLoad.value) {
      firstLoad.value = false
      loadingLastBills.value = true
    }
    try {
      lastBills.value = await getLastBills()
    } catch (e) {
      errorLastBills.value = true
      showToast({ message: 'Error al cargar los programas', type: 'error' })
    } finally {
      loadingLastBills.value = false
    }
  }

  return { lastBills, loadingLastBills, loadLastBills, errorLastBills }
}
