import { ref, inject } from 'vue'
import { Baseurl } from '@/utils/global'
import getIdByToken from '@/logic/getIdByToken'

export function useUpdatePassword({
  newPassword,
  currentPassword,
  newPasswordConfirm,
  validate,
  valid,
  resetFields
}) {
  const loadingUpdatePassword = ref(false)
  const showToast = inject('showToast')

  const updatePassword = async () => {
    loadingUpdatePassword.value = true
    validate() // Validar antes de ejecutar la llamada
    if (!valid.value) {
      showToast({ message: 'Por favor, llena todos los campos correctamente', type: 'error' })
      loadingUpdatePassword.value = false
      return
    }

    const access_token = localStorage.getItem('access_token')
    const idUser = getIdByToken(access_token).user_id

    try {
      const response = await fetch(Baseurl + 'users/changePassword/', {
        method: 'POST', // No necesitas agregar 'Content-Type'
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${access_token}`
        },
        body: JSON.stringify({
          currentPassword: currentPassword.value,
          newPassword: newPassword.value,
          id: idUser
        })
      })

      const data = await response.json()

      if (response.ok) {
        newPassword.value = ''
        currentPassword.value = ''
        newPasswordConfirm.value = ''
        resetFields()
        if (data.spanishSuccess) {
          showToast({ message: data.spanishSuccess, type: 'success', persistente: true })
          return
        }
      } else {
        if (data.spanishError) {
          showToast({ message: data.spanishError, type: 'error' })
          return
        }
        showToast({
          message: 'Hubo un problema en el registro, intentelo más tarde',
          type: 'error'
        })
      }
    } catch (err) {
      console.error('Error en la solicitud:', err)
      showToast({ message: 'Hubo un problema en el registro, intentelo más tarde', type: 'error' })
    } finally {
      loadingUpdatePassword.value = false
    }
  }

  return {
    loadingUpdatePassword,
    updatePassword
  }
}
