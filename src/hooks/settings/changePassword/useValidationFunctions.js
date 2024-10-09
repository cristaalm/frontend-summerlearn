export function useValidateFunctions({
  valid,
  password_current,
  new_password,
  new_password_confirm,
  status
}) {
  const validate = () => {
    const validForm = Object.keys(status.value).every((key) => status.value[key].value)
    valid.value = validForm
  }

  // ? ############################ VALIDATION FUNCTIONS ############################

  const validatePasswordCurrent = () => {
    if (status.value.password_current.Regex.test(password_current.value)) {
      status.value.password_current.value = true
      status.value.password_current.error = false
      status.value.password_current.message = ''
    } else {
      status.value.password_current.value = false
      status.value.password_current.error = true
      status.value.password_current.message = `El campo "Contraseña actual" no es válido`
    }
    validate()
  }

  const validateNewPasswordComfirm = (e) => {
    if (e.target.name === 'new_password_confirm' && !status.value.new_password_confirm.modified) {
      status.value.new_password_confirm.modified = true
    }
    if (
      new_password.value === new_password_confirm.value &&
      status.value.new_password_confirm.modified &&
      new_password_confirm.value !== ''
    ) {
      status.value.new_password_confirm.value = true
      status.value.new_password_confirm.error = false
      status.value.new_password_confirm.message = ''
    } else if (status.value.new_password_confirm.modified) {
      if (new_password_confirm.value === '') {
        status.value.new_password_confirm.message = `El campo "Confirmar nueva contraseña" no puede estar vacío`
      } else {
        status.value.new_password_confirm.message = `Las contraseñas no coinciden`
        status.value.new_password_confirm.value = false
        status.value.new_password_confirm.error = true
      }
    }
    validate()
  }

  return { validate, validatePasswordCurrent, validateNewPasswordComfirm }
}
