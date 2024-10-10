import { ref, watch } from 'vue'

export function useValidation({ email }) {
  const statusMail = ref({
    value: false,
    message: '',
    error: false,
    Regex: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
  })

  const validation = () => {
    statusMail.value.error = false
    if (!email.value) {
      // si el campo email esta vacio
      statusMail.value.error = true
      statusMail.value.message = 'El campo correo es requerido.'
      statusMail.value.value = false
      return
    } else if (!statusMail.value.Regex.test(email.value)) {
      statusMail.value.error = true
      statusMail.value.message = 'El correo no es válido.'
      statusMail.value.value = false
      return
    }
    statusMail.value.error = false
    statusMail.value.message = ''
    statusMail.value.value = true
  }

  watch(email, () => {
    validation()
  })

  return {
    statusMail
  }
}
