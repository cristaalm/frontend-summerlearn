import { ref } from 'vue'

export function useRefs() {
  const name = ref('')
  const duration = ref('')
  const responsible = ref('')
  const area = ref('')
  const grade = ref('') // te falto declarar la variable reactiva

  return {
    name,
    duration,
    responsible,
    area,
    grade
  }
}
