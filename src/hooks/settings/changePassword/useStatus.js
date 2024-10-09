import { ref } from 'vue'

export function useStatus() {
  const status = ref({
    password_current: {
      name: 'contraseña actual',
      message: '',
      value: false,
      error: false,
      Regex: /^.{1,}$/,
      modified: false
    },
    new_password: {
      name: 'nueva contraseña',
      message: [],
      list: [],
      value: false,
      secure: 0,
      color: '[&.active]:bg-gray-600',
      error: false,
      modified: false,
      Regex: {
        length: /^.{8,}$/,
        safeLength: /^.{15,}$/,
        ultraSafeLength: /^.{20,}$/,
        uppercase: /^(?=.*[A-Z]).*$/,
        lowercase: /^(?=.*[a-z]).*$/,
        number: /^(?=.*[0-9]).*$/,
        special: /^(?=.*[!@#$%^&*]).*$/,
        secuentialNumbers:
          /^(?!.*(012|123|234|345|456|567|678|789|890|987|876|765|654|543|432|321|210)).*$/,
        noRepeat: /^(?!^(.)\1*$).+$/
      }
    },
    new_password_confirm: {
      name: 'confirmar nueva contraseña',
      message: '',
      value: false,
      error: false,
      Regex: /^.{1,}$/,
      modified: false
    }
  })

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

  return { status, resetFields }
}
