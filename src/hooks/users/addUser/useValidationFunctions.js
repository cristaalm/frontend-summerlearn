import { status } from './useStatus'

export function useValidateFunctions({ valid, password, password_confirm }) {
  const validate = () => {
    const validForm = Object.keys(status.value).every((key) => status.value[key].value)
    valid.value = validForm
  }

  const validateText = (e) => {
    const { name, value } = e.target
    const nameComponent = status.value[name].name
    if (status.value[name].Regex.test(value)) {
      status.value[name].value = true
      status.value[name].error = false
      status.value[name].message = ''
    } else {
      status.value[name].value = false
      status.value[name].error = true
      status.value[name].message = `El campo ${nameComponent} no es válido`
    }
    if (name === 'password_confirm') {
      status.value.password_confirm.modified = true
    }
    validate()
  }

  const validateDate = (value) => {
    // El value viene como DD/MM/YYYY, tenemos que cambiarlo a YYYY-MM-DD

    const date = value.split('/')
    value = `${date[2]}-${date[1]}-${date[0]}`

    // validamos la fecha

    if (status.value.birthdate.Regex.test(value)) {
      status.value.birthdate.value = true
      status.value.birthdate.error = false
      const currentDate = new Date()
      const selectedDate = new Date(value)
      let age = currentDate.getFullYear() - selectedDate.getFullYear()
      const monthDiff = currentDate.getMonth() - selectedDate.getMonth()
      if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < selectedDate.getDate())) {
        age--
      }
      if (age >= 18 && age <= 100) {
        status.value.birthdate.error = false
        status.value.birthdate.message = ''
      } else {
        status.value.birthdate.error = true
        status.value.birthdate.value = false
        status.value.birthdate.message = 'Debe tener al menos 18 años'
      }
    } else {
      status.value.birthdate.value = false
      status.value.birthdate.error = true
      status.value.birthdate.message = 'La fecha no es válida'
    }
    validate()
  }

  const validatePasswordComfirm = (e) => {
    if (e.target.name === 'password_confirm' && !status.value.password_confirm.modified) {
      status.value.password_confirm.modified = true
    }
    if (password.value === password_confirm.value && status.value.password_confirm.modified) {
      status.value.password_confirm.value = true
      status.value.password_confirm.error = false
      status.value.password_confirm.message = ''
    } else if (status.value.password_confirm.modified) {
      status.value.password_confirm.value = false
      status.value.password_confirm.error = true
      status.value.password_confirm.message = 'Las contraseñas no coinciden'
    }
    validate()
  }

  const validateRol = (e) => {
    const { name, value } = e.target
    if (status.value[name].Regex.test(value)) {
      status.value[name].value = true
      status.value[name].error = false
      status.value[name].message = ''
    } else {
      status.value[name].value = false
      status.value[name].error = true
      status.value[name].message = `El Rol no es válido`
    }
    validate()
  }

  return {
    validateText,
    validateDate,
    validatePasswordComfirm,
    validateRol,
    validate
  }
}
