import { ref, inject } from 'vue'
import { changeStatus, deleteUser } from '@/services/users/changeStatus'

export function useDialog({ users }) {
  const dialogStatusModal = ref(false)
  const userIdSub = ref('')
  const statusId = ref('')
  const showToast = inject('showToast')

  const openModal = (id, action) => {
    userIdSub.value = id
    statusId.value = action
    dialogStatusModal.value = true
  }

  const confirmSubscription = async () => {
    let result = false
    try {
      if (statusId.value === 'accept') {
        result = await changeStatus(userIdSub.value, 1)
      } else if (statusId.value === 'reject') {
        result = await deleteUser(userIdSub.value)
      }

      if (result) {
        users.value = users.value.filter((user) => user.id !== userIdSub.value)
        showToast({ message: 'Acción realizada exitosamente.', tipo: 'success' })
      } else {
        showToast({ message: 'Error al realizar la acción.', tipo: 'error' })
      }

      dialogStatusModal.value = false
      userIdSub.value = null
    } catch (error) {
      console.error('Error en la acción:', error)
      showToast({ message: 'Error inesperado.', tipo: 'error' })
    }
  }

  const closeModal = () => {
    dialogStatusModal.value = false
  }

  return { dialogStatusModal, openModal, confirmSubscription, closeModal }
}
