import {
  password,
  firstName,
  lastName,
  email,
  phone,
  birthdate,
  perfil,
  valid
} from '@/hooks/register/useFormRefs'
import { validate } from '@/hooks/register/useValidationFunctions'
import { useRouter } from 'vue-router'
import { Baseurl } from '@/../global'

export function useAuth() {
  const router = useRouter()

  const registerUser = async () => {
    validate() // Validar antes de ejecutar la llamada
    if (!valid.value) return // Detener si no es válido

    const response = await fetch(Baseurl + '/users/register/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        users_mail: email.value,
        users_phone: phone.value,
        users_password: password.value,
        users_name: `${firstName.value} ${lastName.value}`,
        users_birthdate: birthdate.value,
        users_rol: perfil.value,
        users_tour: true, // default tour
        users_status: 1 // default status
      })
    })

    const data = await response.json()

    if (response.ok) {
      console.log('Registration successful')
      localStorage.setItem('access_token', data.access)
      localStorage.setItem('refresh_token', data.refresh)
      router.push({ name: 'dashboard' })
    } else {
      console.error('Registration failed', data)
      validate() // Revalidar si falla
    }
  }

  return { registerUser }
}
