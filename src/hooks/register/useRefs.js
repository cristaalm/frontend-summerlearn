import { ref } from 'vue'

export function useRefs() {
  const firstName = ref('')
  const lastName = ref('')
  const email = ref('')
  const phone = ref('')
  const birthdate = ref('')
  const password = ref('')
  const password_confirm = ref('')
  const perfil = ref('')
  const terms = ref(false)
  const valid = ref(false)

  return {
    firstName,
    lastName,
    email,
    phone,
    birthdate,
    password,
    password_confirm,
    perfil,
    terms,
    valid
  }
}
