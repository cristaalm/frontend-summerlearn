export function useValidationFunctions({ valid, password, password_confirm, status }) {
  const validate = () => {
    const validForm = Object.keys(status.value).every((key) => status.value[key].value)
    valid.value = validForm
  }

  const validateText = (e) => {
    const { name, value } = e.target
    const context = e.target.dataset.context
    if (status.value[name].Regex.test(value)) {
      status.value[name].value = true
      status.value[name].error = false
      status.value[name].menssage = ''
    } else {
      status.value[name].value = false
      status.value[name].error = true
      status.value[name].menssage = `El campo ${context} no es válido`
    }
    if (name === 'password_confirm') {
      status.value.password_confirm.modified = true
    }
    validate()
  }

  const validateDate = (e) => {
    const { name, value } = e.target
    if (status.value[name].Regex.test(value)) {
      status.value[name].value = true
      status.value[name].error = false
      if (name === 'birthdate') {
        const currentDate = new Date()
        const selectedDate = new Date(value)
        let age = currentDate.getFullYear() - selectedDate.getFullYear()
        const monthDiff = currentDate.getMonth() - selectedDate.getMonth()
        if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < selectedDate.getDate())) {
          age--
        }
        if (age >= 18 && age <= 100) {
          status.value[name].error = false
          status.value[name].menssage = ''
        } else {
          status.value[name].error = true
          status.value[name].value = false
          status.value[name].menssage = 'Debe tener al menos 18 años'
        }
      }
    } else {
      status.value[name].value = false
      status.value[name].error = true
      status.value[name].menssage = 'La fecha no es válida'
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
      status.value.password_confirm.menssage = ''
    } else if (status.value.password_confirm.modified) {
      status.value.password_confirm.value = false
      status.value.password_confirm.error = true
      status.value.password_confirm.menssage = 'Las contraseñas no coinciden'
    }
    validate()
  }

  const validatePerfil = (e) => {
    const { name, value } = e.target
    if (status.value[name].Regex.test(value)) {
      status.value[name].value = true
      status.value[name].error = false
      status.value[name].menssage = ''
    } else {
      status.value[name].value = false
      status.value[name].error = true
      status.value[name].menssage = `El perfil no es válido`
    }
    validate()
  }

  const validateTerms = (e) => {
    const { name, checked } = e.target
    if (checked) {
      status.value[name].value = true
      status.value[name].error = false
      status.value[name].menssage = ''
    } else {
      status.value[name].value = false
      status.value[name].error = true
      status.value[name].menssage = 'Debe aceptar los términos y condiciones'
    }
    validate()
  }

  return {
    validate,
    validateText,
    validateDate,
    validatePasswordComfirm,
    validatePerfil,
    validateTerms
  }
}
