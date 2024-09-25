import { ref } from 'vue'

export function useStatus() {
  const status = ref({
    name: {
      error: false,
      success: false,
      message: '',
      name: 'nombre del programa',
      Regex: /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚñÑ]+$/
    },
    duration: {
      error: false,
      success: false,
      message: '',
      name: 'duración del programa',
      Regex: /^\d{4}-\d{2}-\d{2}$/
    },
    responsible: {
      error: false,
      success: false,
      message: '',
      name: 'responsable del programa',
      Regex: /^\d+$/
    },
    area: {
      error: false,
      success: false,
      message: '',
      name: 'area del programa',
      Regex: /^\d+$/
    }
  })

  return { status }
}
