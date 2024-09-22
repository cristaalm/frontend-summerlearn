import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Baseurl } from '@/../global'
import getIdByToken from '@/logic/getIdByToken'

export function useSetDonation() {
  const router = useRouter()
  const setDonationLoading = ref(false)
  const setDonationError = ref('')
  const access_token = localStorage.getItem('access_token')

  // ! Obtiene el id del usuario desde el token almacenado en localStorage
  const userId = getIdByToken(access_token).user_id

  const addDonation = async ({ donation }) => {
    setDonationLoading.value = true
    setDonationError.value = ''
    try {
      const response = await fetch(`${Baseurl}donations/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${access_token}`
        },
        body: JSON.stringify({
          donations_concept: donation.concept,
          donations_quantity: donation.amount,
          donations_date: new Date().toISOString().split('T')[0], // fecha en formato YYYY-MM-DD
          donations_user: userId
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
