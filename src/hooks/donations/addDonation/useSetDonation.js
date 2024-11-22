import { ref, inject } from 'vue'
import { useRouter } from 'vue-router'
import { Baseurl } from '@/utils/global'
import getIdByToken from '@/logic/getIdByToken'

export function useSetDonation() {
  const router = useRouter()
  const setDonationLoading = ref(false)
  const access_token = localStorage.getItem('access_token')
  const showToast = inject('showToast')

  // ! Obtiene el id del usuario desde el token almacenado en localStorage
  const userId = getIdByToken(access_token).user_id

  const addDonation = async ({ donation, btnConfirm, btnForm }) => {
    setDonationLoading.value = true
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
        showToast({ message: 'Donación realizada con éxito', type: 'success' })
        btnConfirm()
        setTimeout(() => {
          router.push({ name: 'donations' }) // Redirige a la página de donaciones
        }, 3000)
      } else {
        showToast({
          message: 'Ocurrió un error al intentar completar la transacción',
          type: 'error'
        })
        btnForm()
      }
    } catch (error) {
      showToast({ message: 'Ocurrió un error al intentar completar la transacción', type: 'error' })
      btnForm()
    } finally {
      setDonationLoading.value = false
    }
  }

  return {
    setDonationLoading,
    addDonation
  }
}
