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
      Regex: /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/
    }
  })

  const name = ref('')
  const birthdate = ref('DD/MM/YYYY')
  const curp = ref('')
  const valid = ref(false)

  const validateAll = () => {
    if (status.value.name.success && status.value.birthdate.success && status.value.curp.success) { // Si todos los campos son válidos
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

  watch(() => birthdate.value, () => {
    validateDate()
    validateAll()
  })

  return {
    status,
    name,
    birthdate,
    curp,
    valid,
    validate,
    validateInputCurp  }
}