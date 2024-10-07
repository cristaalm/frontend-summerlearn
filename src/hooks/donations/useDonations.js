import { ref } from 'vue'
import { getDonations } from '@/services/donations/donations'
import { useBarDonations } from './useBarDonations'
import { Baseurl } from '@/../global'

export function useDonations() {
  const donations = ref([])
  const loading = ref(false)
  const errorDonations = ref(null)
  let barDonations = ref({})

  const loadDonations = async () => {
    loading.value = true
    try {
      donations.value = await getDonations()
      barDonations.value = useBarDonations(donations.value)
    } catch (e) {
      errorDonations.value = e
    } finally {
      loading.value = false
    }
  }

  const deleteDonation = async (donations_id) => {
    try {
      const response = await fetch(`${Baseurl}/donations/${donations_id}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error('Error al eliminar la donacion')
      }

      // Opcionalmente, puedes recargar la lista de facturas después de eliminar
      loadDonations() // O manejarlo según tu lógica
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return { barDonations, donations, loading, errorDonations, loadDonations, deleteDonation }
}
