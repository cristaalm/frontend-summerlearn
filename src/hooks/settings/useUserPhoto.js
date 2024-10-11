import { getPhoto } from '@/services/users/getPhoto'
import { ref, inject } from 'vue'

export function useUserPhoto() {
  const photoUser = ref(null)
  const loadingUserPhoto = ref(false)
  const errorUserPhoto = ref(false)
  const showToast = inject('showToast')

  const loadUserPhoto = async () => {
    loadingUserPhoto.value = true
    try {
      photoUser.value = await getPhoto()
    } catch (e) {
      errorUserPhoto.value = e
    } finally {
      if (!photoUser.value) {
        errorUserPhoto.value = 'No se ha podido cargar la foto'
        showToast({
          message: 'No se ha podido cargar la foto',
          tipo: 'error'
        })
      }
      loadingUserPhoto.value = false
    }
  }

  return { photoUser, loadingUserPhoto, errorUserPhoto, loadUserPhoto }
}
