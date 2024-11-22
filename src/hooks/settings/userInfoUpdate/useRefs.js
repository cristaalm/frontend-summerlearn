import { ref } from 'vue'

export function useRefs() {
  const firstName = ref('')
  const lastName = ref('')
  const phone = ref('')
  const birthdate = ref('')
  const valid = ref(false)

  return {
    firstName,
    lastName,
    phone,
    birthdate,
    valid
  }
}
