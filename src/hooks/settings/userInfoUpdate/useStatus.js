import { ref } from 'vue'

export function useStatus() {
  const status = ref({
    firstName: {
      name: 'nombre',
      message: '',
      value: false,
      error: false,
      Regex: /^[a-zA-Z\u00C0-\u017F\s]{1,49}[a-zA-Z\u00C0-\u017F]$/
    },
    lastName: {
      name: 'apellido',
      message: '',
      value: false,
      error: false,
      Regex: /^[a-zA-Z\u00C0-\u017F\s]{1,49}[a-zA-Z\u00C0-\u017F]$/
    },
    phone: {
      name: 'número de teléfono',
      message: '',
      value: false,
      error: false,
      Regex: /^\d{10}$/
    },
    birthdate: {
      name: 'fecha de nacimiento',
      message: '',
      value: false,
      error: false,
      Regex: /^\d{4}-\d{2}-\d{2}$/
    }
  })

  // Copia profunda manual para preservar las expresiones regulares
  const deepCopy = (obj) => {
    return Object.keys(obj).reduce((copy, key) => {
      const value = obj[key]
      if (value && typeof value === 'object' && !(value instanceof RegExp)) {
        copy[key] = deepCopy(value)
      } else {
        copy[key] = value
      }
      return copy
    }, {})
  }

  const initialState = deepCopy(status.value)

  const resetFields = () => {
    status.value = deepCopy(initialState)
  }

  return { status, resetFields }
}
