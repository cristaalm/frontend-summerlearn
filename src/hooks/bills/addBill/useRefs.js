import { ref } from 'vue'

export function useRefs() {
  const concept = ref('')
  const amount = ref('')
  const donation = ref('')

  return { concept, amount, donation }
}
