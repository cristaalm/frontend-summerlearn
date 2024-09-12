import { ref } from 'vue'

export const status = ref({
  password: {
    name: 'Contraseña',
    message: '',
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
  confirm_password: {
    name: 'Confirmar contraseña',
    message: '',
    value: false,
    error: false,
    modified: false
  },
})
