import { ref } from 'vue'
import { unformatPhone } from '@/logic/formatNumber'

export function useValidateFunctions({ valid, password, password_confirm, status }) {
  const lastPhone = ref('')

  const validate = () => {
    const validForm = Object.keys(status.value).every((key) => status.value[key].value)
    valid.value = validForm
  }

  const validateText = (e) => {
    let { name, value } = e.target

    // Si el campo es el teléfono, lo desformateamos
    if (name == 'phone') {
      value = unformatPhone(value)
      console.log(value)
    }

    const nameComponent = status.value[name].name
    if (status.value[name].Regex.test(value)) {
      status.value[name].value = true
      status.value[name].error = false
      status.value[name].message = ''
    } else {
      status.value[name].value = false
      status.value[name].error = true
      status.value[name].message = `El campo "${nameComponent}" no es válido`
    }
    if (name === 'password_confirm') {
      status.value.password_confirm.modified = true
    }
    validate()
  }

  const validateInputPhone = (e) => {
    let { value } = e.target

    // Guardamos el valor sin formatear, eliminando todo lo que no sea un número
    const rawValue = value.replace(/\D/g, '')

    // Si el usuario está eliminando, permitimos continuar sin formatear
    if (rawValue.length <= lastPhone.value.replace(/\D/g, '').length) {
      lastPhone.value = rawValue
      e.target.value = formatPhone(rawValue)
      return
    }

    // Si el valor supera los 10 dígitos, no permitimos más entradas
    if (rawValue.length > 10) {
      return
    }

    // Aplicamos el formato a medida que se va escribiendo
    value = formatPhone(rawValue)

    // Establecemos el valor formateado y lo guardamos
    e.target.value = value
    lastPhone.value = value
  }

  // Función auxiliar para formatear el número de teléfono
  const formatPhone = (value) => {
    // Formateamos el número a medida que crece
    let formattedValue = ''

    if (value.length > 0) {
      formattedValue = `(${value.slice(0, 3)}` // Añadir paréntesis
    }
    if (value.length >= 4) {
      formattedValue += `) ${value.slice(3, 6)}` // Añadir cierre del paréntesis y el primer bloque de números
    }
    if (value.length >= 7) {
      formattedValue += ` ${value.slice(6, 10)}` // Añadir el segundo bloque de números
    }

    return formattedValue
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
    validateInputPhone,
    validate
  }
}
