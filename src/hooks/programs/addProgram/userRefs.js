import { ref } from 'vue'

export function useRefs() {
  const name = ref('')
  const duration = ref('')
  const responsible = ref('')
  const area = ref('')

  return {
    name,
    duration,
    responsible,
    area
  }
}
