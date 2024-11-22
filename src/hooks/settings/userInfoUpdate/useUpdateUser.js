import { ref, inject } from 'vue'
import { Baseurl } from '@/utils/global'
import { unformatPhone } from '@/logic/formatNumber'
import getIdByToken from '@/logic/getIdByToken'

export function useUpdateUser({
  phone,
  firstName,
  lastName,
  birthdate,
  valid,
  validate,
  loadUser
}) {
  const errorUser = ref('')
  const loadingUserEdit = ref(false)
  const showToast = inject('showToast')

  const updateUser = async () => {
    errorUser.value = ''
    loadingUserEdit.value = true
    validate() // Validar antes de ejecutar la llamada
    if (!valid.value) {
      showToast({ message: 'Por favor, completa los campos correctamente', type: 'error' })
      loadingUserEdit.value = false
      return
    }

    const date = birthdate.value.split('/')
    const birthdateFormat = `${date[2]}-${date[1]}-${date[0]}`
    const token_access = localStorage.getItem('access_token')
    const idUser = getIdByToken(token_access).user_id

    try {
      const response = await fetch(Baseurl + `users/${idUser}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token_access}`
        },
        body: JSON.stringify({
          users_phone: unformatPhone(phone.value),
          first_name: `${firstName.value}`,
          last_name: `${lastName.value}`,
          name: `${firstName.value} ${lastName.value}`,
          users_birthdate: birthdateFormat
        })
      })

      const data = await response.json()

      if (response.ok) {
        showToast({ message: 'Datos actualizados correctamente', type: 'success' })
        loadUser()
      } else {
        console.error('Registration failed', data)
        showToast({ message: 'Hubo un problema en el registro', type: 'error' })
      }
    } catch (err) {
      console.error('Error en la solicitud:', err)
      showToast({ message: 'Hubo un problema en la solicitud', type: 'error' })
    } finally {
      loadingUserEdit.value = false
    }
  }

  return {
    loadingUserEdit,
    updateUser
  }
}
