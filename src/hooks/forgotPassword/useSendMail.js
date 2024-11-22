import { Baseurl } from '@/utils/global'
import { ref } from 'vue'

export function useSendMail({ email }) {
  const loadingMail = ref(false)
  const errorMail = ref(false)
  const successMail = ref(false)
  const warningMail = ref(false)
  const messageMail = ref('')

  const sendMail = async () => {
    loadingMail.value = true
    successMail.value = false
    errorMail.value = false
    warningMail.value = false
    messageMail.value = ''
    try {
      const response = await fetch(`${Baseurl}send_mail/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email.value })
      })
      // Verifica si la respuesta es exitosa
      if (!response.ok) {
        // Manejo específico para el error 404
        if (response.status === 404) {
          warningMail.value = true
          messageMail.value = 'Correo no encontrado.'
        } else {
          errorMail.value = true
          messageMail.value = 'Hubo un problema con la solicitud.'
        }
      } else {
        // Solo se ejecuta si la respuesta es exitosa
        successMail.value = true
        messageMail.value = 'Correo enviado, revisa tu correo.'
      }
    } catch (error) {
      console.error('Error:', error.message)
      errorMail.value = true
      messageMail.value = 'Hubo un problema con la solicitud.'
    } finally {
      loadingMail.value = false
    }
  }

  return { loadingMail, errorMail, warningMail, successMail, messageMail, sendMail }
}
