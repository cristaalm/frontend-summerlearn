import { ref, inject } from 'vue'
import { getUsers } from '@/services/users/getUsersByStatusThree'

export function useUserRequest() {
  const usersRequest = ref([])
  const loadingUsersRequest = ref(false)
  const fisrtLoad = ref(true)
  const errorUsersRequest = ref(null)
  const showToasts = inject('showToasts')

  const loadUsersRequest = async () => {
    if (loadingUsersRequest.value) return
    if (fisrtLoad.value) {
      loadingUsersRequest.value = true
      fisrtLoad.value = false
    }
    try {
      usersRequest.value = await getUsers()
    } catch (e) {
      errorUsersRequest.value = e
      showToasts({ message: 'Error al cargar los usuarios', type: 'error' })
    } finally {
      loadingUsersRequest.value = false
    }
  }

  return { usersRequest, loadingUsersRequest, errorUsersRequest, loadUsersRequest }
}
