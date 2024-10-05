import { ref } from 'vue'

export function useRefs() {
  const password = ref('')
  const showPassword = ref(false)

  return {
    password,
    showPassword,
  }
}