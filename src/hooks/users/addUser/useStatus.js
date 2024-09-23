import { ref } from 'vue'

export const status = ref({
  firstName: {
    name: 'nombre',
    message: '',
    value: false,
    error: false,
    Regex: /^[a-zA-Z\u00C0-\u017F\s]{1,49}[a-zA-Z\u00C0-\u017F]$/
  },
  lastName: {
    name: 'apellido',
    message: '',
    value: false,
    error: false,
    Regex: /^[a-zA-Z\u00C0-\u017F\s]{1,49}[a-zA-Z\u00C0-\u017F]$/
  },
  email: {
    name: 'correo electrónico',
    message: '',
    value: false,
    error: false,
    Regex: /^(?=.{1,100}$)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  },
  phone: {
    name: 'número de teléfono',
    message: '',
    value: false,
    error: false,
    Regex: /^\d{10}$/
  },
  birthdate: {
    name: 'fecha de nacimiento',
    message: '',
    value: false,
    error: false,
    Regex: /^\d{4}-\d{2}-\d{2}$/
  },
  password: {
    name: 'contraseña',
    message: '',
    list: [],
    value: false,
    secure: 0,
    color: '[&.active]:bg-gray-600',
    error: false,
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
  password_confirm: {
    name: 'confirmar contraseña',
    message: '',
    value: false,
    error: false,
    Regex: /^.{1,}$/,
    modified: false
  },
  rol: {
    name: 'rol',
    message: '',
    value: true,
    error: false,
    Regex: /^[1-5]$/
  },
  profileImage: {
    value: false,
    error: false
  }
})
