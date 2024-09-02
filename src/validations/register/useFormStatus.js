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
    Regex: {
      length: /^.{8,}$/,
      safeLength: /^.{15,}$/,
      ultraSafeLength: /^.{20,}$/,
      uppercase: /^(?=.*[A-Z]).*$/,
      lowercase: /^(?=.*[a-z]).*$/,
      number: /^(?=.*[0-9]).*$/,
      special: /^(?=.*[!@#$%^&*]).*$/
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
    Regex: /^.{1,}$/,
    menssage: ''
  },
  terms: {
    value: false,
    error: false,
    Regex: /^.{1,}$/,
    menssage: ''
  }
})

