import { ref } from 'vue'

export function useStatus() {
  const status = ref({
    amount: {
      Regex: /^\d+(\.\d{1,2})?$/, // Valida números decimales
      success: false,
      error: false,
      message: ''
    },
    concept: {
      Regex: /^[A-Za-z\s]+$/, // Valida letras
      success: false,
      error: false,
      message: ''
    },
    selectMultiple: {
      message: '',
      error: false
    }
  })

  return { status }
}
