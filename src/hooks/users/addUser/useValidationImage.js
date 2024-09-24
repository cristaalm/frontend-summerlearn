import { ref } from 'vue'

export function useValidationImage({ status, validate }) {
  const profileImage = ref(null) // Object URL de la imagen seleccionada
  const imageFile = ref(null) // Archivo seleccionado
  const errorMessagePhoto = ref('')
  const maxFileSize = 2 * 1024 * 1024

  // Validar el archivo seleccionado
  const validateImage = (event) => {
    const input = event.target
    const file = input.files?.[0]

    if (file) {
      // Verificar tipo de archivo
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg']
      if (!validTypes.includes(file.type)) {
        errorMessagePhoto.value = 'El archivo debe ser una imagen (JPEG o PNG)'
        profileImage.value = null
        status.value.profileImage.value = false
        status.value.profileImage.error = true
        return
      }

      // Verificar tamaño de archivo
      if (file.size > maxFileSize) {
        errorMessagePhoto.value = `El archivo no debe exceder los ${maxFileSize / (1024 * 1024)} MB`
        profileImage.value = null
        status.value.profileImage.value = false
        status.value.profileImage.error = true
        return
      }

      // Si pasa las validaciones, se guarda el Object URL de la imagen
      status.value.profileImage.value = true
      status.value.profileImage.error = false
      profileImage.value = URL.createObjectURL(file)
      imageFile.value = file
      errorMessagePhoto.value = '' // Limpiar mensaje de error si la validación es exitosa
    }
    validate()
  }

  // Función para abrir el input file cuando se hace clic en el icono del lápiz
  const triggerFileSelect = () => {
    errorMessagePhoto.value = ''
    document.getElementById('profileImageInput').click()
  }

  const removeImage = () => {
    if (profileImage.value) {
      URL.revokeObjectURL(profileImage.value)
    }
    status.value.profileImage.value = false
    status.value.profileImage.error = true
    profileImage.value = null
    imageFile.value = null
    errorMessagePhoto.value = ''
    validate()
  }

  return {
    profileImage,
    errorMessagePhoto,
    validateImage,
    triggerFileSelect,
    removeImage,
    imageFile
  }
}
