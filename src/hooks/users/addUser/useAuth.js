import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { Baseurl } from '@/../global'

export function useAuth({
  email,
  phone,
  password,
  firstName,
  lastName,
  birthdate,
  rol,
  profileImage,
  valid,
  validate
}) {
  const router = useRouter()
  const error = ref('')
  const loading = ref(false)

  const addUser = async () => {
    error.value = ''
    loading.value = true
    validate() // Validar antes de ejecutar la llamada
    if (!valid.value) {
      error.value = 'Por favor, llena todos los campos correctamente'
      loading.value = false
      return
    }
    // TODO - Queda pendiente subir la foto de perfil a un directorio, para poder ser consultada despues, por lo tanto este codigo queda comentado.
    // const response = await fetch(Baseurl + '/users/register/', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     users_mail: email.value,
    //     users_phone: phone.value,
    //     users_photo: profileImage.value,
    //     users_password: password.value,
    //     users_name: `${firstName.value} ${lastName.value}`,
    //     users_birthdate: birthdate.value,
    //     users_rol: rol.value,
    //     users_tour: true, // default tour
    //     users_status: 1 // default status
    //   })
    // })

    // const data = await response.json()

    // if (response.ok) {
    //   console.log('Registration successful')
    //   localStorage.setItem('access_token', data.access)
    //   localStorage.setItem('refresh_token', data.refresh)
    //   router.push({ name: 'dashboard' })
    // } else {
    //   console.error('Registration failed', data)
    //   error.value = 'Hubo un problema en el registro'
    //   loading.value = false
    //   validate() // Revalidar si falla
    // }
  }

  return {
    error,
    loading,
    addUser
  }
}
