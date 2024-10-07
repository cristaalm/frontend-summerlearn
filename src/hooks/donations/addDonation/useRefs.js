import { ref } from 'vue'

export function useRefs() {
  const concept = ref('')
  const amount = ref('')

  return { concept, amount }
}
