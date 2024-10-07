import { ref } from 'vue'

export function useRefs() {
  const firstName = ref('')
  const lastName = ref('')
  const email = ref('')
  const phone = ref('')
  const birthdate = ref('DD/MM/YYYY')
  const password = ref('')
  const password_confirm = ref('')
  const rol = ref('')
  const valid = ref(false)
  const showPassword = ref(false)
  const showPasswordConfirm = ref(false)

  return {
    firstName,
    lastName,
    email,
    phone,
    birthdate,
    password,
    password_confirm,
    rol,
    valid,
    showPassword,
    showPasswordConfirm
  }
}
