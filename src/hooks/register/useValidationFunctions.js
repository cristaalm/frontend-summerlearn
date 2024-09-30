import { watch } from 'vue'
import { usePasswordSecurity } from '@/hooks/register/usePasswordSecurity'

export function useValidationFunctions({
  firstName,
  lastName,
  email,
  phone,
  birthdate,
  perfil,
  terms,
  password,
  password_confirm,
  valid,
  status
}) {
  //? ######################### FUNCTIONS #########################

  const validate = () => {
    const validForm = Object.keys(status.value).every((key) => status.value[key].value)
    valid.value = validForm
  }

  const { validatePassword } = usePasswordSecurity({ status, validate })

  const validateText = (e) => {
    const { name, value } = e.target

    if (name === 'phone') {
      if (!/^[0-9]+$/.test(value)) {
        if (value === '') {
          status.value.phone.lastPhone = ''
          return
        }
        phone.value = status.value.phone.lastPhone
        return
      } else {
        status.value.phone.lastPhone = value
      }
    }

    if (status.value[name].Regex.test(value)) {
      status.value[name].value = true
      status.value[name].error = false
      status.value[name].menssage = ''
    } else {
      status.value[name].value = false
      status.value[name].error = true
      status.value[name].menssage = `El campo ${status.value[name].name} no es válido.`
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
          const message = age < 18 ? 'Debe ser mayor de edad.' : 'La fecha no es válida.'
          status.value[name].menssage = message
        }
      }
    } else {
      status.value[name].value = false
      status.value[name].error = true
      status.value[name].menssage = 'La fecha no es válida.'
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
      status.value.password_confirm.menssage = 'Las contraseñas no coinciden.'
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
      status.value[name].menssage = `El perfil no es válido.`
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
      status.value[name].menssage = 'Debe aceptar los términos y condiciones.'
    }
    validate()
  }

  //? ######################### WATCHERS #########################

  watch(
    [firstName, lastName, email, phone, birthdate, perfil, terms, password, password_confirm],
    () => {
      validate()
    }
  )

  watch(
    () => status.value.password_confirm.modified,
    () => {
      validatePasswordComfirm({ target: { name: 'password_confirm' } })
    }
  )

  watch(
    () => password.value,
    () => {
      validatePassword({ target: { name: 'password', value: password.value } })
      validatePasswordComfirm({ target: { name: 'password_confirm' } })
    }
  )

  watch(
    () => password_confirm.value,
    () => {
      validatePassword({ target: { name: 'password', value: password.value } })
      validatePasswordComfirm({ target: { name: 'password_confirm' } })
    }
  )

  watch(
    () => terms.value,
    () => {
      validateTerms({ target: { name: 'terms', checked: terms.value } })
    }
  )

  watch(
    () => birthdate.value,
    () => {
      validateDate({ target: { name: 'birthdate', value: birthdate.value } })
    }
  )

  watch(
    () => perfil.value,
    () => {
      validatePerfil({ target: { name: 'perfil', value: perfil.value } })
    }
  )

  watch(
    () => email.value,
    () => {
      validateText({ target: { name: 'email', value: email.value } })
    }
  )

  watch(
    () => firstName.value,
    () => {
      validateText({ target: { name: 'firstName', value: firstName.value } })
    }
  )

  watch(
    () => lastName.value,
    () => {
      validateText({ target: { name: 'lastName', value: lastName.value } })
    }
  )

  watch(
    () => status.value,
    () => {
      validate()
    }
  )

  return {
    validate,
    validateText,
    validateDate,
    validatePasswordComfirm,
    validatePerfil,
    validateTerms
  }
}
