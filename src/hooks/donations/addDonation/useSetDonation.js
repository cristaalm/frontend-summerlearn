import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Baseurl } from '@/../global'

export function useSetDonation() {
  const router = useRouter()
  const setDonationLoading = ref(false)
  const setDonationError = ref('')

  const addDonation = async ({ donation }) => {
    setDonationLoading.value = true
    setDonationError.value = ''
    try {
      const response = await fetch(`${Baseurl}donations/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify({
          concept: donation.concept,
          amount: donation.amount,
          date: new Date().toISOString().split('T')[0], // fecha en formato YYYY-MM-DD
        })
      })
      const data = await response.json()
      if (response.ok) {
        // Aquí puedes manejar la redirección o mostrar un mensaje de éxito
        console.log('Donación registrada:', data)
        router.push({ name: 'donations' }) // Redirige a la página de donaciones
      } else {
        setDonationError.value = data.detail || 'Error al agregar la donación'
      }
    } catch (error) {
      setDonationError.value = 'Error de conexión'
    } finally {
      setDonationLoading.value = false
    }
  }

  return {
    setDonationLoading,
    setDonationError,
    addDonation
  }
}
