import { ref } from 'vue'
import { getUser } from '@/services/settings/getUserInfo'

export function useUser() {
  const user = ref([])
  const loadingUser = ref(false)
  const firstLoad = ref(true)
  const errorUser = ref(null)

  const loadUser = async () => {
    if (firstLoad.value) {
      loadingUser.value = true
      firstLoad.value = false
    }
    try {
      user.value = await getUser()
    } catch (e) {
      errorUser.value = e
    } finally {
      if (!user.value) {
        errorUser.value = 'No se ha podido cargar el usuario'
      }
      loadingUser.value = false
    }
  }

  return { user, loadingUser, errorUser, loadUser }
}
