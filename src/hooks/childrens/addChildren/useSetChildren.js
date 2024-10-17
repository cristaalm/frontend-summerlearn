import { ref, inject } from 'vue'
import { useRouter } from 'vue-router'
import { Baseurl } from '@/utils/global'
import getIdByToken from '@/logic/getIdByToken'

/**
 * Hook para agregar un niño.
 *
 * @returns {Object} Retorna un objeto con las propiedades `setChildrenLoading`, `setChildrenError` y la función `addChildren`.
 * @property {Ref<boolean>} setChildrenLoading - Indica si la operación de agregar niño está en curso.
 * @property {Ref<string>} setChildrenError - Contiene el mensaje de error si ocurre un problema al agregar el niño.
 * @property {Function} addChildren - Función asíncrona para agregar un niño.
 * @param {Object} children - Objeto que contiene la información del niño a agregar.
 * @param {string} children.name - Nombre del niño.
 * @param {string} children.birthdate - Fecha de nacimiento del niño.
 * @param {string} children.curp - CURP del niño.
 * @param {string} children.user - Usuario asociado al niño.
 */


export function useSetChildren() {
  const router = useRouter()
  const setChildrenLoading = ref(false)
  const setChildrenError = ref('')
  const showToast = inject('showToast')
  

  const addChildren = async ({ children }) => {
    const access_token = localStorage.getItem('access_token')
    const idUser = getIdByToken(access_token).user_id

    const date = children.birthdate.split('/')
    const birthdateFormat = `${date[2]}-${date[1]}-${date[0]}`
    setChildrenLoading.value = true
    setChildrenError.value = ''

    try {
      const response = await fetch(Baseurl + 'childrens/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${access_token}`
        },
        body: JSON.stringify({
          children_name: children.name,
          children_photo: 'media/imagesUsers/placeholderUser.jpg',
          children_birthdate: birthdateFormat, 
          children_curp: children.curp,
          children_user: idUser,
        })
      })
      const data = await response.json()
      if (response.ok) {
        showToast({ message: 'Niño añadido con éxito', tipo: 'success', persistente: true })
        router.push({ name: 'childrens' })
      } else {
        setChildrenError.value = 'Hubo un problema con la solicitud'
      }
    } catch (e) {
      console.error('Error:', e)
      setChildrenError.value = 'Hubo un problema con la solicitud'
    } finally {
      setChildrenLoading.value = false
    }
  }

  return { setChildrenLoading, setChildrenError, addChildren }
}
