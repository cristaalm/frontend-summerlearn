import { ref } from 'vue'
import { getDonations } from '@/services/donations/donations'
import { useBarDonations } from './useBarDonations'

export function useDonations() {
  const donations = ref([])
  const loading = ref(false)
  const error = ref(null)
  let barDonations = ref({})

  const loadDonations = async () => {
    loading.value = true
    try {
      donations.value = await getDonations()
      barDonations.value = useBarDonations(donations.value)
    } catch (e) {
      error.value = e
    } finally {
      loading.value = false
    }
  }

  return { barDonations, donations, loading, error, loadDonations }
}
