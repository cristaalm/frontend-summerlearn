import { ref, inject } from 'vue'
import { useRouter } from 'vue-router'
import { Baseurl } from '@/utils/global'
import getIdByToken from '@/logic/getIdByToken'

export function useSetChildren({
  name,
  imageFile, // archivo de imagen
  birthdate,
  curp,
  valid,
  validateAll,
  resetFields
}) {
  const router = useRouter()
  const setChildrenError = ref('')
  const setChildrenLoading = ref(false)
  const showToast = inject('showToast')

  const addChildren = async () => {
    // Obtener el id del usuario para asignarle el niño
    const access_token = localStorage.getItem('access_token')
    const idUser = getIdByToken(access_token).user_id

    setChildrenError.value = ''
    setChildrenLoading.value = true
    validateAll() // Validar antes de ejecutar la llamada
    if (!valid.value) {
      setChildrenError.value = 'Por favor, llena todos los campos correctamente'
      setChildrenLoading.value = false
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
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          'content-type': 'application/json'
        },
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
        setChildrenError.value = 'Hubo un problema en el registro'
      }
    } catch (err) {
      console.error('Error en la solicitud:', err)
      setChildrenError.value = 'Hubo un problema en el registro'
    } finally {
      setChildrenLoading.value = false
    }
  }

  return { setChildrenError, setChildrenLoading, addChildren }
}
