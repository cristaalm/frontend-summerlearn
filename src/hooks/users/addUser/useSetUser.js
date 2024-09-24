import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Baseurl } from '@/../global'

export function useSetUser({
  email,
  phone,
  password,
  firstName,
  lastName,
  birthdate,
  rol,
  imageFile, // archivo de imagen
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

    const date = birthdate.value.split('/')
    const birthdateFormat = `${date[2]}-${date[1]}-${date[0]}`

    // Crear un FormData para enviar los datos del usuario junto con la imagen
    const formData = new FormData()
    formData.append('email', email.value)
    formData.append('users_phone', phone.value)
    formData.append('password', password.value)
    formData.append('first_name', `${firstName.value}`)
    formData.append('last_name', `${lastName.value}`)
    formData.append('name', `${firstName.value} ${lastName.value}`)
    formData.append('users_birthdate', birthdateFormat)
    formData.append('users_rol', rol.value)
    formData.append('users_tour', true) // default tour
    formData.append('users_status', 1) // default status

    // Añadir la imagen si existe, de lo contrario usar un avatar por defecto
    if (imageFile.value) {
      formData.append('users_photo', imageFile.value) // archivo real
    } else {
      formData.append('users_photo', 'media/imagesUsers/placeholderUser.jpg') // imagen por defecto
    }

    try {
      const response = await fetch(Baseurl + 'register/', {
        method: 'POST', // No necesitas agregar 'Content-Type'
        headers: {},
        body: formData
      })

      const data = await response.json()

      if (response.ok) {
        router.push({ name: 'users' })
      } else {
        console.error('Registration failed', data)
        error.value = 'Hubo un problema en el registro'
      }
    } catch (err) {
      console.error('Error en la solicitud:', err)
      error.value = 'Hubo un problema en el registro'
    } finally {
      loading.value = false
    }
  }

  return {
    error,
    loading,
    addUser
  }
}