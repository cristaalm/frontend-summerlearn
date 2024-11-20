import { ref, watch, inject } from 'vue'
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
      Regex: /^[0-9a-zA-ZáéíóúÁÉÍÓÚñÑ\s.,!?;:-]+$/ // Letras, espacios, y algunos caracteres de puntuación
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
    },
    date: {
      error: false,
      success: false,
      message: '',
      name: 'fecha',
      Regex: /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/ // Fecha en formato YYYY-MM-DD
    }
  })

  const { programs } = inject('programs')
  const name = ref('')
  const description = ref('')
  const responsible = ref('')
  const date = ref('DD/MM/YYYY')
  const program = ref('')
  const valid = ref(false)

  const validateAll = () => {
    if (
      status.value.name.success &&
      status.value.responsible.success &&
      status.value.program.success &&
      status.value.description.success &&
      status.value.date.success
    ) {
      valid.value = true
    } else {
      valid.value = false
    }
  }

  const validateDate = () => {
    const value = date.value

    // formatear la fecha a YYYY-MM-DD
    const dateFormat = value.split('/').reverse().join('-')

    if (!status.value.date.Regex.test(dateFormat)) {
      status.value.date.error = true
      status.value.date.success = false
      status.value.date.message = `El campo "Fecha de la actividad" es inválido.`
    } else {
      status.value.date.error = false
      status.value.date.success = true
      status.value.date.message = ''
    }
    validateAll()
  }

  const validateDateByProgramDate = () => {
    const dateValue = date.value
    if (programs.value.length == 0) return
    if (program.value == '') return
    if (dateValue == 'DD/MM/YYYY') return

    // Formatear la fecha de la actividad a YYYY-MM-DD
    const dateUnformat = dateValue.split('/')
    const dateFormat = `${dateUnformat[2]}-${dateUnformat[1]}-${dateUnformat[0]}`

    const programId = program.value
    const { start, end } = programs.value.find((program) => program.id == programId) // start y end son fechas en formato YYYY-MM-DD

    if (dateFormat >= start && dateFormat <= end) {
      console.log('Fecha de la actividad dentro del rango de fechas del programa.')
      status.value.date.error = false
      status.value.date.success = true
      status.value.date.message = ''
      validateDate()
    } else {
      status.value.date.error = true
      status.value.date.success = false
      status.value.date.message = `La fecha de la actividad esta fuera del rango de fechas del programa.`
    }
    validateAll()
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

  watch([date, program], validateDateByProgramDate)

  return { status, name, description, responsible, program, date, valid, validate }
}
