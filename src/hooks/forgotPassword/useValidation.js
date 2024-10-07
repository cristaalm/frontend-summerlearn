import { ref, watch } from 'vue'

export function useValidation() {
  const email = ref('')
  const error = ref('')
  const status = ref(false)
  const Regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/

  const validation = () => {
    error.value = ''
    status.value = false
    if (!email.value) {
      error.value = 'El campo del correo es requerido.'
      return false
    } else if (!Regex.test(email.value)) {
      error.value = 'El correo no es válido.'
      return false
    }
    status.value = true
  }

  watch(email, () => {
    validation()
  })

  return {
    email,
    error,
    status
  }
}
