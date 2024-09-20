import { ref } from 'vue'

export function useStatus() {
  const status = ref({
    concept: {
      error: false,
      success: false,
      message: '',
      name: 'concepto',
      Regex: /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚñÑ]+$/ // Modificado para aceptar letras con tilde y ñ
    },
    amount: {
      error: false,
      success: false,
      message: '',
      name: 'monto',
      Regex: /^\d+(\.\d{1,2})?$/
    }
  })

  return { status }
}
