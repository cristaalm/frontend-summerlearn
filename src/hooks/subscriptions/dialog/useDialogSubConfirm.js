import getIdByToken from '@/logic/getIdByToken'
import { ref, inject } from 'vue'
import { useRouter } from 'vue-router'
import { Baseurl } from '@/utils/global'
import { confirmSubVolunteer } from '@/services/subscriptions/confirmSubVolunteer'

export function useDialogSubConfirm({ actividades }) {
  const dialogStatusModalSubConfirm = ref(false)
  const idActivity = ref('')
  const access_token = localStorage.getItem('access_token')
  const showToast = inject('showToast')

  //! Obtiene el rol del usuario desde el token almacenado en localStorage
  const rol = getIdByToken(access_token).rol
  const userId = getIdByToken(access_token).user_id

  const openModalSubConfirm = (id_actividad) => {
    idActivity.value = id_actividad
    dialogStatusModalSubConfirm.value = true
  }

  const confirmSubscription = async () => {
    try {
      if (rol === 4) {
        const result = await confirmSubVolunteer(userId, idActivity.value)
        if (result) {
          setTimeout(() => {
            showToast({ message: '¡Te suscribiste a una actividad!', type: 'success' }) // Use showToast for success message
          }, 1000)
        } else {
          setTimeout(() => {
            showToast({ message: 'Error al eliminar la actividad.', type: 'error' }) // Use showToast for error message
          }, 1000)
        }
      } else {
        showToast({
          message: 'No tienes los permisos necesarios para eliminar esta suscripción.',
          type: 'error'
        }) // Use showToast for error message
      }

      dialogStatusModalSubConfirm.value = false
      idActivity.value = null
    } catch (error) {
      console.error('Error deleting activity:', error)
      showToast({ message: 'Error al eliminar la actividad.', type: 'error' }) // Use showToast for error message
    }
  }

  const closeModalSubConfirm = async () => {
    dialogStatusModalSubConfirm.value = false // Close modal after deleting
  }

  return {
    dialogStatusModalSubConfirm,
    openModalSubConfirm,
    closeModalSubConfirm,
    confirmSubscription
  }
}
