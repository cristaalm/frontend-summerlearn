import { ref } from 'vue'

export function useValidationAddSchedules() {
  const statusSh = ref({
    daySh: {
      error: false,
      success: false,
      message: '',
      name: 'día',
      Regex: /^[0-9]+$/ // Solo números
    },
    selectMultiple: {
      error: false,
      success: false,
      message: '',
      name: 'horarios'
    }
  })

  const daySh = ref('')
  const selectMultiple = ref([])
  const validSh = ref(false)

  const validateAll = () => {
    // Validación de daySh
    if (!statusSh.value.daySh.success) {
      validSh.value = false
    }

    // Validación de selectMultiple
    // if (!selectMultiple.value || selectMultiple.value.length === 0) {
    //   statusSh.value.selectMultiple.message = 'Por favor, seleccione al menos un horario.'
    //   statusSh.value.selectMultiple.error = true
    //   validSh.value = false
    // } else {
    //   statusSh.value.selectMultiple.message = ''
    //   statusSh.value.selectMultiple.error = false
    // }

    // Verificar si ambos campos son válidos
    validSh.value = statusSh.value.daySh.success && !statusSh.value.selectMultiple.error
  }

  const validateSh = (e, field) => {
    const { name, Regex } = statusSh.value[field]
    const value = e.target.value

    if (!Regex.test(value)) {
      statusSh.value[field].error = true
      statusSh.value[field].success = false
      statusSh.value[field].message = `El campo "${name}" es inválido.`
    } else {
      statusSh.value[field].error = false
      statusSh.value[field].success = true
      statusSh.value[field].message = ''
    }

    validateAll()
  }

  return {
    statusSh,
    daySh,
    validSh,
    selectMultiple,
    validateSh
  }
}
