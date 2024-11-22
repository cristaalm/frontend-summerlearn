import { ref, inject } from 'vue'
import { changeStatus, deleteUser } from '@/services/users/changeStatus'

export function useDialog({ usersRequest }) {
  const dialogStatusModal = ref(false)
  const userIdSub = ref('')
  const statusId = ref('')
  const showToast = inject('showToast')
  const loadingUserRequest = ref(false)

  const openModal = (id, action) => {
    userIdSub.value = id
    statusId.value = action
    dialogStatusModal.value = true
  }

  const confirmSubscription = async () => {
    let result = false
    loadingUserRequest.value = true
    try {
      if (statusId.value === 'accept') {
        result = await changeStatus(userIdSub.value, 1)
      } else if (statusId.value === 'reject') {
        result = await changeStatus(userIdSub.value, 4)
      }

      if (result) {
        usersRequest.value = usersRequest.value.filter((user) => user.id !== userIdSub.value)
        showToast({ message: 'Se hacambiado el estado del usuario.', type: 'success' })
      } else {
        showToast({ message: 'Error al cambiar el estado del usuario.', type: 'error' })
      }

      dialogStatusModal.value = false
      userIdSub.value = null
    } catch (error) {
      console.error('Error en la acción:', error)
      showToast({ message: 'Error inesperado.', type: 'error' })
    } finally {
      loadingUserRequest.value = false
    }
  }

  const closeModal = () => {
    dialogStatusModal.value = false
  }

  return { dialogStatusModal, openModal, confirmSubscription, closeModal, loadingUserRequest }
}
