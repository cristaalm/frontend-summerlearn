import { ref } from 'vue'

export function useValidationAddProgram() {
  const status = ref({
    name: {
      error: false,
      success: false,
      message: '',
      name: 'Nombre del programa',
      Regex: /^[a-zA-Z\s]+$/
    },
    start: {
      error: false,
      success: false,
      message: '',
      name: 'Fecha de inicio',
      Regex: /^\d{4}-\d{2}-\d{2}$/
    },    
    end: {
      error: false,
      success: false,
      message: '',
      name: 'Fecha de fin',
      Regex: /^\d{4}-\d{2}-\d{2}$/
    },
    user: {
      error: false,
      success: false,
      message: '',
      name: 'Usuario responsable',
      Regex: /^[0-9]+$/
    },
    p_status: {
      error: false,
      success: false,
      message: '',
      name: 'Estado del programa',
      Regex: /^(activo|inactivo)$/
    }    
  })

  const name = ref('')
  const start = ref('')
  const end = ref('')
  const user = ref('')
  const p_status = ref('')
  const valid = ref(false)

  const validateAll = () => {
    if (status.value.name.success && status.value.user.success && status.value.start.success && status.value.end.success && status.value.p_status.success) {
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
    start,
    end,
    user,
    p_status,
    valid,
    validate
  }
}
