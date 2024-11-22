import { ref } from 'vue'

export function useRefs() {
  const email = ref('')

  return {
    email
  }
}
