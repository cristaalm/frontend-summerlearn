import { ref } from 'vue'
import { Baseurl } from '@/../global'

export function useChangePassword() {
  const loadingPassword = ref(false)
  const errorPassword = ref(null) // Para manejar errores
  const successPassword = ref(false)
  const messagePassword = ref('')
  // Función para manejar el envío de la nueva contraseña
  const changePassword = async (key, password) => {
    loadingPassword.value = true
    errorPassword.value = false
    successPassword.value = false
    messagePassword.value = ''

    try {
      // Llama a la función de recuperación de contraseña
      const response = await fetch(`${Baseurl}update_password/${key}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          password: password // Envía la nueva contraseña
        })
      })

      if (response.ok) {
        // Redirige o muestra un mensaje de éxito
        successPassword.value = true
        messagePassword.value = 'Contraseña cambiada con éxito.'
      } else {
        errorPassword.value = true
        messagePassword.value = 'Se agotó el tiempo, intenta de nuevo.'
      }
    } catch (err) {
      errorPassword.value = true
      messagePassword.value = 'Error al restablecer la contraseña, Intenta de nuevo.'
      console.error(err)
    } finally {
      loadingPassword.value = false
    }
  }

  return {
    loadingPassword,
    errorPassword,
    successPassword,
    messagePassword,
    changePassword
  }
}
