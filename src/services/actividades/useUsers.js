import { ref } from 'vue'
import { getUsers } from './getUsers'

export function useUsers() {
  const users = ref([])
  const loadingResponsable = ref(false)
  const errorResponsable = ref(null)

  const loadUsers = async () => {
    loadingResponsable.value = true
    try {
      users.value = await getUsers()
    } catch (e) {
      errorResponsable.value = e
    } finally {
      loadingResponsable.value = false
    }
  }

  return { users, loadingResponsable, errorResponsable, loadUsers }
}
