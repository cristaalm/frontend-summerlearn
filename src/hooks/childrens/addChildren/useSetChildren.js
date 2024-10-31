import { ref, inject } from 'vue'
import { useRouter } from 'vue-router'
import { Baseurl } from '@/utils/global'

export function useSetUser({
  name,
  imageFile, // archivo de imagen
  birthdate,
  curp,
  valid,
  validate,
  resetFields
}) {
  const router = useRouter()
  const error = ref('')
  const loading = ref(false)
  const showToast = inject('showToast')

  const addChildren = async () => {
    // Obtener el id del usuario para asignarle el niño
    const access_token = localStorage.getItem('access_token')
    const idUser = getIdByToken(access_token).user_id

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
    formData.append('name', name.value)
    formData.append('birthdate', birthdateFormat)
    formData.append('curp', curp.value)
    formData.append('user', idUser)

    // Añadir la imagen si existe, de lo contrario usar un avatar por defecto
    if (imageFile.value) {
      formData.append('children_photo', imageFile.value) // archivo real
    } else {
      formData.append('children_photo', 'media/imagesUsers/placeholderUser.jpg') // imagen por defecto
    }

    try {
      const response = await fetch(Baseurl + 'childrens/', {
        method: 'POST', // No necesitas agregar 'Content-Type'
        headers: {},
        body: formData
      })

      const data = await response.json()

      if (response.ok) {
        // reiniciamos todos los campos
        name.value = ''
        curp.value = ''
        birthdate.value = 'DD/MM/YYYY'
        imageFile.value = null
        resetFields()
        showToast({ message: 'Niño/a registrado', tipo: 'success', persistente: true })
        router.push({ name: 'childrens' })
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

  return { error, loading, addChildren }
}
