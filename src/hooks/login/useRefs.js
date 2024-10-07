import { ref } from 'vue'

export function useRefs() {
  const showPassword = ref(false)

  return {
    showPassword
  }
}
