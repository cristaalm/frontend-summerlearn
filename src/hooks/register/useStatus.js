import { ref } from 'vue'

export const status = ref({
  firstName: {
    value: false,
    error: false,
    Regex: /^[a-zA-Z\u00C0-\u017F\s]{1,49}[a-zA-Z\u00C0-\u017F]$/
  },
  lastName: {
    value: false,
    error: false,
    Regex: /^[a-zA-Z\u00C0-\u017F\s]{1,49}[a-zA-Z\u00C0-\u017F]$/
  },
  email: {
    value: false,
    error: false,
    Regex: /^(?=.{1,100}$)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    menssage: ''
  },
  phone: {
    value: false,
    error: false,
    Regex: /^\d{10}$/,
    menssage: ''
  },
  birthdate: {
    value: false,
    error: false,
    menssage: '',
    Regex: /^\d{4}-\d{2}-\d{2}$/
  },
  password: {
    value: false,
    secure: 0,
    color: '[&.active]:bg-gray-600',
    error: false,
    menssage: '',
    list: [],
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
    value: false,
    error: false,
    Regex: /^.{1,}$/,
    modified: false,
    menssage: ''
  },
  perfil: {
    value: false,
    error: false,
    Regex: /^[3-5]$/,
    menssage: ''
  },
  terms: {
    value: false,
    error: false,
    Regex: /^.{1,}$/,
    menssage: ''
  }
})
