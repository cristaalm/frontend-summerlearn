import { ref, inject } from 'vue'
import { getUsers } from '@/services/users/users'

export function useUsers() {
  const users = ref([])
  const loadingUsers = ref(false)
  const firstLoad = ref(true)
  const errorUsers = ref(null)
  const showToast = inject('showToast')

  const loadUsers = async () => {
    if (loadingUsers.value) return
    if (firstLoad.value) {
      firstLoad.value = false
      loadingUsers.value = true
    }
    try {
      users.value = await getUsers()
    } catch (e) {
      errorUsers.value = e
      showToast({ message: 'Ocurrió un error cargando los usuarios', type: 'error' })
    } finally {
      loadingUsers.value = false
    }
  }

  return { users, loadingUsers, errorUsers, loadUsers }
}
