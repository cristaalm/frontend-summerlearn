import { ref } from 'vue'

export function useValidationAddArea() {
  const status = ref({
    name: {
      error: false,
      success: false,
      message: '',
      name: 'Nombre del area',
      Regex: /^[a-zA-Z\s]+$/
    },
    responsable: {
      error: false,
      success: false,
      message: '',
      name: 'Responsable',
      Regex: /^\d+$/
    }
  })

  const name = ref('')
  const responsable = ref('')
  const valid = ref(false)

  const validateAll = () => {
    if (status.value.name.success && status.value.responsable.success) {
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
      status.value[field].message = `El campo ${name} es inválido`
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
    responsable,
    valid,
    validate
  }
}
