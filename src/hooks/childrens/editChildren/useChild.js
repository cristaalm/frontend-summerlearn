import { inject, ref } from 'vue'
import { Baseurl } from '@/utils/global'

export function useChild() {
  const showToast = inject('showToast')
  const { loadChildrens } = inject('childrens')
  const loadingEditChild = ref(false)
  const successEditChild = ref(false)
  const errorEditChild = ref(false)
  const updateChild = async ({ child, newChild, setModalEditChild }) => {
    try {
      loadingEditChild.value = true

      //? ############# Obtener el token de acceso #############

      const access_token = localStorage.getItem('access_token')

      //? ############# Validar la fecha de nacimiento #############

      const date = newChild.birthdate.split('/')
      const birthdateFormat = `${date[2]}-${date[1]}-${date[0]}`

      // validamos la fecha formato yyyy-mm-dd
      const dateReg = /^\d{4}-\d{2}-\d{2}$/g
      if (!birthdateFormat.match(dateReg)) {
        errorEditChild.value = true
        successEditChild.value = false
        showToast({ message: 'Por favor, ingresa una fecha de nacimiento válida.', type: 'error' })
        return
      }

      //? ############# FORM DATA #############

      // Crear un FormData para enviar los datos del usuario junto con la imagen
      const formData = new FormData()
      formData.append('children_name', newChild.name)
      formData.append('children_birthdate', birthdateFormat)
      formData.append('children_curp', newChild.curp)

      // Añadir la imagen si existe, de lo contrario usar un avatar por defecto
      if (newChild.photo.value) {
        formData.append('children_photo', newChild.photo.value) // archivo real
      }

      //? ############# Fetching Data #############

      const response = await fetch(Baseurl + 'childrens/' + child.id + '/', {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${access_token}`
        },
        body: formData
      })

      // Si la respuesta no es exitosa, mostramos un mensaje de error
      if (!response.ok) {
        errorEditChild.value = true
        successEditChild.value = false
        showToast({ message: 'Error al actualizar la información del niño.', type: 'error' })
        return
      }

      //? ############# Actualizar la información del niño #############
      const data = await response.json()

      successEditChild.value = true
      child.name = data.children_name
      child.photo = data.children_photo
      child.birthdate = data.children_birthdate
      child.curp = data.children_curp
      setModalEditChild({ open: false })
      showToast({ message: 'Información del niño actualizada corractamente.', type: 'success' })
      loadChildrens()
    } catch (e) {
      console.error('Error:', e)
      errorEditChild.value = true
      successEditChild.value = false
      showToast({ message: 'Error al actualizar la información del niño.', type: 'error' })
    } finally {
      loadingEditChild.value = false
    }
  }
  return { updateChild, loadingEditChild, successEditChild, errorEditChild }
}
