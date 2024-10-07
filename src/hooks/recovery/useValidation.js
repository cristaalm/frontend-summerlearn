export function useValidation({ password, confirm_password, status, valid }) {
  const validate = () => {
    const validForm = Object.keys(status.value).every((key) => status.value[key].value)
    valid.value = validForm
  }

  const validationConfirmPassword = () => {
    status.value.confirm_password.message = ''
    status.value.confirm_password.value = false
    status.value.confirm_password.error = true
    if (!confirm_password.value) {
      status.value.confirm_password.message = 'La confirmación de contraseña es requerida'
      status.value.confirm_password.value = false
      status.value.confirm_password.error = true
      validate()
      return
    }

    if (confirm_password.value != password.value) {
      status.value.confirm_password.message = 'La contraseña no coinside'
      status.value.confirm_password.value = false
      status.value.confirm_password.error = true
      validate()
      return
    }

    status.value.confirm_password.value = true
    status.value.confirm_password.error = false
    validate()
  }

  return {
    validationConfirmPassword,
    validate
  }
}
