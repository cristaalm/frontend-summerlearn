import { ref } from 'vue'
export function useValidationAddObjective() {
  const status = ref({
    description: {
      error: false,
      success: false,
      message: '',
      name: 'objetivo',
      Regex: /^[a-zA-Z\s.,!?]+$/ // Letras, espacios, y algunos caracteres de puntuación
    }
  })

  const description = ref('')
  const valid = ref(false)

  const validateAll = () => {
    if (status.value.description.success) {
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
    description,
    valid,
    validate
  }
}
