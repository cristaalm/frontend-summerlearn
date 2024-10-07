import { ref } from 'vue'
export function useValidationAddActividades() {
  const status = ref({
    name: {
      error: false,
      success: false,
      message: '',
      name: 'nombre de actividad',
      Regex: /^[0-9a-zA-ZáéíóúÁÉÍÓÚñÑ\s.,!?;:-]+$/ // Letras, números, espacios, y algunos caracteres de puntuación
    },
    description: {
      error: false,
      success: false,
      message: '',
      name: 'descripción',
      Regex: /^[a-zA-Z\s.,!?]+$/ // Letras, espacios, y algunos caracteres de puntuación
    },
    responsible: {
      error: false,
      success: false,
      message: '',
      name: 'responsable',
      Regex: /^[0-9]+$/ // Solo números
    },
    program: {
      error: false,
      success: false,
      message: '',
      name: 'programa',
      Regex: /^[0-9]+$/ // Solo números
    }
  })

  const name = ref('')
  const description = ref('')
  const responsible = ref('')
  const program = ref('')
  const valid = ref(false)

  const validateAll = () => {
    if (status.value.name.success && status.value.responsible.success) {
      valid.value = true
    } else {
      valid.value = false
    }
  }

  const validate = (e, field) => {
    const { name, Regex } = status.value[field]
    const value = e.target.value
    if (!Regex.test(value)) {
      status.value[field].error = true
      status.value[field].success = false
      status.value[field].message = `El campo "${name}" es inválido.`
    } else {
      status.value[field].error = false
      status.value[field].success = true
      status.value[field].message = ''
    }
    validateAll()
  }

  return {
    status,
    name,
    description,
    responsible,
    program,
    valid,
    validate
  }
}
