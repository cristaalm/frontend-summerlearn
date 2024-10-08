import { ref } from 'vue'
import { Baseurl } from '@/../global'
import getIdByToken from '@/logic/getIdByToken'

export function useValidationImage({ imageUser, showToast }) {
  const profileImage = ref(imageUser) // URL de la imagen inicial
  const maxFileSize = 2 * 1024 * 1024 // 2 MB
  const loadingImage = ref(false)

  // Validar el archivo seleccionado
  const validateImage = (event) => {
    const input = event.target
    const file = input.files?.[0]

    if (file) {
      // Verificar tipo de archivo
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg']
      if (!validTypes.includes(file.type)) {
        showToast({ message: 'El archivo debe ser una imagen (JPEG o PNG)', tipo: 'error' })
        return
      }

      // Verificar tamaño de archivo
      if (file.size > maxFileSize) {
        showToast({
          message: `El archivo no debe exceder los ${maxFileSize / (1024 * 1024)} MB`,
          tipo: 'error'
        })
        return
      }

      // creamos un nuevo objeto URL¿
      // enviamos primero la imagen al servidor, para compronar si se subio correctamente
      updateImageUser(file).then((res) => {
        if (res !== false) {
          // si se subio correctamente
          profileImage.value = res // Actualizar la imagen en el componente
          showToast({ message: 'Imagen actualizada correctamente', tipo: 'success' })
        } else {
          showToast({ message: 'Error al actualizar la imagen', tipo: 'error' })
        }
      })
    }
  }

  const updateImageUser = async (fileImage) => {
    loadingImage.value = true

    // Obtener el ID de usuario desde el token

    const access_token = localStorage.getItem('access_token')
    const idUser = getIdByToken(access_token).user_id

    // Crear un objeto FormData para enviar la imagen

    const formData = new FormData()
    formData.append('users_photo', fileImage)
    formData.append('id', idUser)

    // Enviar la imagen al servidor

    try {
      const response = await fetch(`${Baseurl}users/update-photo/`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${access_token}`
        },
        body: formData
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error('Error de servidor:', errorData)
      }

      // si es correcto, obtenemos la nueva ruta de la imagen
      const data = await response.json()
      if (data?.photo) {
        return data.photo
      }
    } catch (e) {
      console.error('Error al actualizar la imagen:', e)
    } finally {
      loadingImage.value = false
    }
    return false
  }

  // Función para abrir el input file cuando se hace clic en el icono del lápiz
  const triggerFileSelect = () => {
    document.getElementById('profileImageInput').click()
  }

  return {
    profileImage,
    validateImage,
    triggerFileSelect,
    loadingImage
  }
}
