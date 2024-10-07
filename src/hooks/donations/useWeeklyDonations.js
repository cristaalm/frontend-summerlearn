import { ref } from 'vue'
import { Baseurl } from '@/../global'

export function useWeeklyDonations() {
  const donationsWeek = ref([])
  const totalDonationsWeek = ref(0)
  const loadingWeek = ref(true)
  const errorWeek = ref(null)

  const loadDonationsWeek = async () => {
    loadingWeek.value = true
    errorWeek.value = null

    try {
      const response = await fetch(`${Baseurl}donations/get-donations-by-week/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}` // Si usas JWT
        }
      })

      if (!response.ok) {
        throw new Error('Error al obtener las donaciones')
      }

      const data = await response.json()

      // Asignar los datos del backend directamente
      donationsWeek.value = data.donations_by_day
      totalDonationsWeek.value = data.total_donations
    } catch (err) {
      errorWeek.value = err.message
    } finally {
      loadingWeek.value = false
    }
  }

  return {
    donationsWeek,
    totalDonationsWeek,
    loadingWeek,
    errorWeek,
    loadDonationsWeek
  }
}
