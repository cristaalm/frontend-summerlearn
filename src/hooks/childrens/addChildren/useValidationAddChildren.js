import { ref, watch } from 'vue'

export function useValidationAddChildren() {
  const status = ref({
    name: {
      error: false,
      success: false,
      message: '',
      name: 'nombre del niño',
      Regex: /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚñÑ]+$/ // Solo letras y espacios
    },
    birthdate: {
      error: false,
      success: false,
      message: '',
      name: 'fecha de nacimiento',
      Regex: /^\d{4}-\d{2}-\d{2}$/
    },
    curp: {
      error: false,
      success: false,
      message: '',
      name: 'curp',
      Regex:
        /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/
    },
    grade: {
      error: false,
      success: false,
      message: '',
      name: 'grado escolar',
      Regex: /^[1-6]$/
    },
    profileImage: {
      value: false,
      error: false
    }
  })

  const name = ref('')
  const birthdate = ref('DD/MM/YYYY')
  const curp = ref('')
  const valid = ref(false)
  const grade = ref(0)

  const validateAll = () => {
    if (
      status.value.name.success &&
      status.value.birthdate.success &&
      status.value.curp.success &&
      status.value.profileImage.value &&
      status.value.grade.success
    ) {
      // Si todos los campos son válidos
      valid.value = true
    } else {
      valid.value = false
    }
  }

  const validateGrade = () => {
    if (!status.value.grade.Regex.test(grade.value)) {
      status.value.grade.error = true
      status.value.grade.success = false
      status.value.grade.message = `El campo "Escolaridad" es inválido.`
    } else {
      status.value.grade.error = false
      status.value.grade.success = true
      status.value.grade.message = ''
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

  const validateDate = () => {
    const Regex = status.value.birthdate.Regex

    const date = birthdate.value.split('/')
    const birthdateFormat = `${date[2]}-${date[1]}-${date[0]}`

    if (!Regex.test(birthdateFormat)) {
      status.value.birthdate.error = true
      status.value.birthdate.success = false
      status.value.birthdate.message = `El campo "fecha de nacimiento" es inválido.`
    } else {
      status.value.birthdate.error = false
      status.value.birthdate.success = true
      status.value.birthdate.message = ''
    }
  }

  const validateInputCurp = (e) => {
    const { value } = e.target

    curp.value = value.toUpperCase()
  }

  watch(
    () => birthdate.value,
    () => {
      validateDate()
      validateAll()
    }
  )

  const setValueTrueAll = () => {
    Object.keys(status.value).forEach((key) => {
      status.value[key].success = true
    })
    status.value.profileImage.value = true
    valid.value = true
  }

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

  return {
    status,
    name,
    birthdate,
    curp,
    grade,
    valid,
    validate,
    validateAll,
    validateInputCurp,
    validateGrade,
    setValueTrueAll,
    resetFields
  }
}
