import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { Baseurl } from '@/../global'

export function useAuth({
  password,
  firstName,
  lastName,
  email,
  phone,
  birthdate,
  perfil,
  valid,
  validate
}) {
  const router = useRouter()
  const error = ref('')
  const loading = ref(false)

  const registerUser = async () => {
    error.value = ''
    loading.value = true
    validate() // Validar antes de ejecutar la llamada
    if (!valid.value) {
      error.value = 'Por favor, llena todos los campos correctamente'
      loading.value = false
      return
    }

    const response = await fetch(Baseurl + 'register/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email.value,
        users_phone: phone.value,
        users_photo: 'https://avatar.iran.liara.run/public/boy?username=Ash', // default photo
        password: password.value,
        first_name: firstName.value,
        last_name: lastName.value,
        name: `${firstName.value} ${lastName.value}`,
        users_birthdate: birthdate.value,
        users_rol: perfil.value,
        users_tour: false, // default tour
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
      error.value = 'Hubo un problema en el registro'
      loading.value = false
      validate() // Revalidar si falla
    }
  }

  return {
    error,
    loading,
    registerUser
  }
}
