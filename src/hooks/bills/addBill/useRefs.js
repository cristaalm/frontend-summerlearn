import { ref } from 'vue'

export function useRefs() {
  const concept = ref('')
  const amount = ref('')
  const selectMultiple = ref([])

  return {
    concept,
    amount,
    selectMultiple
  }
}
